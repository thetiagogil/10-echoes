import type { ReactNode } from "react";

import { formatTagLabel } from "@/features/concerts/lib/concerts";
import type { ConcertStats } from "@/features/concerts/types";
import { Badge } from "@/shared/components/ui/badge";

type StatsViewProps = {
  stats: ConcertStats;
};

export function StatsView({ stats }: StatsViewProps) {
  const maxArtistCount = Math.max(
    ...stats.topArtists.map((artist) => artist.count),
    1,
  );
  const maxTagCount = Math.max(...stats.topTags.map((tag) => tag.count), 1);

  return (
    <div className="space-y-10">
      <section className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-5">
        <Stat label="Total shows" value={stats.totalShows} />
        <Stat label="Attended" value={stats.attendedShows} tone="secondary" />
        <Stat label="Upcoming" value={stats.upcomingShows} tone="primary" />
        <Stat label="Wishlist" value={stats.wishlistShows} />
        <Stat
          label="Avg. rating"
          value={stats.averageRating ? stats.averageRating.toFixed(1) : "-"}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <StatsPanel title="Most-seen artists">
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

        <StatsPanel title="Top tags">
          {stats.topTags.length > 0 ? (
            <ul className="space-y-4">
              {stats.topTags.map((tag) => (
                <li key={tag.name}>
                  <div className="mb-1 flex items-baseline justify-between gap-3">
                    <Badge variant="surface">{formatTagLabel(tag.name)}</Badge>
                    <span className="font-mono text-xs text-muted-foreground">
                      x{tag.count}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-secondary"
                      style={{
                        width: `${(tag.count / maxTagCount) * 100}%`,
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
      </section>
    </div>
  );
}

type StatProps = {
  label: string;
  tone?: "primary" | "secondary";
  value: number | string;
};

function Stat({ label, tone, value }: StatProps) {
  const toneClass =
    tone === "primary"
      ? "text-gradient-stage"
      : tone === "secondary"
        ? "text-secondary"
        : "text-foreground";

  return (
    <div className="bg-card p-5 sm:p-6">
      <p className="mb-2 font-mono text-[10px] uppercase text-muted-foreground">
        {label}
      </p>
      <p className={`font-display text-4xl font-black sm:text-5xl ${toneClass}`}>
        {value}
      </p>
    </div>
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
      Add a few tagged entries to see patterns here.
    </p>
  );
}
