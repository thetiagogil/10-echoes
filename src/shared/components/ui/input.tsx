import type { InputHTMLAttributes } from "react";

import { cn } from "@/shared/utils/cn";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-border bg-background/50 px-3 py-1 text-base text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}
