import type { ConcertStats } from "@/features/concerts/types";
import { EmptyStatsText } from "./empty-stats-text";
import { StatsPanel } from "./stats-panel";

type TopArtistsPanelProps = {
  stats: ConcertStats;
};

export function TopArtistsPanel({ stats }: TopArtistsPanelProps) {
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
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <span className="font-display truncate text-xl font-semibold">
                  {artist.name}
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  x{artist.count}
                </span>
              </div>
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
}
