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
  return (
    <section className="mb-8 grid gap-3 lg:grid-cols-[minmax(280px,0.8fr)_minmax(260px,1fr)_150px_170px]">
      <div className="border-border bg-card inline-flex w-full items-center gap-1 rounded-lg border p-1">
        {filterOptions.map(({ label, value }) => (
          <button
            className={cn(
              "h-9 flex-1 rounded-md px-4 text-sm font-semibold capitalize transition sm:flex-none",
              activeFilter === value
                ? "bg-gradient-stage text-primary-foreground shadow-stage"
                : "text-muted-foreground hover:text-foreground",
            )}
            key={value}
            onClick={() => onFilterChange(value)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          aria-label="Search logbook"
          className="pl-9"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search artist, venue, notes, tags..."
          value={query}
        />
      </div>
      <Select
        aria-label="Filter by year"
        onValueChange={onYearChange}
        options={yearOptions}
        placeholder="Any year"
        value={year}
      />
      <Select
        aria-label="Filter by tag"
        onValueChange={onTagChange}
        options={tagOptions}
        placeholder="Any tag"
        value={tag}
      />
    </section>
  );
}
