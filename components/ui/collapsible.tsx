"use client";

import { useState, type ReactNode } from "react";
import { FiChevronDown } from "react-icons/fi";

import { cn } from "@/lib/utils";

type CollapsibleProps = {
  trigger: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

export function Collapsible({
  trigger,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen ?? internalOpen;

  function handleToggle() {
    const next = !isOpen;
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }

  return (
    <div className={cn(className)}>
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between"
      >
        <span className="min-w-0 flex-1 text-left">{trigger}</span>
        <FiChevronDown
          className={cn(
            "text-muted-foreground ml-2 h-4 w-4 shrink-0 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && <div className="pt-2">{children}</div>}
    </div>
  );
}
