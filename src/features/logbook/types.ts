import type { CurrentUser } from "@/shared/types";
import type { EchoesConcertRow } from "@/types/database.types";

export type ConcertRow = EchoesConcertRow;

export type Concert = {
  id: number;
  artist: string;
  venue: string;
  city: string | null;
  concertDate: string;
  rating: number | null;
  setlist: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ConcertFilter = "all" | "past" | "upcoming";

export type LogbookViewMode = "logbook" | "timeline" | "stats";

export type ConcertFormInput = {
  artist: string;
  venue: string;
  city?: string | null;
  concertDate: string;
  rating?: number | null;
  setlist?: string | null;
  notes?: string | null;
};

export type ConcertStats = {
  totalShows: number;
  attendedShows: number;
  upcomingShows: number;
  averageRating: number | null;
  topArtists: Array<{ name: string; count: number }>;
  topVenues: Array<{ name: string; count: number }>;
};

export type TimelineYearGroup = {
  year: string;
  concerts: Concert[];
};

export type LogbookHydration = {
  currentUser: CurrentUser;
  concerts: Concert[];
};
