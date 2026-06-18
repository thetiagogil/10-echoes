import { mapConcert } from "@/features/concerts/server/mappers";
import type { Concert } from "@/features/concerts/types";
import { echoes, type AppSupabaseClient } from "@/lib/supabase/schemas";

const concertSelect =
  "id, user_id, artist, venue, city, concert_date, rating, setlist, notes, tags, is_wishlist, created_at, updated_at";

export const getConcerts = async (
  client: AppSupabaseClient,
): Promise<Concert[]> => {
  const { data, error } = await echoes(client)
    .from("concerts")
    .select(concertSelect)
    .order("concert_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(mapConcert);
};

export const getConcert = async (
  client: AppSupabaseClient,
  concertId: number,
): Promise<Concert | null> => {
  const { data, error } = await echoes(client)
    .from("concerts")
    .select(concertSelect)
    .eq("id", concertId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? mapConcert(data) : null;
};
