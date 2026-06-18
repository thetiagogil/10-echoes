import type { CSSProperties } from "react";

import type { TimelineYearGroup } from "@/features/concerts/types";
import { ButtonLink } from "@/shared/components/ui/button-link";

import { TimelineYearSection } from "./timeline-year-section";

type TimelineViewProps = {
  groups: TimelineYearGroup[];
};

const timelineVariables =
  "[--timeline-axis-col:1rem] [--timeline-date-col:4.5rem] [--timeline-gap:0.75rem] sm:[--timeline-axis-col:1.25rem] sm:[--timeline-date-col:6.75rem] sm:[--timeline-gap:0.75rem]";
const timelineRailStyle = {
  left: "calc(var(--timeline-date-col) + var(--timeline-gap) + (var(--timeline-axis-col) / 2))",
} satisfies CSSProperties;

export const TimelineView = ({ groups }: TimelineViewProps) => {
  if (groups.length === 0) {
    return (
      <div className="border-border rounded-lg border border-dashed p-12 text-center">
        <p className="font-display text-3xl font-bold">No timeline yet.</p>
        <p className="text-muted-foreground mt-2 text-sm">
          Log your first show to start the chronology.
        </p>
        <ButtonLink className="mt-6" href="/logbook">
          Open logbook
        </ButtonLink>
      </div>
    );
  }

  return (
    <section className={`relative max-w-5xl ${timelineVariables}`}>
      <span
        aria-hidden="true"
        className="bg-border pointer-events-none absolute top-7 bottom-0 z-0 w-px"
        style={timelineRailStyle}
      />
      {groups.map((group) => (
        <TimelineYearSection group={group} key={group.year} />
      ))}
    </section>
  );
};
