import { BarChart3, CalendarClock, ListMusic, Plus } from "lucide-react";
import type { ComponentType } from "react";

import type {
  ConcertFilter,
  LogbookViewMode,
} from "@/features/logbook/types";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

const viewOptions: Array<{
  value: LogbookViewMode;
  label: string;
  icon: ComponentType<{ className?: string }>;
}> = [
  { value: "logbook", label: "Logbook", icon: ListMusic },
  { value: "timeline", label: "Timeline", icon: CalendarClock },
  { value: "stats", label: "Stats", icon: BarChart3 },
];

const filterOptions: Array<{ value: ConcertFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "past", label: "Past" },
  { value: "upcoming", label: "Upcoming" },
];

type LogbookControlsProps = {
  activeFilter: ConcertFilter;
  activeView: LogbookViewMode;
  onCreate: () => void;
  onFilterChange: (filter: ConcertFilter) => void;
  onViewChange: (view: LogbookViewMode) => void;
};

export function LogbookControls({
  activeFilter,
  activeView,
  onCreate,
  onFilterChange,
  onViewChange,
}: LogbookControlsProps) {
  return (
    <section className="mb-6 flex flex-col gap-4 rounded-lg border border-border bg-card/70 p-3 shadow-card lg:flex-row lg:items-center lg:justify-between">
      <div className="grid grid-cols-3 gap-1 rounded-md bg-background/60 p-1">
        {viewOptions.map(({ icon: Icon, label, value }) => (
          <button
            className={cn(
              "inline-flex h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold transition",
              activeView === value
                ? "bg-gradient-stage text-primary-foreground shadow-stage"
                : "text-muted-foreground hover:bg-surface hover:text-foreground",
            )}
            key={value}
            onClick={() => onViewChange(value)}
            type="button"
          >
            <Icon className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end">
        <div className="inline-grid grid-cols-3 rounded-md border border-border bg-background/50 p-1">
          {filterOptions.map(({ label, value }) => (
            <button
              className={cn(
                "h-8 rounded px-3 text-xs font-semibold transition",
                activeFilter === value
                  ? "bg-secondary text-secondary-foreground"
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

        <Button onClick={onCreate} size="lg">
          <Plus className="h-4 w-4" />
          Log a show
        </Button>
      </div>
    </section>
  );
}
