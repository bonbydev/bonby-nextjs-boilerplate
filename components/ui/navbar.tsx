"use client";

import { useState, type ReactNode } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { cn } from "@/lib/utils";

type NavbarProps = {
  logo?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
  sticky?: boolean;
};

export function Navbar({ logo, children, actions, className, sticky = true }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={cn(
        "border-border bg-background/95 z-40 w-full border-b backdrop-blur-sm",
        sticky && "sticky top-0",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {logo && <div className="shrink-0">{logo}</div>}

        <div className="hidden items-center gap-1 md:flex">{children}</div>

        <div className="hidden items-center gap-2 md:flex">{actions}</div>

        <button
          type="button"
          className="text-foreground hover:bg-secondary inline-flex cursor-pointer items-center justify-center rounded-lg p-2 transition-colors md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-border border-t px-4 pt-2 pb-4 md:hidden">
          <div className="flex flex-col gap-1">{children}</div>
          {actions && (
            <div className="border-border mt-3 flex flex-col gap-2 border-t pt-3">{actions}</div>
          )}
        </div>
      )}
    </nav>
  );
}

type NavLinkProps = {
  href: string;
  active?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function NavLink({ href, active, children, className, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        className
      )}
    >
      {children}
    </a>
  );
}
