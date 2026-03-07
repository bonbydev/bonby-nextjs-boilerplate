"use client";

import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Checkbox } from "./checkbox";

export type ChecklistItem = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

type ChecklistProps = {
  items: ChecklistItem[];
  value?: string[];
  onChange?: (value: string[]) => void;
  name?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

const Checklist = forwardRef<HTMLDivElement, ChecklistProps>(
  ({ items, value = [], onChange, name, className, orientation = "vertical" }, ref) => {
    const handleChange = (itemValue: string, checked: boolean) => {
      const next = checked ? [...value, itemValue] : value.filter((v) => v !== itemValue);
      onChange?.(next);
    };

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "flex gap-4",
          orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col",
          className
        )}
      >
        {items.map((item) => (
          <label
            key={item.value}
            className={cn(
              "flex cursor-pointer items-center gap-2 text-sm font-medium",
              !item.disabled && "hover:text-foreground",
              item.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            <Checkbox
              name={name}
              value={item.value}
              checked={value.includes(item.value)}
              disabled={item.disabled}
              onChange={(e) => handleChange(item.value, (e.target as HTMLInputElement).checked)}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    );
  }
);

Checklist.displayName = "Checklist";

export { Checklist };
