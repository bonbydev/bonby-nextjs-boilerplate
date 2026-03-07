"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  showValue?: boolean;
};

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, showValue, value, min = 0, max = 100, ...props }, ref) => {
    return (
      <div className="flex w-full items-center gap-3">
        <input
          ref={ref}
          type="range"
          value={value}
          min={min}
          max={max}
          className={cn(
            "h-2 w-full cursor-pointer appearance-none rounded-full",
            "bg-muted outline-none",
            "[&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:ring-ring [&::-webkit-slider-thumb]:ring-offset-background [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:hover:ring-2 [&::-webkit-slider-thumb]:hover:ring-offset-2",
            "[&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        {showValue && (
          <span className="text-muted-foreground min-w-[2.5rem] text-right text-sm tabular-nums">
            {value}
          </span>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";
