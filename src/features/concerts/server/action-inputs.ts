import type { NormalizedConcertInput } from "@/features/concerts/lib/concerts";
import type { Database } from "@/types/database.types";

type CreateConcertArgs =
  Database["echoes"]["Functions"]["create_concert"]["Args"];
type UpdateConcertArgs =
  Database["echoes"]["Functions"]["update_concert"]["Args"];

export const buildCreateConcertArgs = (
  input: NormalizedConcertInput,
): CreateConcertArgs => {
  return {
    p_artist: input.artist,
    p_venue: input.venue,
    p_concert_date: toRpcConcertDate(input.concertDate),
    p_city: toOptionalRpcValue(input.city),
    p_rating: toOptionalRpcValue(input.rating),
    p_setlist: toOptionalRpcValue(input.setlist),
    p_notes: toOptionalRpcValue(input.notes),
    p_tags: input.tags,
    p_is_wishlist: input.isWishlist,
  };
};

export const buildUpdateConcertArgs = (
  concertId: number,
  input: NormalizedConcertInput,
): UpdateConcertArgs => {
  return {
    p_concert_id: concertId,
    ...buildCreateConcertArgs(input),
  };
};

export const buildDeleteConcertArgs = (concertId: number) => {
  return {
    p_concert_id: concertId,
  };
};

export const validateConcertId = (
  value: number,
): { ok: true; id: number } | { ok: false; error: string } => {
  if (!Number.isSafeInteger(value) || value < 1) {
    return { ok: false, error: "Invalid concert id." };
  }

  return { ok: true, id: value };
};

const toOptionalRpcValue = <T>(value: T | null): T | undefined => {
  return value ?? undefined;
};

const toRpcConcertDate = (
  concertDate: NormalizedConcertInput["concertDate"],
): CreateConcertArgs["p_concert_date"] => {
  // Supabase generated RPC types cannot express nullable Postgres parameters.
  return concertDate as CreateConcertArgs["p_concert_date"];
};
