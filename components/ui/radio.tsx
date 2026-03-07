"use client";

import type { InputHTMLAttributes } from "react";
import { createContext, forwardRef, useContext, useId } from "react";

import { cn } from "@/lib/utils";

type RadioGroupContextValue = {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

type RadioGroupProps = {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

function RadioGroup({
  name,
  value,
  onChange,
  children,
  className,
  orientation = "vertical",
}: RadioGroupProps) {
  const id = useId();
  const groupName = name ?? `radio-${id}`;

  return (
    <RadioGroupContext.Provider value={{ name: groupName, value, onChange }}>
      <div
        role="radiogroup"
        className={cn(
          "flex gap-3",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          className
        )}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  label?: React.ReactNode;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ value, label, className, onChange, ...props }, ref) => {
    const ctx = useContext(RadioGroupContext);
    const id = useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      ctx?.onChange?.(value);
    };

    return (
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer items-center gap-2 text-sm font-medium",
          "hover:text-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        <input
          ref={ref}
          type="radio"
          id={id}
          name={ctx?.name ?? props.name}
          value={value}
          checked={ctx ? ctx.value === value : undefined}
          onChange={handleChange}
          className={cn(
            "border-input bg-card text-primary h-4 w-4 shrink-0 rounded-full",
            "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        {label != null && <span>{label}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";

export { Radio, RadioGroup };
