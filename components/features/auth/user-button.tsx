"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { FiLogOut, FiUser } from "react-icons/fi";

import { signOutAction } from "@/actions/auth.actions";

import { ThemeToggle } from "../theme/theme-toggle";

export function UserButton() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-3">
      <ThemeToggle />
      <div className="bg-card/80 border-border flex items-center gap-3 rounded-full border px-2 py-2 shadow-sm backdrop-blur">
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="bg-secondary text-secondary-foreground flex h-9 w-9 items-center justify-center rounded-full">
            <FiUser className="h-4 w-4" />
          </div>
        )}
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-sm font-semibold">
            {session.user.name || "Authenticated user"}
          </p>
          <p className="text-muted-foreground truncate text-xs">@{session.user.name || "user"}</p>
        </div>
      </div>
      <form action={signOutAction}>
        <button
          type="submit"
          className="border-border bg-card/80 hover:bg-secondary-hover flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold backdrop-blur transition-colors"
        >
          <FiLogOut className="h-3 w-3" />
          <span>Sign out</span>
        </button>
      </form>
    </div>
  );
}
