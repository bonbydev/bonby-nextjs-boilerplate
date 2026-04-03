import type { Metadata } from "next";
import Link from "next/link";

import { SignUpForm } from "@/components/features/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-3 text-center">
        <div className="bg-secondary text-secondary-foreground inline-flex rounded-full px-4 py-1 text-xs font-semibold tracking-[0.2em] uppercase">
          Sign up
        </div>
        <h1 className="text-4xl font-black tracking-tight">Create your account</h1>
        <p className="text-muted-foreground mx-auto max-w-sm text-sm leading-6">
          Create a username and password. New accounts sign you in immediately and return you home.
        </p>
      </div>

      <div className="border-border bg-card/85 rounded-[2rem] border p-7 shadow-[0_24px_80px_var(--shadow)] backdrop-blur">
        <SignUpForm />
      </div>

      <p className="text-muted-foreground text-center text-sm">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
