import type { Tables } from "@/types/database.types";

export type ConcertRow = Tables<{ schema: "echoes" }, "concerts">;

export type Concert = {
  id: number;
  artist: string;
  venue: string;
  city: string | null;
  concertDate: string | null;
  rating: number | null;
  setlist: string | null;
  notes: string | null;
  tags: string[];
  isWishlist: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ConcertFilter = "all" | "past" | "upcoming" | "wishlist";

export type ConcertFormInput = {
  artist: string;
  venue: string;
  city?: string | null;
  concertDate?: string | null;
  rating?: number | null;
  setlist?: string | null;
  notes?: string | null;
  tags?: string[] | string | null;
  isWishlist?: boolean;
};

export type ConcertFilterState = {
  status: ConcertFilter;
  query: string;
  year: string;
  tag: string;
};

export type ConcertStats = {
  totalShows: number;
  attendedShows: number;
  upcomingShows: number;
  wishlistShows: number;
  averageRating: number | null;
  topArtists: Array<{ name: string; count: number }>;
  topVenues: Array<{ name: string; count: number }>;
  topTags: Array<{ name: string; count: number }>;
};

export type TimelineYearGroup = {
  year: string;
  concerts: Concert[];
};
