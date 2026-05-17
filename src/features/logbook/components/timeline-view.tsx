import { MapPin, Star } from "lucide-react";

import {
  formatConcertMonthDay,
  isPastConcert,
} from "@/features/logbook/lib/concerts";
import type { TimelineYearGroup } from "@/features/logbook/types";
import { cn } from "@/shared/utils/cn";

type TimelineViewProps = {
  groups: TimelineYearGroup[];
};

export function TimelineView({ groups }: TimelineViewProps) {
  if (groups.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center">
        <p className="font-display text-3xl font-bold">No timeline yet.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Log your first show to start the chronology.
        </p>
      </div>
    );
  }

  return (
    <section className="relative max-w-4xl">
      <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />
      {groups.map((group) => (
        <section className="mb-12 last:mb-0" key={group.year}>
          <div className="-ml-1 mb-5 flex items-center gap-4">
            <span className="h-4 w-4 rounded-full bg-gradient-stage shadow-stage ring-4 ring-background" />
            <h2 className="font-display text-4xl font-bold">{group.year}</h2>
            <span className="font-mono text-xs text-muted-foreground">
              {group.concerts.length}{" "}
              {group.concerts.length === 1 ? "show" : "shows"}
            </span>
          </div>

          <ol className="space-y-4 pl-8">
            {group.concerts.map((concert) => {
              const past = isPastConcert(concert.concertDate);

              return (
                <li className="relative" key={concert.id}>
                  <span
                    className={cn(
                      "absolute -left-[26px] top-4 h-2.5 w-2.5 rounded-full ring-4 ring-background",
                      past ? "bg-secondary" : "bg-primary",
                    )}
                  />
                  <article className="rounded-lg border border-border bg-card/80 p-5 shadow-card transition hover:border-primary/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          {formatConcertMonthDay(concert.concertDate)}
                          {!past ? " - upcoming" : ""}
                        </p>
                        <h3 className="font-display text-2xl font-bold">
                          {concert.artist}
                        </h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>
                            {concert.venue}
                            {concert.city ? ` - ${concert.city}` : ""}
                          </span>
                        </p>
                      </div>

                      {concert.rating ? (
                        <div className="flex shrink-0">
                          {Array.from({ length: concert.rating }).map((_, index) => (
                            <Star
                              className="h-4 w-4 fill-secondary text-secondary"
                              key={index}
                            />
                          ))}
                        </div>
                      ) : null}
                    </div>

                    {concert.notes ? (
                      <p className="mt-3 line-clamp-2 text-sm italic leading-6 text-muted-foreground">
                        &quot;{concert.notes}&quot;
                      </p>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </section>
  );
}
