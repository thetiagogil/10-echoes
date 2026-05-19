import Link from "next/link";
import Image from "next/image";

import { cn } from "@/shared/utils/cn";

type AppLogoProps = {
  href?: string;
};

export function AppLogo({ href }: AppLogoProps) {
  const content = (
    <span className="group/logo flex items-center gap-2">
      <Image
        alt=""
        className="h-7 w-7 transition-transform duration-700 group-hover/logo:rotate-180"
        height={28}
        priority
        src="/favicon.svg"
        width={28}
      />
      <span className={cn("font-display text-xl font-bold")}>
        Echo<span className="text-gradient-stage">es</span>
      </span>
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link aria-label="Echoes home" className="inline-flex" href={href}>
      {content}
    </Link>
  );
}
