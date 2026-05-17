import type { ConcertFilter } from "@/features/logbook/types";
import { cn } from "@/shared/utils/cn";

const filterOptions: Array<{ value: ConcertFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "past", label: "Past" },
  { value: "upcoming", label: "Upcoming" },
];

type LogbookControlsProps = {
  activeFilter: ConcertFilter;
  onFilterChange: (filter: ConcertFilter) => void;
};

export function LogbookControls({
  activeFilter,
  onFilterChange,
}: LogbookControlsProps) {
  return (
    <section className="mb-8">
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
    </section>
  );
}
