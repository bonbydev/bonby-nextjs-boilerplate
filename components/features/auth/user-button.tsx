"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FiLogOut, FiUser } from "react-icons/fi";

import { signOutAction } from "@/actions/auth.actions";

import { LocaleSwitcher } from "../locale/locale-switcher";
import { ThemeToggle } from "../theme/theme-toggle";

export function UserButton() {
  const { data: session } = useSession();
  const t = useTranslations("auth");

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle />
      <LocaleSwitcher />
      <div className="flex items-center gap-2">
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="bg-secondary flex h-8 w-8 items-center justify-center rounded-full">
            <FiUser className="h-4 w-4" />
          </div>
        )}
        <span className="hidden text-sm font-medium sm:inline">
          {session.user.name || session.user.email}
        </span>
      </div>
      <form action={signOutAction}>
        <button
          type="submit"
          className="border-border hover:bg-secondary-hover flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
        >
          <FiLogOut className="h-3 w-3" />
          <span className="hidden sm:inline">{t("signOut")}</span>
        </button>
      </form>
    </div>
  );
}
