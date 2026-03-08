"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { FiSearch, FiX } from "react-icons/fi";

import { cn } from "@/lib/utils";

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  onClear?: () => void;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    const hasValue = value !== undefined && value !== "";

    return (
      <div className="relative w-full">
        <FiSearch className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <input
          ref={ref}
          type="search"
          value={value}
          className={cn(
            "border-input focus:border-input-focus flex h-10 w-full rounded-lg border bg-transparent py-2 pl-10 text-sm transition-colors",
            hasValue && onClear ? "pr-10" : "pr-3",
            "placeholder:text-muted-foreground",
            "focus:ring-ring focus:ring-offset-background focus:ring-2 focus:ring-offset-2 focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "[&::-webkit-search-cancel-button]:hidden",
            className
          )}
          {...props}
        />
        {hasValue && onClear && (
          <button
            type="button"
            tabIndex={-1}
            onClick={onClear}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
            aria-label="Clear search"
          >
            <FiX className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
