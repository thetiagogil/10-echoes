import type { ReactNode } from "react";

import type { ConcertStats } from "@/features/logbook/types";

type StatsViewProps = {
  stats: ConcertStats;
};

export function StatsView({ stats }: StatsViewProps) {
  const maxArtistCount = Math.max(
    ...stats.topArtists.map((artist) => artist.count),
    1,
  );

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <StatsPanel title="Top artists">
        {stats.topArtists.length > 0 ? (
          <ul className="space-y-4">
            {stats.topArtists.map((artist) => (
              <li key={artist.name}>
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="truncate font-display text-xl font-semibold">
                    {artist.name}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    x{artist.count}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-stage"
                    style={{
                      width: `${(artist.count / maxArtistCount) * 100}%`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyStatsText />
        )}
      </StatsPanel>

      <StatsPanel title="Favorite venues">
        {stats.topVenues.length > 0 ? (
          <ul className="divide-y divide-border">
            {stats.topVenues.map((venue, index) => (
              <li
                className="flex items-center justify-between gap-4 py-3"
                key={venue.name}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-7 font-mono text-xs text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate font-display text-xl">
                    {venue.name}
                  </span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  x{venue.count}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyStatsText />
        )}
      </StatsPanel>
    </section>
  );
}

type StatsPanelProps = {
  children: ReactNode;
  title: string;
};

function StatsPanel({ children, title }: StatsPanelProps) {
  return (
    <section className="rounded-lg border border-border bg-card/80 p-6 shadow-card">
      <h2 className="mb-5 font-display text-3xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function EmptyStatsText() {
  return (
    <p className="text-sm italic leading-6 text-muted-foreground">
      Log a few attended shows to see patterns here.
    </p>
  );
}
