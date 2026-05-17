import {
  filterConcerts,
  isPastConcert,
} from "@/features/logbook/lib/concerts";
import type {
  Concert,
  ConcertFilter,
  ConcertStats,
  TimelineYearGroup,
} from "@/features/logbook/types";
import type { CurrentUser } from "@/shared/types";

export function getLogbookProfileName(currentUser: CurrentUser) {
  return currentUser.profile.displayName ?? currentUser.email ?? "Echoes user";
}

export function getFilteredConcerts(
  concerts: Concert[],
  filter: ConcertFilter,
) {
  return filterConcerts(concerts, filter);
}

export function getConcertStats(concerts: Concert[]): ConcertStats {
  const attended = concerts.filter((concert) => isPastConcert(concert.concertDate));
  const upcoming = concerts.filter((concert) => !isPastConcert(concert.concertDate));
  const ratings = attended
    .map((concert) => concert.rating)
    .filter((rating): rating is number => typeof rating === "number");

  return {
    totalShows: concerts.length,
    attendedShows: attended.length,
    upcomingShows: upcoming.length,
    averageRating: ratings.length
      ? ratings.reduce((total, rating) => total + rating, 0) / ratings.length
      : null,
    topArtists: getTopCounts(attended, (concert) => concert.artist),
    topVenues: getTopCounts(attended, (concert) => concert.venue),
  };
}

export function getTimelineGroups(concerts: Concert[]): TimelineYearGroup[] {
  const sorted = filterConcerts(concerts, "all");
  const groups = new Map<string, Concert[]>();

  for (const concert of sorted) {
    const year = concert.concertDate.slice(0, 4);
    const group = groups.get(year) ?? [];
    group.push(concert);
    groups.set(year, group);
  }

  return Array.from(groups.entries()).map(([year, groupedConcerts]) => ({
    year,
    concerts: groupedConcerts,
  }));
}

export function getNextConcert(concerts: Concert[]) {
  return [...concerts]
    .filter((concert) => !isPastConcert(concert.concertDate))
    .sort((a, b) => a.concertDate.localeCompare(b.concertDate))[0] ?? null;
}

function getTopCounts(
  concerts: Concert[],
  getKey: (concert: Concert) => string | null,
  limit = 5,
) {
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
}
