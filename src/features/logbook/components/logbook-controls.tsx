import type { ConcertFilter } from "@/features/logbook/types";
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
    <section className="mb-8 space-y-3">
      <div className="inline-flex w-full items-center gap-1 rounded-lg border border-border bg-card p-1 sm:w-auto">
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

      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_160px_190px]">
        <Input
          aria-label="Search logbook"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search artist, venue, notes, tags..."
          value={query}
        />
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
      </div>
    </section>
  );
}
