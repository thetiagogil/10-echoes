import { unstable_rethrow } from "next/navigation";

import { LogbookLoadError } from "@/features/logbook/components/logbook-load-error";
import { PageIntro } from "@/features/logbook/components/page-intro";
import { StatsView } from "@/features/logbook/components/stats-view";
import { getConcertStats } from "@/features/logbook/lib/view-model";
import { hydrateLogbook } from "@/features/logbook/server/hydrate";
import type { LogbookHydration } from "@/features/logbook/types";
import { AppMain } from "@/shared/components/layout/app-main";

export default async function StatsPage() {
  let logbook: LogbookHydration;

  try {
    logbook = await hydrateLogbook();
  } catch (error) {
    unstable_rethrow(error);

    return <LogbookLoadError error={error} />;
  }

  const stats = getConcertStats(logbook.concerts);

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
