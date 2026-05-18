import { notFound, unstable_rethrow } from "next/navigation";

import { ConcertDetailView } from "@/features/logbook/components/concert-detail-view";
import { LogbookLoadError } from "@/features/logbook/components/logbook-load-error";
import { hydrateConcertDetail } from "@/features/logbook/server/hydrate";
import { validateConcertId } from "@/features/logbook/server/action-inputs";
import type { Concert } from "@/features/logbook/types";

type ConcertDetailPageProps = {
  params: Promise<{
    concertId: string;
  }>;
};

export default async function ConcertDetailPage({
  params,
}: ConcertDetailPageProps) {
  const { concertId } = await params;
  const idResult = validateConcertId(Number(concertId));

  if (!idResult.ok) {
    notFound();
  }

  let concert: Concert;

  try {
    concert = await hydrateConcertDetail(idResult.id);
  } catch (error) {
    unstable_rethrow(error);

    return <LogbookLoadError error={error} />;
  }

  return <ConcertDetailView initialConcert={concert} />;
}
