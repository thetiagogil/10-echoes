import type { ConcertFilter } from "@/features/concerts/types";
import { Button } from "@/shared/components/ui/button";

type LogbookEmptyStateProps = {
  filter: ConcertFilter;
  onCreate: () => void;
};

const copy: Record<ConcertFilter, { body: string; title: string }> = {
  all: {
    title: "No entries yet.",
    body: "Log your first show to start the archive.",
  },
  past: {
    title: "No attended shows yet.",
    body: "Future plans are waiting elsewhere. Add a past concert when you want Echoes to remember it.",
  },
  upcoming: {
    title: "No upcoming shows yet.",
    body: "Add the next date when tickets land.",
  },
  wishlist: {
    title: "No wishlist entries yet.",
    body: "Save the bucket-list shows you want Echoes to keep in view.",
  },
};

export function LogbookEmptyState({
  filter,
  onCreate,
}: LogbookEmptyStateProps) {
  const empty = copy[filter];

  return (
    <section className="border-border rounded-xl border border-dashed p-12 text-center">
      <p className="font-display text-3xl font-bold">{empty.title}</p>
      <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-6">
        {empty.body}
      </p>
      <Button className="mt-6" onClick={onCreate}>
        Log a show
      </Button>
    </section>
  );
}
