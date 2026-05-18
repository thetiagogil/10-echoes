import { unstable_rethrow } from "next/navigation";

import { getConcertStats } from "@/features/concerts/lib/view-model";
import type { Concert } from "@/features/concerts/types";
import { AppMain } from "@/shared/components/layout/app-main";
import { PageIntro } from "../_components/page-intro";
import { ProtectedLoadError } from "../_components/protected-load-error";
import { hydrateConcerts } from "../_lib/concert-data";
import { StatsView } from "./_components/stats-view";

export default async function StatsPage() {
  let concerts: Concert[];

  try {
    concerts = await hydrateConcerts("/stats");
  } catch (error) {
    unstable_rethrow(error);

    return <ProtectedLoadError error={error} />;
  }

  const stats = getConcertStats(concerts);

  return (
    <AppMain className="pb-12">
      <PageIntro
        description="Most-seen artists, favorite venues, and the private numbers behind your live music archive."
        eyebrow="By the numbers"
        title={
          <>
            Your <span className="text-gradient-stage">stats</span>.
          </>
        }
      />
      <StatsView stats={stats} />
    </AppMain>
  );
}
