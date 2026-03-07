import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonGroupProps = {
  children: ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export function ButtonGroup({ children, className, orientation = "horizontal" }: ButtonGroupProps) {
  return (
    <div
      role="group"
      className={cn(
        "inline-flex",
        orientation === "horizontal"
          ? "[&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child):not(:last-child)]:rounded-none"
          : "flex-col [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none [&>*:not(:first-child)]:-mt-px [&>*:not(:first-child):not(:last-child)]:rounded-none",
        className
      )}
    >
      {children}
    </div>
  );
}
