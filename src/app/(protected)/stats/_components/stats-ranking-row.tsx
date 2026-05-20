import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type StatsRankingRowProps = {
  className?: string;
  count: number;
  indexLabel?: string;
  label: ReactNode;
};

export function StatsRankingRow({
  className,
  count,
  indexLabel,
  label,
}: StatsRankingRowProps) {
  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3",
        className,
      )}
    >
      <div className="flex min-w-0 items-baseline gap-3">
        {indexLabel ? (
          <span className="text-secondary w-7 shrink-0 font-mono text-xs">
            {indexLabel}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">{label}</div>
      </div>
      <span className="text-muted-foreground shrink-0 font-mono text-xs">
        x{count}
      </span>
    </div>
  );
}
