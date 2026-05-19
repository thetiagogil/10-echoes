import Link from "next/link";
import Image from "next/image";

import { cn } from "@/shared/utils/cn";

type AppLogoProps = {
  href?: string;
};

export function AppLogo({ href }: AppLogoProps) {
  const content = (
    <span className="flex items-center gap-2">
      <span className="border-primary/40 bg-primary/10 shadow-stage relative grid h-8 w-8 place-items-center overflow-hidden rounded-full border">
        <Image alt="" height={24} priority src="/favicon.svg" width={24} />
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
