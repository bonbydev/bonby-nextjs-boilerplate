"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type DropdownProps = {
  open: boolean;
  onClose: () => void;
  trigger: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  className?: string;
};

export function Dropdown({
  open,
  onClose,
  trigger,
  children,
  align = "left",
  className,
}: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  return (
    <div ref={ref} className={cn("relative inline-block", className)}>
      {trigger}
      {open && (
        <div
          className={cn(
            "border-border bg-popover absolute z-50 mt-1 min-w-[10rem] rounded-lg border py-1 shadow-md",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownTrigger({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("cursor-pointer outline-none", className)}
    >
      {children}
    </button>
  );
}

export function DropdownContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("py-1", className)}>{children}</div>;
}

export function DropdownItem({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-popover-foreground hover:bg-accent hover:text-accent-foreground w-full cursor-pointer px-3 py-2 text-left text-sm transition-colors",
        className
      )}
    >
      {children}
    </button>
  );
}

export function DropdownLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-muted-foreground px-3 py-2 text-xs font-medium", className)}>
      {children}
    </div>
  );
}

export function DropdownSeparator({ className }: { className?: string }) {
  return <div className={cn("bg-divider my-1 h-px", className)} />;
}
