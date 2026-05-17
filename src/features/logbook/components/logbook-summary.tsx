import { CalendarDays, MapPin, Music2, Star } from "lucide-react";
import type { ComponentType } from "react";

import { formatConcertDate } from "@/features/logbook/lib/concerts";
import type { Concert, ConcertStats } from "@/features/logbook/types";

type LogbookSummaryProps = {
  profileName: string;
  stats: ConcertStats;
  nextConcert: Concert | null;
};

export function LogbookSummary({
  nextConcert,
  profileName,
  stats,
}: LogbookSummaryProps) {
  return (
    <section className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
      <div className="min-w-0">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-secondary">
          Private live music journal
        </p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-display text-4xl font-black leading-none tracking-tight sm:text-5xl md:text-7xl">
              Your <span className="text-gradient-stage">shows</span>.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base md:text-lg md:leading-7">
              Log the artists, venues, setlists, ratings, and memories you want
              to keep after the lights come up.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card/70 px-4 py-3 shadow-card">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              signed in
            </p>
            <p className="mt-1 max-w-56 truncate font-semibold text-foreground">
              {profileName}
            </p>
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          <SummaryMetric icon={Music2} label="Total shows" value={stats.totalShows} />
          <SummaryMetric icon={CalendarDays} label="Attended" value={stats.attendedShows} />
          <SummaryMetric icon={MapPin} label="Upcoming" value={stats.upcomingShows} />
          <SummaryMetric
            icon={Star}
            label="Avg rating"
            value={stats.averageRating ? stats.averageRating.toFixed(1) : "-"}
          />
        </dl>
      </div>

      <aside className="rounded-lg border border-primary/30 bg-card/80 p-5 shadow-card">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
          Next up
        </p>
        {nextConcert ? (
          <div className="mt-5">
            <h2 className="font-display text-3xl font-bold leading-tight">
              {nextConcert.artist}
            </h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>
                {nextConcert.venue}
                {nextConcert.city ? ` - ${nextConcert.city}` : ""}
              </span>
            </p>
            <p className="mt-2 flex items-center gap-2 font-mono text-xs text-secondary">
              <CalendarDays className="h-4 w-4" />
              {formatConcertDate(nextConcert.concertDate)}
            </p>
            {nextConcert.notes ? (
              <p className="mt-5 text-sm italic leading-6 text-muted-foreground">
                &quot;{nextConcert.notes}&quot;
              </p>
            ) : null}
          </div>
        ) : (
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            No upcoming concerts yet. Add the next show when tickets land.
          </p>
        )}
      </aside>
    </section>
  );
}

type SummaryMetricProps = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
};

function SummaryMetric({ icon: Icon, label, value }: SummaryMetricProps) {
  return (
    <div className="bg-card p-4">
      <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-secondary" />
        {label}
      </dt>
      <dd className="mt-2 font-display text-4xl font-black">{value}</dd>
    </div>
  );
}
