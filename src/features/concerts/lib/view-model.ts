import {
  formatTagLabel,
  filterConcerts,
  isPastConcert,
  isWishlistConcert,
} from "@/features/concerts/lib/concerts";
import type {
  Concert,
  ConcertFilterState,
  ConcertStats,
  TimelineYearGroup,
} from "@/features/concerts/types";

const statsEntryLimit = 5;

export const getFilteredConcerts = (
  concerts: Concert[],
  filters: ConcertFilterState,
) => {
  const query = filters.query.trim().toLowerCase();

  return filterConcerts(concerts, filters.status).filter((concert) => {
    if (filters.year && concert.concertDate?.slice(0, 4) !== filters.year) {
      return false;
    }

    if (filters.tag && !concert.tags.includes(filters.tag)) {
      return false;
    }

    if (!query) return true;

    return getSearchText(concert).includes(query);
  });
};

export const getAvailableYears = (concerts: Concert[]) => {
  return Array.from(
    new Set(
      concerts
        .map((concert) => concert.concertDate?.slice(0, 4))
        .filter((year): year is string => Boolean(year)),
    ),
  ).sort((a, b) => b.localeCompare(a));
};

export const getAvailableTags = (concerts: Concert[]) => {
  return Array.from(new Set(concerts.flatMap((concert) => concert.tags))).sort(
    (a, b) => formatTagLabel(a).localeCompare(formatTagLabel(b)),
  );
};

export const getConcertStats = (concerts: Concert[]): ConcertStats => {
  const wishlist = concerts.filter(isWishlistConcert);
  const scheduled = concerts.filter((concert) => !isWishlistConcert(concert));
  const attended = scheduled.filter((concert) =>
    isPastConcert(concert.concertDate),
  );
  const upcoming = scheduled.filter(
    (concert) => !isPastConcert(concert.concertDate),
  );
  const ratings = attended
    .map((concert) => concert.rating)
    .filter((rating): rating is number => typeof rating === "number");

  return {
    totalShows: concerts.length,
    attendedShows: attended.length,
    upcomingShows: upcoming.length,
    wishlistShows: wishlist.length,
    averageRating: ratings.length
      ? ratings.reduce((total, rating) => total + rating, 0) / ratings.length
      : null,
    topArtists: getTopCounts(attended, (concert) => concert.artist),
    topVenues: getTopCounts(attended, (concert) => concert.venue),
    topTags: getTopTagCounts(concerts),
  };
};

export const getTimelineGroups = (concerts: Concert[]): TimelineYearGroup[] => {
  const sorted = filterConcerts(concerts, "all").filter(
    (concert) => !isWishlistConcert(concert),
  );
  const groups = new Map<string, Concert[]>();

  for (const concert of sorted) {
    if (!concert.concertDate) continue;

    const year = concert.concertDate.slice(0, 4);
    const group = groups.get(year) ?? [];
    group.push(concert);
    groups.set(year, group);
  }

  return Array.from(groups.entries()).map(([year, groupedConcerts]) => ({
    year,
    concerts: groupedConcerts,
  }));
};

const getTopCounts = (
  concerts: Concert[],
  getKey: (concert: Concert) => string | null,
  limit = statsEntryLimit,
) => {
  const counts = new Map<string, number>();

  for (const concert of concerts) {
    const key = getKey(concert)?.trim();
    if (!key) continue;

    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
};

const getTopTagCounts = (concerts: Concert[], limit = statsEntryLimit) => {
  const counts = new Map<string, number>();

  for (const concert of concerts) {
    for (const tag of concert.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
};

const getSearchText = (concert: Concert) => {
  return [
    concert.artist,
    concert.venue,
    concert.city,
    concert.notes,
    concert.setlist,
    ...concert.tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
};
