"use client";

import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

import { signInWithCredentials, type AuthResult } from "@/actions/auth.actions";

const initialState: AuthResult = {};

export function SignInForm() {
  const t = useTranslations("auth.signIn");
  const [state, formAction, isPending] = useActionState(signInWithCredentials, initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder={t("emailPlaceholder")}
          required
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors outline-none ${
            state.fieldErrors?.email
              ? "border-input-invalid focus:border-input-invalid"
              : "border-input focus:border-input-focus"
          }`}
        />
        {state.fieldErrors?.email && (
          <p id="email-error" className="text-destructive text-xs" role="alert">
            {state.fieldErrors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          {t("password")}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder={t("passwordPlaceholder")}
          required
          aria-invalid={!!state.fieldErrors?.password}
          aria-describedby={state.fieldErrors?.password ? "password-error" : undefined}
          className={`w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors outline-none ${
            state.fieldErrors?.password
              ? "border-input-invalid focus:border-input-invalid"
              : "border-input focus:border-input-focus"
          }`}
        />
        {state.fieldErrors?.password && (
          <p id="password-error" className="text-destructive text-xs" role="alert">
            {state.fieldErrors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-primary text-primary-foreground hover:bg-primary-hover w-full rounded-lg py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
