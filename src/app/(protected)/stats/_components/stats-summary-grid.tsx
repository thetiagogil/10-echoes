import type { ConcertStats } from "@/features/concerts/types";
import { StatsSummaryCard } from "./stats-summary-card";

type StatsSummaryGridProps = {
  stats: ConcertStats;
};

export const StatsSummaryGrid = ({ stats }: StatsSummaryGridProps) => {
  return (
    <section className="border-border bg-border grid grid-cols-2 gap-px overflow-hidden rounded-xl border md:grid-cols-5">
      <StatsSummaryCard label="Total shows" value={stats.totalShows} />
      <StatsSummaryCard
        label="Attended"
        tone="secondary"
        value={stats.attendedShows}
      />
      <StatsSummaryCard
        label="Upcoming"
        tone="primary"
        value={stats.upcomingShows}
      />
      <StatsSummaryCard label="Wishlist" value={stats.wishlistShows} />
      <StatsSummaryCard
        label="Avg. rating"
        value={stats.averageRating ? stats.averageRating.toFixed(1) : "-"}
      />
    </section>
  );
};
