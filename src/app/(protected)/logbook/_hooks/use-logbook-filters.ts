"use client";

import { useMemo, useState } from "react";

import { formatTagLabel } from "@/features/concerts/lib/concerts";
import {
  getAvailableTags,
  getAvailableYears,
  getFilteredConcerts,
} from "@/features/concerts/lib/view-model";
import type { Concert, ConcertFilter } from "@/features/concerts/types";

export function useLogbookFilters(concerts: Concert[]) {
  const [activeFilter, setActiveFilter] = useState<ConcertFilter>("all");
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [tag, setTag] = useState("");
  const hasActiveFilters =
    activeFilter !== "all" ||
    query.trim().length > 0 ||
    year.length > 0 ||
    tag.length > 0;

  const resetFilters = () => {
    setActiveFilter("all");
    setQuery("");
    setYear("");
    setTag("");
  };

  const visibleConcerts = useMemo(
    () =>
      getFilteredConcerts(concerts, {
        status: activeFilter,
        query,
        year,
        tag,
      }),
    [activeFilter, concerts, query, tag, year],
  );
  const yearOptions = useMemo(
    () =>
      getAvailableYears(concerts).map((availableYear) => ({
        label: availableYear,
        value: availableYear,
      })),
    [concerts],
  );
  const availableTags = useMemo(() => getAvailableTags(concerts), [concerts]);
  const tagOptions = useMemo(
    () =>
      availableTags.map((availableTag) => ({
        label: formatTagLabel(availableTag),
        value: availableTag,
      })),
    [availableTags],
  );

  return {
    activeFilter,
    availableTags,
    hasActiveFilters,
    query,
    resetFilters,
    setActiveFilter,
    setQuery,
    setTag,
    setYear,
    tag,
    tagOptions,
    visibleConcerts,
    year,
    yearOptions,
  };
}
