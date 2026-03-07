import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ScrollAreaProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "vertical" | "horizontal" | "both";
  maxHeight?: string;
};

export function ScrollArea({
  children,
  orientation = "vertical",
  maxHeight,
  className,
  style,
  ...props
}: ScrollAreaProps) {
  return (
    <div
      className={cn(
        "relative",
        orientation === "vertical" && "overflow-x-hidden overflow-y-auto",
        orientation === "horizontal" && "overflow-x-auto overflow-y-hidden",
        orientation === "both" && "overflow-auto",
        "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-muted-foreground/30",
        className
      )}
      style={{ maxHeight, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
