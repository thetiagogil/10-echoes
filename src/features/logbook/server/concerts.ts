import { mapConcert } from "@/features/logbook/server/mappers";
import type { Concert } from "@/features/logbook/types";
import { echoes, type AppSupabaseClient } from "@/lib/supabase/schemas";

export async function getConcerts(
  client: AppSupabaseClient,
): Promise<Concert[]> {
  const { data, error } = await echoes(client)
    .from("concerts")
    .select(
      "id, user_id, artist, venue, city, concert_date, rating, setlist, notes, created_at, updated_at",
    )
    .order("concert_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapConcert);
}
