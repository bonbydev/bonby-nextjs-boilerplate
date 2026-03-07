import Image from "next/image";

import { cn } from "@/lib/utils";

type AvatarProps = {
  src?: string | null;
  alt?: string;
  fallback?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

function Avatar({ src, alt = "", fallback, className, size = "md" }: AvatarProps) {
  const sizeClass = sizeClasses[size];

  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={size === "sm" ? 32 : size === "lg" ? 48 : 40}
        height={size === "sm" ? 32 : size === "lg" ? 48 : 40}
        className={cn("rounded-full object-cover", sizeClass, className)}
      />
    );
  }

  const initial = fallback
    ? fallback
        .split(/\s+/)
        .map((s) => s[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <span
      className={cn(
        "bg-secondary text-secondary-foreground flex items-center justify-center rounded-full font-medium",
        sizeClass,
        className
      )}
    >
      {initial}
    </span>
  );
}

export { Avatar };
