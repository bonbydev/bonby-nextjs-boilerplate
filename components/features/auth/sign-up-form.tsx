"use client";

import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

import { signUpWithCredentials, type AuthResult } from "@/actions/auth.actions";

const initialState: AuthResult = {};

function inputClass(hasError: boolean) {
  return `w-full rounded-2xl border bg-input px-4 py-3 text-sm transition-colors outline-none ${
    hasError
      ? "border-input-invalid focus:border-input-invalid"
      : "border-input focus:border-input-focus"
  }`;
}

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpWithCredentials, initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.success) {
      toast.success("Account created successfully");
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Choose a username"
          required
          aria-invalid={!!state.fieldErrors?.username}
          aria-describedby={state.fieldErrors?.username ? "username-error" : undefined}
          className={inputClass(!!state.fieldErrors?.username)}
        />
        {state.fieldErrors?.username && (
          <p id="username-error" className="text-destructive text-xs" role="alert">
            {state.fieldErrors.username}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Create a password"
          required
          aria-invalid={!!state.fieldErrors?.password}
          aria-describedby={state.fieldErrors?.password ? "password-error" : undefined}
          className={inputClass(!!state.fieldErrors?.password)}
        />
        {state.fieldErrors?.password && (
          <p id="password-error" className="text-destructive text-xs" role="alert">
            {state.fieldErrors.password}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          required
          aria-invalid={!!state.fieldErrors?.confirmPassword}
          aria-describedby={
            state.fieldErrors?.confirmPassword ? "confirm-password-error" : undefined
          }
          className={inputClass(!!state.fieldErrors?.confirmPassword)}
        />
        {state.fieldErrors?.confirmPassword && (
          <p id="confirm-password-error" className="text-destructive text-xs" role="alert">
            {state.fieldErrors.confirmPassword}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-primary text-primary-foreground hover:bg-primary-hover w-full rounded-full py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
