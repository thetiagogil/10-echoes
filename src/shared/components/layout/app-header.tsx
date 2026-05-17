import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { AppLogo } from "@/shared/components/layout/app-logo";
import { cn } from "@/shared/utils/cn";

type AppHeaderProps = ComponentPropsWithoutRef<"header"> & {
  actions?: ReactNode;
  innerClassName?: string;
  leading?: ReactNode;
};

export function AppHeader({
  actions,
  className,
  innerClassName,
  leading,
  ...props
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6",
          innerClassName,
        )}
      >
        {leading ?? <AppLogo href="/" />}
        {actions ? (
          <nav className="flex flex-wrap items-center justify-end gap-2">
            {actions}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
