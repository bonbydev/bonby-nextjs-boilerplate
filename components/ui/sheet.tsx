"use client";

import { useEffect, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SheetSide = "left" | "right" | "top" | "bottom";

type SheetProps = {
  open: boolean;
  onClose: () => void;
  side?: SheetSide;
  children: ReactNode;
  className?: string;
};

const sideStyles: Record<SheetSide, string> = {
  left: "inset-y-0 left-0 w-80 border-r data-[state=open]:animate-in data-[state=open]:slide-in-from-left",
  right:
    "inset-y-0 right-0 w-80 border-l data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
  top: "inset-x-0 top-0 h-auto border-b data-[state=open]:animate-in data-[state=open]:slide-in-from-top",
  bottom:
    "inset-x-0 bottom-0 h-auto border-b-0 border-t data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom",
};

export function Sheet({ open, onClose, side = "right", children, className }: SheetProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="bg-overlay fixed inset-0" aria-hidden onClick={onClose} />
      <div
        data-state="open"
        role="dialog"
        aria-modal
        className={cn(
          "border-border bg-card fixed z-50 p-6 shadow-lg transition-transform duration-200",
          sideStyles[side],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mb-4 flex flex-col space-y-2", className)}>{children}</div>;
}

export function SheetTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn("text-foreground text-lg font-semibold", className)}>{children}</h2>;
}

export function SheetDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>;
}

export function SheetFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-6 flex justify-end gap-2", className)}>{children}</div>;
}

export function SheetClose({ onClose, className }: { onClose: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className={cn(
        "text-muted-foreground hover:text-foreground absolute top-4 right-4 rounded-sm transition-colors",
        className
      )}
      aria-label="Close"
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
