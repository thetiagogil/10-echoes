import { unstable_rethrow } from "next/navigation";

import { getTimelineGroups } from "@/features/concerts/lib/view-model";
import type { Concert } from "@/features/concerts/types";
import { AppMain } from "@/shared/components/layout/app-main";
import { PageIntro } from "../_components/page-intro";
import { ProtectedLoadError } from "../_components/protected-load-error";
import { hydrateConcerts } from "../_lib/concert-data";
import { TimelineView } from "./_components/timeline-view";

export default async function TimelinePage() {
  let concerts: Concert[];

  try {
    concerts = await hydrateConcerts("/timeline");
  } catch (error) {
    unstable_rethrow(error);

    return <ProtectedLoadError error={error} />;
  }

  const groups = getTimelineGroups(concerts);

  return (
    <AppMain className="pb-12">
      <PageIntro
        description="Your concert life in chronological order: past shows as memory, future shows as anticipation."
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
