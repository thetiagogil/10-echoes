import { formatTagLabel } from "@/features/concerts/lib/concerts";
import type { ConcertStats } from "@/features/concerts/types";
import { Badge } from "@/shared/components/ui/badge";
import { EmptyStatsText } from "./empty-stats-text";
import { StatsPanel } from "./stats-panel";

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
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <Badge variant="surface">{formatTagLabel(tag.name)}</Badge>
                <span className="text-muted-foreground font-mono text-xs">
                  x{tag.count}
                </span>
              </div>
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
