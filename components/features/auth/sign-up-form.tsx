"use client";

import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

import { signUpWithCredentials, type AuthResult } from "@/actions/auth.actions";

const initialState: AuthResult = {};

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors outline-none ${
    hasError
      ? "border-input-invalid focus:border-input-invalid"
      : "border-input focus:border-input-focus"
  }`;
}

export function SignUpForm() {
  const t = useTranslations("auth.signUp");
  const [state, formAction, isPending] = useActionState(signUpWithCredentials, initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.success) {
      toast.success(t("success"));
    }
  }, [state, t]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder={t("namePlaceholder")}
          required
          aria-invalid={!!state.fieldErrors?.name}
          aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          className={inputClass(!!state.fieldErrors?.name)}
        />
        {state.fieldErrors?.name && (
          <p id="name-error" className="text-destructive text-xs" role="alert">
            {state.fieldErrors.name}
          </p>
        )}
      </div>

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
          className={inputClass(!!state.fieldErrors?.email)}
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
          {t("confirmPassword")}
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder={t("confirmPasswordPlaceholder")}
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
        className="bg-primary text-primary-foreground hover:bg-primary-hover w-full rounded-lg py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
