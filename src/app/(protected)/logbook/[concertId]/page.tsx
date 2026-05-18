import { notFound, unstable_rethrow } from "next/navigation";

import { parseConcertIdParam } from "@/features/concerts/lib/ids";
import type { Concert } from "@/features/concerts/types";
import { ProtectedLoadError } from "../../_components/protected-load-error";
import { hydrateConcertDetail } from "../../_lib/concert-data";
import { ConcertDetailView } from "../_components/concert-detail-view";

type ConcertDetailPageProps = {
  params: Promise<{
    concertId: string;
  }>;
};

export default async function ConcertDetailPage({
  params,
}: ConcertDetailPageProps) {
  const { concertId } = await params;
  const idResult = parseConcertIdParam(concertId);

  if (!idResult.ok) {
    notFound();
  }

  let concert: Concert;

  try {
    concert = await hydrateConcertDetail(idResult.id);
  } catch (error) {
    unstable_rethrow(error);

    return <ProtectedLoadError error={error} />;
  }

  return <ConcertDetailView initialConcert={concert} />;
}
