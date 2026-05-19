import { Search } from "lucide-react";

import type { ConcertFilter } from "@/features/concerts/types";
import { Input } from "@/shared/components/ui/input";
import { Select, type SelectOption } from "@/shared/components/ui/select";
import { cn } from "@/shared/utils/cn";

const filterOptions: Array<{ value: ConcertFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "past", label: "Past" },
  { value: "upcoming", label: "Upcoming" },
  { value: "wishlist", label: "Wishlist" },
];

type LogbookControlsProps = {
  activeFilter: ConcertFilter;
  hasConcerts: boolean;
  query: string;
  tag: string;
  tagOptions: SelectOption[];
  year: string;
  yearOptions: SelectOption[];
  onFilterChange: (filter: ConcertFilter) => void;
  onQueryChange: (query: string) => void;
  onTagChange: (tag: string) => void;
  onYearChange: (year: string) => void;
};

export function LogbookControls({
  activeFilter,
  hasConcerts,
  query,
  tag,
  tagOptions,
  year,
  yearOptions,
  onFilterChange,
  onQueryChange,
  onTagChange,
  onYearChange,
}: LogbookControlsProps) {
  const yearDisabled = !hasConcerts || (yearOptions.length === 0 && !year);
  const tagDisabled = !hasConcerts || (tagOptions.length === 0 && !tag);

  return (
    <section className="mb-8 flex flex-wrap items-center gap-3">
      <div className="border-border bg-card inline-flex h-10 w-full items-center gap-1 rounded-lg border p-1 shadow-sm transition-colors sm:w-auto">
        {filterOptions.map(({ label, value }) => (
          <button
            className={cn(
              "h-8 flex-1 rounded-md px-4 text-sm font-semibold capitalize transition-colors disabled:pointer-events-none disabled:opacity-50 sm:flex-none",
              activeFilter === value
                ? "bg-gradient-stage text-primary-foreground shadow-stage"
                : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground",
            )}
            disabled={!hasConcerts}
            key={value}
            onClick={() => onFilterChange(value)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative min-w-55 flex-1">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          aria-label="Search logbook"
          className="pl-9"
          disabled={!hasConcerts}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search artist, venue, notes, tags..."
          value={query}
        />
      </div>
      <Select
        aria-label="Filter by year"
        disabled={yearDisabled}
        onValueChange={onYearChange}
        options={yearOptions}
        placeholder="Any year"
        value={year}
        wrapperClassName="w-full sm:w-36"
      />
      <Select
        aria-label="Filter by tag"
        disabled={tagDisabled}
        onValueChange={onTagChange}
        options={tagOptions}
        placeholder="Any tag"
        value={tag}
        wrapperClassName="w-full sm:w-42"
      />
    </section>
  );
}
