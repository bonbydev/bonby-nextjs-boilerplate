import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors",
        "placeholder:text-muted-foreground",
        "focus:ring-ring focus:ring-offset-background focus:ring-2 focus:ring-offset-2 focus:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "resize-y",
        error
          ? "border-input-invalid focus:ring-input-invalid"
          : "border-input focus:border-input-focus",
        className
      )}
      {...props}
    />
  );
}
