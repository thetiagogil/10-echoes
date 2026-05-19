import type {
  Concert,
  ConcertFilter,
  ConcertFormInput,
} from "@/features/concerts/types";
import { normalizeTagValue } from "@/features/concerts/lib/tags";

const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
const minimumDate = "1900-01-01";
const maximumDate = "2100-12-31";
const maximumTags = 12;
const maximumTagLength = 40;

export type NormalizedConcertInput = {
  artist: string;
  venue: string;
  city: string | null;
  concertDate: string | null;
  rating: number | null;
  setlist: string | null;
  notes: string | null;
  tags: string[];
  isWishlist: boolean;
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
  const concertDate = normalizeOptional(input.concertDate);
  const setlist = normalizeOptional(input.setlist);
  const notes = normalizeOptional(input.notes);
  const rating = normalizeRating(input.rating);
  const tags = normalizeTags(input.tags);
  const isWishlist = input.isWishlist === true;

  if (artist.length < 1) return { ok: false, error: "Artist is required." };
  if (artist.length > 160)
    return { ok: false, error: "Artist must be 160 characters or less." };
  if (venue.length < 1) return { ok: false, error: "Venue is required." };
  if (venue.length > 160)
    return { ok: false, error: "Venue must be 160 characters or less." };
  if (city && city.length > 120)
    return { ok: false, error: "City must be 120 characters or less." };
  if (!isWishlist && !concertDate) {
    return {
      ok: false,
      error: "Concert date is required unless this is a wishlist entry.",
    };
  }
  if (concertDate && !isValidDateOnly(concertDate)) {
    return { ok: false, error: "Concert date must use YYYY-MM-DD." };
  }
  if (concertDate && (concertDate < minimumDate || concertDate > maximumDate)) {
    return { ok: false, error: "Concert date must be between 1900 and 2100." };
  }
  if (
    rating !== null &&
    (!Number.isFinite(rating) || rating < 1 || rating > 5)
  ) {
    return { ok: false, error: "Rating must be between 1 and 5." };
  }
  if (!tags.ok) {
    return { ok: false, error: tags.error };
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
      tags: tags.data,
      isWishlist,
    },
  };
}

export function isWishlistConcert(concert: Concert) {
  return concert.isWishlist || !concert.concertDate;
}

export function isPastConcert(
  concertDate: string | null,
  today = getTodayDateOnly(),
) {
  if (!concertDate) return false;

  return concertDate < today;
}

export function isUpcomingConcert(
  concert: Concert,
  today = getTodayDateOnly(),
) {
  return (
    !isWishlistConcert(concert) && !isPastConcert(concert.concertDate, today)
  );
}

export function filterConcerts(
  concerts: Concert[],
  filter: ConcertFilter,
): Concert[] {
  const sorted = [...concerts].sort(compareConcerts);

  if (filter === "past") {
    return sorted.filter(
      (concert) =>
        !isWishlistConcert(concert) && isPastConcert(concert.concertDate),
    );
  }
  if (filter === "upcoming") {
    return sorted
      .filter((concert) => isUpcomingConcert(concert))
      .sort(compareUpcomingConcerts);
  }
  if (filter === "wishlist") {
    return sorted.filter(isWishlistConcert);
  }

  return sorted;
}

export function formatConcertDate(concertDate: string | null) {
  if (!concertDate) return "Someday";

  return new Date(`${concertDate}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatConcertMonthDay(concertDate: string | null) {
  if (!concertDate) return "Someday";

  return new Date(`${concertDate}T00:00:00`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
}

export function formatTagLabel(tag: string) {
  return tag
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function compareConcerts(a: Concert, b: Concert) {
  if (!a.concertDate && !b.concertDate) {
    return a.artist.localeCompare(b.artist);
  }
  if (!a.concertDate) return 1;
  if (!b.concertDate) return -1;

  const dateCompare = b.concertDate.localeCompare(a.concertDate);
  if (dateCompare !== 0) return dateCompare;

  return a.artist.localeCompare(b.artist);
}

function compareUpcomingConcerts(a: Concert, b: Concert) {
  if (!a.concertDate && !b.concertDate) {
    return a.artist.localeCompare(b.artist);
  }
  if (!a.concertDate) return 1;
  if (!b.concertDate) return -1;

  const dateCompare = a.concertDate.localeCompare(b.concertDate);
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

function normalizeTags(
  value: string[] | string | null | undefined,
): { ok: true; data: string[] } | { ok: false; error: string } {
  const rawTags = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(",")
      : [];
  const seen = new Set<string>();
  const tags: string[] = [];

  for (const rawTag of rawTags) {
    const tag = normalizeTagValue(rawTag);
    if (!tag) continue;

    if (tag.length > maximumTagLength) {
      return {
        ok: false,
        error: `Tags must be ${maximumTagLength} characters or less.`,
      };
    }

    if (!seen.has(tag)) {
      seen.add(tag);
      tags.push(tag);
    }

    if (tags.length > maximumTags) {
      return { ok: false, error: `Use ${maximumTags} tags or fewer.` };
    }
  }

  return { ok: true, data: tags };
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
