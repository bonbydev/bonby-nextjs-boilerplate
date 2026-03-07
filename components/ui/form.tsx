import type { FormHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
  className?: string;
};

export function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={cn("space-y-4", className)} {...props}>
      {children}
    </form>
  );
}
