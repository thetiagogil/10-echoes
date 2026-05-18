import type { NormalizedConcertInput } from "@/features/logbook/lib/concerts";

export function buildCreateConcertArgs(input: NormalizedConcertInput) {
  return {
    p_artist: input.artist,
    p_venue: input.venue,
    p_concert_date: input.concertDate,
    p_city: input.city,
    p_rating: input.rating,
    p_setlist: input.setlist,
    p_notes: input.notes,
    p_tags: input.tags,
    p_is_wishlist: input.isWishlist,
  };
}

export function buildUpdateConcertArgs(
  concertId: number,
  input: NormalizedConcertInput,
) {
  return {
    p_concert_id: concertId,
    ...buildCreateConcertArgs(input),
  };
}

export function buildDeleteConcertArgs(concertId: number) {
  return {
    p_concert_id: concertId,
  };
}

export function validateConcertId(value: number):
  | { ok: true; id: number }
  | { ok: false; error: string } {
  if (!Number.isSafeInteger(value) || value < 1) {
    return { ok: false, error: "Invalid concert id." };
  }

  return { ok: true, id: value };
}
