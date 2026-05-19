import { MapPin, Star } from "lucide-react";
import Link from "next/link";

import {
  formatConcertMonthDay,
  isPastConcert,
} from "@/features/concerts/lib/concerts";
import type { TimelineYearGroup } from "@/features/concerts/types";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { cn } from "@/shared/utils/cn";

type TimelineViewProps = {
  groups: TimelineYearGroup[];
};

export function TimelineView({ groups }: TimelineViewProps) {
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
    <section className="max-w-5xl">
      {groups.map((group) => (
        <section className="mb-12 last:mb-0" key={group.year}>
          <div className="mb-4 grid grid-cols-[4.75rem_1.25rem_minmax(0,1fr)] items-center gap-4">
            <div className="text-center">
              <h2 className="font-display text-4xl leading-none font-bold">
                {group.year}
              </h2>
              <span className="text-muted-foreground mt-1 block font-mono text-[10px] uppercase">
                {group.concerts.length}{" "}
                {group.concerts.length === 1 ? "show" : "shows"}
              </span>
            </div>
            <div className="flex justify-center">
              <span className="bg-gradient-stage shadow-stage ring-background h-4 w-4 rounded-full ring-4" />
            </div>
            <div className="bg-border h-px" />
          </div>

          <ol className="space-y-4">
            {group.concerts.map((concert, index) => {
              const past = isPastConcert(concert.concertDate);

              return (
                <li
                  className="grid grid-cols-[4.75rem_1.25rem_minmax(0,1fr)] gap-4"
                  key={concert.id}
                >
                  <time className="text-muted-foreground pt-5 text-right font-mono text-[10px] tracking-wider uppercase">
                    {formatConcertMonthDay(concert.concertDate)}
                  </time>
                  <div className="relative flex justify-center">
                    <span
                      className={cn(
                        "bg-border absolute top-0 w-px",
                        index === group.concerts.length - 1
                          ? "bottom-1/2"
                          : "-bottom-4",
                      )}
                    />
                    <span
                      className={cn(
                        "ring-background relative mt-6 h-2.5 w-2.5 rounded-full ring-4",
                        past ? "bg-secondary" : "bg-primary",
                      )}
                    />
                  </div>
                  <Link
                    className="border-border bg-card/80 shadow-card hover:border-primary/50 block rounded-lg border p-5 transition"
                    href={`/logbook/${concert.id}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-muted-foreground mb-1 font-mono text-[10px] tracking-[0.18em] uppercase">
                          {past ? "attended" : "upcoming"}
                        </p>
                        <h3 className="font-display text-2xl font-bold">
                          {concert.artist}
                        </h3>
                        <p className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>
                            {concert.venue}
                            {concert.city ? ` - ${concert.city}` : ""}
                          </span>
                        </p>
                      </div>

                      {concert.rating ? (
                        <div className="flex shrink-0">
                          {Array.from({ length: concert.rating }).map(
                            (_, index) => (
                              <Star
                                className="fill-secondary text-secondary h-4 w-4"
                                key={index}
                              />
                            ),
                          )}
                        </div>
                      ) : null}
                    </div>

                    {concert.notes ? (
                      <p className="text-muted-foreground mt-3 line-clamp-2 text-sm leading-6 italic">
                        &quot;{concert.notes}&quot;
                      </p>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </section>
  );
}
