import type { ConcertStats } from "@/features/concerts/types";
import { StatsSummaryGrid } from "./stats-summary-grid";
import { TopArtistsPanel } from "./top-artists-panel";
import { TopTagsPanel } from "./top-tags-panel";
import { TopVenuesPanel } from "./top-venues-panel";

type StatsViewProps = {
  stats: ConcertStats;
};

export function StatsView({ stats }: StatsViewProps) {
  return (
    <div className="space-y-10">
      <StatsSummaryGrid stats={stats} />

      <section className="grid gap-6 lg:grid-cols-3">
        <TopArtistsPanel stats={stats} />
        <TopVenuesPanel stats={stats} />
        <TopTagsPanel stats={stats} />
      </section>
    </div>
  );
}
