import { unstable_rethrow } from "next/navigation";

import { LogbookLoadError } from "@/features/logbook/components/logbook-load-error";
import { LogbookView } from "@/features/logbook/components/logbook-view";
import { hydrateLogbook } from "@/features/logbook/server/hydrate";
import type { LogbookHydration } from "@/features/logbook/types";

export default async function LogbookPage() {
  let logbook: LogbookHydration;

  try {
    logbook = await hydrateLogbook();
  } catch (error) {
    unstable_rethrow(error);

    return <LogbookLoadError error={error} />;
  }

  return (
    <LogbookView
      currentUser={logbook.currentUser}
      initialConcerts={logbook.concerts}
    />
  );
}
