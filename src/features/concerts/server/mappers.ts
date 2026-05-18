import type { Concert, ConcertRow } from "@/features/concerts/types";

export function mapConcert(row: ConcertRow): Concert {
  return {
    id: row.id,
    artist: row.artist,
    venue: row.venue,
    city: row.city,
    concertDate: row.concert_date,
    rating: row.rating,
    setlist: row.setlist,
    notes: row.notes,
    tags: row.tags,
    isWishlist: row.is_wishlist,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
