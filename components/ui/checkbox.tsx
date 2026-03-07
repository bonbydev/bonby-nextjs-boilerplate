"use client";

import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  indeterminate?: boolean;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        data-indeterminate={indeterminate}
        className={cn(
          "border-input bg-card text-primary h-4 w-4 shrink-0 rounded transition-colors",
          "focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[indeterminate=true]:bg-primary data-[indeterminate=true]:border-primary",
          className
        )}
        {...props}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
