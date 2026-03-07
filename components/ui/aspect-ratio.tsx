import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AspectRatioProps = {
  ratio?: number;
  children: ReactNode;
  className?: string;
};

export function AspectRatio({ ratio = 16 / 9, children, className }: AspectRatioProps) {
  return (
    <div
      className={cn("relative w-full", className)}
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
