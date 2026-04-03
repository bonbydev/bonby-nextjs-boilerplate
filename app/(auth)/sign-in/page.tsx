import type { Metadata } from "next";
import Link from "next/link";

import { SignInForm } from "@/components/features/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-3 text-center">
        <div className="bg-secondary text-secondary-foreground inline-flex rounded-full px-4 py-1 text-xs font-semibold tracking-[0.2em] uppercase">
          Sign in
        </div>
        <h1 className="text-4xl font-black tracking-tight">Welcome back</h1>
        <p className="text-muted-foreground mx-auto max-w-sm text-sm leading-6">
          Sign in with your username and password to access the protected Bonby Festival experience.
        </p>
      </div>

      <div className="border-border bg-card/85 rounded-[2rem] border p-7 shadow-[0_24px_80px_var(--shadow)] backdrop-blur">
        <SignInForm />
      </div>

      <p className="text-muted-foreground text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-primary font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
