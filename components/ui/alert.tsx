import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AlertVariant = "default" | "destructive" | "success" | "warning";

type AlertProps = {
  variant?: AlertVariant;
  children: ReactNode;
  className?: string;
};

const variantStyles: Record<AlertVariant, string> = {
  default: "border-border bg-muted text-foreground",
  destructive: "border-destructive/50 bg-destructive/10 text-destructive",
  success: "border-success/50 bg-success/10 text-success",
  warning: "border-warning/50 bg-warning/10 text-warning",
};

function Alert({ variant = "default", children, className }: AlertProps) {
  return (
    <div role="alert" className={cn("rounded-lg border p-4", variantStyles[variant], className)}>
      {children}
    </div>
  );
}

function AlertTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h5 className={cn("mb-1 leading-none font-medium", className)}>{children}</h5>;
}

function AlertDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("text-sm opacity-90 [&_p]:leading-relaxed", className)}>{children}</div>
  );
}

export { Alert, AlertDescription, AlertTitle };
