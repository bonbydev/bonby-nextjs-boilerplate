import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, rightIcon, ...props }, ref) => {
    if (leftIcon || rightIcon) {
      return (
        <div className="relative w-full">
          {leftIcon && (
            <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "flex h-10 w-full rounded-lg border bg-transparent py-2 text-sm transition-colors",
              "placeholder:text-muted-foreground",
              "focus:ring-ring focus:ring-offset-background focus:ring-2 focus:ring-offset-2 focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon ? "pl-10" : "pl-3",
              rightIcon ? "pr-10" : "pr-3",
              error
                ? "border-input-invalid focus:ring-input-invalid"
                : "border-input focus:border-input-focus",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2">
              {rightIcon}
            </span>
          )}
        </div>
      );
    }

    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors",
          "placeholder:text-muted-foreground",
          "focus:ring-ring focus:ring-offset-background focus:ring-2 focus:ring-offset-2 focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error
            ? "border-input-invalid focus:ring-input-invalid"
            : "border-input focus:border-input-focus",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
