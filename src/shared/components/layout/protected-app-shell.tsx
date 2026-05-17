"use client";

import { Loader2, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { ReactNode } from "react";

import { AppHeader } from "@/shared/components/layout/app-header";
import { AppLogo } from "@/shared/components/layout/app-logo";
import { AppShell } from "@/shared/components/layout/app-shell";
import { Button } from "@/shared/components/ui/button";
import { signOutAction } from "@/shared/server/auth-actions";
import type { CurrentUser } from "@/shared/types";
import { cn } from "@/shared/utils/cn";

type ProtectedAppShellProps = {
  children: ReactNode;
  currentUser: CurrentUser;
};

const navLinks = [
  { href: "/logbook", label: "Logbook" },
  { href: "/timeline", label: "Timeline" },
  { href: "/stats", label: "Stats" },
] as const;

export function ProtectedAppShell({
  children,
  currentUser,
}: ProtectedAppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const profileName =
    currentUser.profile.displayName ?? currentUser.email ?? "Echoes user";

  const signOut = () => {
    setFeedback(null);

    startTransition(async () => {
      const result = await signOutAction();

      if (!result.ok) {
        setFeedback(result.error);
        return;
      }

      router.replace("/");
      router.refresh();
    });
  };

  return (
    <AppShell>
      <AppHeader
        actions={
          <>
            <div className="order-3 flex w-full items-center gap-1 pt-1 sm:order-none sm:w-auto sm:pt-0">
              {navLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                    {active ? (
                      <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-stage" />
                    ) : null}
                  </Link>
                );
              })}
            </div>

            <div className="hidden max-w-44 min-w-0 flex-col items-end sm:flex">
              <span className="font-mono text-[9px] uppercase text-muted-foreground">
                signed in
              </span>
              <span className="truncate text-xs font-semibold text-secondary">
                {profileName}
              </span>
            </div>

            <Button
              aria-label="Sign out"
              className="w-9 px-0"
              disabled={isPending}
              onClick={signOut}
              size="icon"
              variant="outline"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
            </Button>
          </>
        }
        leading={<AppLogo href="/" />}
      />

      {feedback ? (
        <div className="fixed inset-x-0 top-20 z-50 mx-auto max-w-6xl px-4 sm:px-6">
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive-foreground">
            {feedback}
          </p>
        </div>
      ) : null}

      {children}
    </AppShell>
  );
}
