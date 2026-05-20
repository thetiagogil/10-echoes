import { MapPin, Star } from "lucide-react";
import Link from "next/link";

import type { Concert } from "@/features/concerts/types";

type TimelineEntryCardProps = {
  concert: Concert;
  past: boolean;
};

export function TimelineEntryCard({ concert, past }: TimelineEntryCardProps) {
  return (
    <Link
      className="border-border bg-card/80 shadow-card hover:border-primary/50 focus-visible:ring-ring block rounded-lg border p-4 transition focus-visible:ring-1 focus-visible:outline-none sm:p-5"
      href={`/logbook/${concert.id}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-muted-foreground mb-1 font-mono text-[10px] tracking-[0.18em] uppercase">
            {past ? "attended" : "upcoming"}
          </p>
          <h3 className="font-display text-xl leading-tight font-bold wrap-break-word sm:text-2xl">
            {concert.artist}
          </h3>
          <p className="text-muted-foreground mt-2 flex items-start gap-1.5 text-sm">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              {concert.venue}
              {concert.city ? ` - ${concert.city}` : ""}
            </span>
          </p>
        </div>

        {concert.rating ? (
          <div className="flex shrink-0 gap-0.5 sm:justify-end">
            {Array.from({ length: concert.rating }).map((_, index) => (
              <Star
                className="fill-secondary text-secondary h-4 w-4"
                key={index}
              />
            ))}
          </div>
        ) : null}
      </div>

      {concert.notes ? (
        <p className="text-muted-foreground mt-3 line-clamp-2 text-sm leading-6 italic">
          &quot;{concert.notes}&quot;
        </p>
      ) : null}
    </Link>
  );
}
