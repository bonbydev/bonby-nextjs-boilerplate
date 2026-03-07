import type { ReactNode } from "react";
import { FiChevronRight } from "react-icons/fi";

import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
};

export function Breadcrumb({ items, separator, className }: BreadcrumbProps) {
  const sep = separator ?? <FiChevronRight className="h-3.5 w-3.5" />;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-muted-foreground">{sep}</span>}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    "text-sm",
                    isLast ? "text-foreground font-medium" : "text-muted-foreground"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
