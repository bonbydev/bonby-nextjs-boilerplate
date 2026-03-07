"use client";

import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { signInWithOAuth } from "@/actions/auth.actions";

export function SocialButtons() {
  const t = useTranslations("auth.social");

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => signInWithOAuth("google")}
        className="border-border bg-card hover:bg-secondary-hover flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
      >
        <FcGoogle className="h-4 w-4" />
        {t("google")}
      </button>

      <button
        type="button"
        onClick={() => signInWithOAuth("github")}
        className="border-border bg-card hover:bg-secondary-hover flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
      >
        <FaGithub className="h-4 w-4" />
        {t("github")}
      </button>
    </div>
  );
}
