import type { Concert, ConcertFilter, ConcertFormInput } from "@/features/logbook/types";

const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
const minimumDate = "1900-01-01";
const maximumDate = "2100-12-31";

export type NormalizedConcertInput = {
  artist: string;
  venue: string;
  city: string | null;
  concertDate: string;
  rating: number | null;
  setlist: string | null;
  notes: string | null;
};

export type NormalizedConcertResult =
  | { ok: true; data: NormalizedConcertInput }
  | { ok: false; error: string };

export function normalizeConcertInput(
  input: ConcertFormInput,
): NormalizedConcertResult {
  const artist = input.artist.trim();
  const venue = input.venue.trim();
  const city = normalizeOptional(input.city);
  const concertDate = input.concertDate.trim();
  const setlist = normalizeOptional(input.setlist);
  const notes = normalizeOptional(input.notes);
  const rating = normalizeRating(input.rating);

  if (artist.length < 1) return { ok: false, error: "Artist is required." };
  if (artist.length > 160) return { ok: false, error: "Artist must be 160 characters or less." };
  if (venue.length < 1) return { ok: false, error: "Venue is required." };
  if (venue.length > 160) return { ok: false, error: "Venue must be 160 characters or less." };
  if (city && city.length > 120) return { ok: false, error: "City must be 120 characters or less." };
  if (!isValidDateOnly(concertDate)) return { ok: false, error: "Concert date is required." };
  if (concertDate < minimumDate || concertDate > maximumDate) {
    return { ok: false, error: "Concert date must be between 1900 and 2100." };
  }
  if (rating !== null && (!Number.isFinite(rating) || rating < 1 || rating > 5)) {
    return { ok: false, error: "Rating must be between 1 and 5." };
  }
  if (setlist && setlist.length > 5000) {
    return { ok: false, error: "Setlist must be 5,000 characters or less." };
  }
  if (notes && notes.length > 3000) {
    return { ok: false, error: "Notes must be 3,000 characters or less." };
  }

  return {
    ok: true,
    data: {
      artist,
      venue,
      city,
      concertDate,
      rating,
      setlist,
      notes,
    },
  };
}

export function isPastConcert(concertDate: string, today = getTodayDateOnly()) {
  return concertDate < today;
}

export function filterConcerts(
  concerts: Concert[],
  filter: ConcertFilter,
): Concert[] {
  const sorted = [...concerts].sort(compareConcerts);

  if (filter === "past") return sorted.filter((concert) => isPastConcert(concert.concertDate));
  if (filter === "upcoming") return sorted.filter((concert) => !isPastConcert(concert.concertDate)).reverse();

  return sorted;
}

export function formatConcertDate(concertDate: string) {
  return new Date(`${concertDate}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatConcertMonthDay(concertDate: string) {
  return new Date(`${concertDate}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
}

function compareConcerts(a: Concert, b: Concert) {
  const dateCompare = b.concertDate.localeCompare(a.concertDate);
  if (dateCompare !== 0) return dateCompare;

  return a.artist.localeCompare(b.artist);
}

function normalizeOptional(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizeRating(value: number | null | undefined) {
  if (value === null || value === undefined || value === 0) return null;
  if (!Number.isInteger(value)) return Number.NaN;

  return value;
}

function isValidDateOnly(value: string) {
  const match = datePattern.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function getTodayDateOnly() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}
