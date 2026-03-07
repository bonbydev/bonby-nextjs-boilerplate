"use server";

import { AuthError } from "next-auth";
import { headers } from "next/headers";
import bcrypt from "bcryptjs";

import { signIn, signOut } from "@/auth";
import { dbConnect } from "@/lib/mongoose";
import { rateLimit } from "@/lib/rate-limit";
import { User } from "@/models/user.model";
import { signInSchema, signUpSchema } from "@/validators/auth";

export type FieldErrors = Record<string, string>;

export type AuthResult = {
  error?: string;
  fieldErrors?: FieldErrors;
  success?: boolean;
};

async function getClientIp(): Promise<string> {
  const hdrs = await headers();
  return hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function signInWithCredentials(
  _prevState: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const ip = await getClientIp();
  const limit = rateLimit(`signin:${ip}`, { maxAttempts: 5, windowMs: 60_000 });
  if (!limit.success) {
    return { error: "Too many sign-in attempts. Please try again in a minute." };
  }

  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validated = signInSchema.safeParse(rawData);
  if (!validated.success) {
    const fieldErrors: FieldErrors = {};
    for (const issue of validated.error.issues) {
      const field = issue.path[0]?.toString();
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { fieldErrors };
  }

  try {
    await signIn("credentials", {
      email: validated.data.email,
      password: validated.data.password,
      redirectTo: "/dashboard",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
}

export async function signUpWithCredentials(
  _prevState: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const ip = await getClientIp();
  const limit = rateLimit(`signup:${ip}`, { maxAttempts: 3, windowMs: 60_000 });
  if (!limit.success) {
    return { error: "Too many sign-up attempts. Please try again in a minute." };
  }

  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validated = signUpSchema.safeParse(rawData);
  if (!validated.success) {
    const fieldErrors: FieldErrors = {};
    for (const issue of validated.error.issues) {
      const field = issue.path[0]?.toString();
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { fieldErrors };
  }

  const { name, email, password } = validated.data;

  try {
    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { fieldErrors: { email: "An account with this email already exists" } };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.create({ name, email, password: hashedPassword });

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Something went wrong during sign up" };
    }
    throw error;
  }
}

export async function signInWithOAuth(provider: "google" | "github") {
  await signIn(provider, { redirectTo: "/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
