import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "border-border bg-card text-card-foreground rounded-xl border shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className }: CardProps) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>;
}

function CardTitle({ children, className }: CardProps) {
  return (
    <h3 className={cn("text-lg leading-none font-semibold tracking-tight", className)}>
      {children}
    </h3>
  );
}

function CardDescription({ children, className }: CardProps) {
  return <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>;
}

function CardContent({ children, className }: CardProps) {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}

function CardFooter({ children, className }: CardProps) {
  return <div className={cn("flex items-center p-6 pt-0", className)}>{children}</div>;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
