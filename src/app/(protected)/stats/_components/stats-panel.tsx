import type { ReactNode } from "react";

import { cn } from "@/shared/utils/cn";

type StatsPanelTone = "accent" | "primary" | "secondary";

type StatsPanelProps = {
  children: ReactNode;
  title: string;
  tone: StatsPanelTone;
};

const toneStyles: Record<StatsPanelTone, string> = {
  accent: "from-accent/35 to-transparent",
  primary: "from-primary/30 to-transparent",
  secondary: "from-secondary/25 to-transparent",
};

export const StatsPanel = ({ children, title, tone }: StatsPanelProps) => {
  return (
    <section className="border-border bg-card/80 shadow-card relative min-w-0 overflow-hidden rounded-lg border p-6">
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r",
          toneStyles[tone],
        )}
      />
      <h2 className="font-display mb-5 text-3xl font-bold">{title}</h2>
      {children}
    </section>
  );
};
