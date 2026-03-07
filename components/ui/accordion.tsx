"use client";

import { useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type AccordionItem = {
  id: string;
  trigger: ReactNode;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIds?: string[];
  className?: string;
};

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  function toggle(id: string) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className={cn("divide-border border-border divide-y rounded-lg border", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          trigger={item.trigger}
          content={item.content}
          isOpen={openIds.has(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}

function AccordionItem({
  id,
  trigger,
  content,
  isOpen,
  onToggle,
}: {
  id: string;
  trigger: ReactNode;
  content: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        id={`accordion-${id}-trigger`}
        aria-expanded={isOpen}
        aria-controls={`accordion-${id}-content`}
        onClick={onToggle}
        className="text-foreground hover:bg-muted flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors"
      >
        {trigger}
        <span
          className={cn(
            "ml-2 inline-block size-4 shrink-0 transition-transform",
            isOpen && "rotate-180"
          )}
        >
          ▼
        </span>
      </button>
      <div
        id={`accordion-${id}-content`}
        role="region"
        aria-labelledby={`accordion-${id}-trigger`}
        hidden={!isOpen}
        className={cn("overflow-hidden transition-all", isOpen ? "animate-in" : "animate-out")}
      >
        <div className="border-border text-muted-foreground border-t px-4 py-3 text-sm">
          {content}
        </div>
      </div>
    </div>
  );
}
