import Link from "next/link";
import { Disc3 } from "lucide-react";

import { cn } from "@/shared/utils/cn";

type AppLogoProps = {
  href?: string;
};

export function AppLogo({ href }: AppLogoProps) {
  const content = (
    <span className="flex items-center gap-2">
      <span className="relative grid h-8 w-8 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary shadow-stage">
        <Disc3 className="h-4 w-4" />
      </span>
      <span className={cn("font-display text-xl font-bold")}>
        Echo<span className="text-gradient-stage">es</span>
      </span>
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link aria-label="Echoes home" href={href}>
      {content}
    </Link>
  );
}
