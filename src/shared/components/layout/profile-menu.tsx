"use client";

import {
  ChevronDown,
  Loader2,
  LogOut,
  Menu,
  Settings,
  UserRound,
} from "lucide-react";
import Link from "next/link";

import { protectedNavLinks } from "@/shared/constants/navigation";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { CurrentUser } from "@/shared/types";

type ProfileMenuProps = {
  currentUser: CurrentUser;
  isPending: boolean;
  onSignOut: () => void;
  pathname: string;
};

export function ProfileMenu({
  currentUser,
  isPending,
  onSignOut,
  pathname,
}: ProfileMenuProps) {
  const profileName =
    currentUser.profile.displayName ?? currentUser.email ?? "Echoes user";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Open account menu"
          className="max-w-[13rem] justify-between px-3"
          disabled={isPending}
          variant="outline"
        >
          <span className="hidden min-w-0 items-center gap-2 md:flex">
            <UserRound className="h-4 w-4" />
            <span className="truncate">{profileName}</span>
            <ChevronDown className="text-muted-foreground h-4 w-4" />
          </span>
          <Menu className="h-4 w-4 md:hidden" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel>
          <span className="text-foreground block tracking-normal normal-case">
            {profileName}
          </span>
          {currentUser.email ? (
            <span className="text-muted-foreground mt-1 block truncate tracking-normal normal-case">
              {currentUser.email}
            </span>
          ) : null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="md:hidden">
          {protectedNavLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <DropdownMenuItem asChild key={link.href}>
                <Link
                  aria-current={active ? "page" : undefined}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
        </div>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={isPending}
          onSelect={(event) => {
            event.preventDefault();
            onSignOut();
          }}
          tone="danger"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
