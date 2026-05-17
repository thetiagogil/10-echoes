import { unstable_rethrow } from "next/navigation";

import { LogbookLoadError } from "@/features/logbook/components/logbook-load-error";
import { PageIntro } from "@/features/logbook/components/page-intro";
import { TimelineView } from "@/features/logbook/components/timeline-view";
import { getTimelineGroups } from "@/features/logbook/lib/view-model";
import { hydrateLogbook } from "@/features/logbook/server/hydrate";
import type { LogbookHydration } from "@/features/logbook/types";
import { AppMain } from "@/shared/components/layout/app-main";

export default async function TimelinePage() {
  let logbook: LogbookHydration;

  try {
    logbook = await hydrateLogbook();
  } catch (error) {
    unstable_rethrow(error);

    return <LogbookLoadError error={error} />;
  }

  const groups = getTimelineGroups(logbook.concerts);

  return (
    <AppMain className="pb-12">
      <PageIntro
        description="Your concert life in chronological order: past shows as memory, future shows as anticipation."
        eyebrow="Chronology"
        title={
          <>
            The <span className="text-gradient-stage">timeline</span>.
          </>
        }
      />
      <TimelineView groups={groups} />
    </AppMain>
  );
}
