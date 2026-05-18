import { unstable_rethrow } from "next/navigation";

import type { Concert } from "@/features/concerts/types";
import { ProtectedLoadError } from "../_components/protected-load-error";
import { hydrateConcerts } from "../_lib/concert-data";
import { LogbookView } from "./_components/logbook-view";

export default async function LogbookPage() {
  let concerts: Concert[];

  try {
    concerts = await hydrateConcerts("/logbook");
  } catch (error) {
    unstable_rethrow(error);

    return <ProtectedLoadError error={error} />;
  }

  return <LogbookView initialConcerts={concerts} />;
}
