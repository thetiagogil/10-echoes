import { notFound, redirect } from "next/navigation";

import { getConcert, getConcerts } from "@/features/concerts/server/queries";
import { createClient } from "@/lib/supabase/server";
import { getCurrentAuthUser } from "@/shared/server/auth";

export const hydrateConcerts = async (nextPath = "/logbook") => {
  const client = await createClient();
  const user = await getCurrentAuthUser(client);

  if (!user) {
    redirect(`/auth?next=${encodeURIComponent(nextPath)}`);
  }

  return getConcerts(client);
};

export const hydrateConcertDetail = async (concertId: number) => {
  const client = await createClient();
  const user = await getCurrentAuthUser(client);

  if (!user) {
    redirect(`/auth?next=${encodeURIComponent(`/logbook/${concertId}`)}`);
  }

  const concert = await getConcert(client, concertId);

  if (!concert) {
    notFound();
  }

  return concert;
};
