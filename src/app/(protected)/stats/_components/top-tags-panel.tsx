import { formatTagLabel } from "@/features/concerts/lib/concerts";
import type { ConcertStats } from "@/features/concerts/types";
import { Badge } from "@/shared/components/ui/badge";
import { EmptyStatsText } from "./empty-stats-text";
import { StatsPanel } from "./stats-panel";
import { StatsRankingRow } from "./stats-ranking-row";

type TopTagsPanelProps = {
  stats: ConcertStats;
};

export function TopTagsPanel({ stats }: TopTagsPanelProps) {
  const maxTagCount = Math.max(...stats.topTags.map((tag) => tag.count), 1);
  return (
    <StatsPanel title="Top tags" tone="accent">
      {stats.topTags.length > 0 ? (
        <ul className="space-y-4">
          {stats.topTags.map((tag) => (
            <li key={tag.name}>
              <StatsRankingRow
                className="mb-1"
                count={tag.count}
                label={
                  <Badge className="max-w-full truncate" variant="surface">
                    {formatTagLabel(tag.name)}
                  </Badge>
                }
              />
              <div className="bg-muted h-2 overflow-hidden rounded-full">
                <div
                  className="bg-secondary h-full rounded-full"
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
  );
}
