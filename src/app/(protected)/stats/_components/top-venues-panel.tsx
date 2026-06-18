import type { ConcertStats } from "@/features/concerts/types";
import { EmptyStatsText } from "./empty-stats-text";
import { StatsPanel } from "./stats-panel";
import { StatsRankingRow } from "./stats-ranking-row";

type TopVenuesPanelProps = {
  stats: ConcertStats;
};

export const TopVenuesPanel = ({ stats }: TopVenuesPanelProps) => {
  return (
    <StatsPanel title="Favorite venues" tone="secondary">
      {stats.topVenues.length > 0 ? (
        <ul className="divide-border divide-y">
          {stats.topVenues.map((venue, index) => (
            <li className="py-3" key={venue.name}>
              <StatsRankingRow
                count={venue.count}
                indexLabel={String(index + 1).padStart(2, "0")}
                label={
                  <span className="font-display block truncate text-xl">
                    {venue.name}
                  </span>
                }
              />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyStatsText />
      )}
    </StatsPanel>
  );
};
