import type { ConcertStats } from "@/features/concerts/types";
import { EmptyStatsText } from "./empty-stats-text";
import { StatsPanel } from "./stats-panel";
import { StatsRankingRow } from "./stats-ranking-row";

type TopArtistsPanelProps = {
  stats: ConcertStats;
};

export const TopArtistsPanel = ({ stats }: TopArtistsPanelProps) => {
  const maxArtistCount = Math.max(
    ...stats.topArtists.map((artist) => artist.count),
    1,
  );

  return (
    <StatsPanel title="Most-seen artists" tone="primary">
      {stats.topArtists.length > 0 ? (
        <ul className="space-y-4">
          {stats.topArtists.map((artist) => (
            <li key={artist.name}>
              <StatsRankingRow
                className="mb-1"
                count={artist.count}
                label={
                  <span className="font-display block truncate text-xl font-semibold">
                    {artist.name}
                  </span>
                }
              />
              <div className="bg-muted h-2 overflow-hidden rounded-full">
                <div
                  className="bg-gradient-stage h-full rounded-full"
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
  );
};
