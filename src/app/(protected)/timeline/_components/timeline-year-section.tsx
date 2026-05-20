import {
  formatConcertMonthDay,
  isPastConcert,
} from "@/features/concerts/lib/concerts";
import type { TimelineYearGroup } from "@/features/concerts/types";
import { cn } from "@/shared/utils/cn";

import { TimelineEntryCard } from "./timeline-entry-card";

type TimelineYearSectionProps = {
  group: TimelineYearGroup;
};

const timelineGrid =
  "grid grid-cols-[var(--timeline-date-col)_var(--timeline-axis-col)_minmax(0,1fr)] gap-x-[var(--timeline-gap)]";

export function TimelineYearSection({ group }: TimelineYearSectionProps) {
  return (
    <section className="relative z-10 mb-12 last:mb-0">
      <div className={cn(timelineGrid, "relative z-10 mb-4 items-center")}>
        <div className="text-center">
          <h2 className="font-display text-3xl leading-none font-bold sm:text-4xl">
            {group.year}
          </h2>
        </div>
        <div className="flex justify-center">
          <span className="bg-gradient-stage shadow-stage ring-background h-4 w-4 rounded-full ring-4" />
        </div>
        <span className="text-muted-foreground justify-self-start font-mono text-[10px] tracking-wider whitespace-nowrap uppercase">
          {group.concerts.length}{" "}
          {group.concerts.length === 1 ? "show" : "shows"}
        </span>
      </div>

      <ol className="relative z-10 grid gap-y-4">
        {group.concerts.map((concert) => {
          const past = isPastConcert(concert.concertDate);

          return (
            <li className={cn(timelineGrid, "items-start")} key={concert.id}>
              <time className="text-muted-foreground pt-4 text-right font-mono text-[10px] tracking-wider uppercase sm:pt-5">
                {formatConcertMonthDay(concert.concertDate)}
              </time>
              <div className="flex justify-center pt-4 sm:pt-5">
                <span
                  className={cn(
                    "ring-background h-3 w-3 rounded-full ring-4",
                    past ? "bg-secondary" : "bg-primary",
                  )}
                />
              </div>
              <TimelineEntryCard concert={concert} past={past} />
            </li>
          );
        })}
      </ol>
    </section>
  );
}
