import type { ConcertStats } from "@/features/concerts/types";
import { EmptyStatsText } from "./empty-stats-text";
import { StatsPanel } from "./stats-panel";

type TopVenuesPanelProps = {
  stats: ConcertStats;
};

export function TopVenuesPanel({ stats }: TopVenuesPanelProps) {
  return (
    <StatsPanel title="Favorite venues" tone="secondary">
      {stats.topVenues.length > 0 ? (
        <ul className="divide-border divide-y">
          {stats.topVenues.map((venue, index) => (
            <li
              className="flex items-center justify-between gap-4 py-3"
              key={venue.name}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-secondary w-7 font-mono text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display truncate text-xl">
                  {venue.name}
                </span>
              </div>
              <span className="text-muted-foreground font-mono text-xs">
                x{venue.count}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyStatsText />
      )}
    </StatsPanel>
  );
}
