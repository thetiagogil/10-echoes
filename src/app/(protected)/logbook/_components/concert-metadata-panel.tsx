import { Tag } from "lucide-react";

import {
  formatConcertDate,
  formatTagLabel,
} from "@/features/concerts/lib/concerts";
import type { Concert } from "@/features/concerts/types";

type ConcertMetadataPanelProps = {
  concert: Concert;
  status: string;
};

export function ConcertMetadataPanel({
  concert,
  status,
}: ConcertMetadataPanelProps) {
  return (
    <section className="lg:col-span-2">
      <h2 className="flex items-center gap-2 font-mono text-xs uppercase text-secondary">
        <Tag className="h-3.5 w-3.5" />
        Entry metadata
      </h2>
      <dl className="mt-3 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
        <DetailStat label="Status" value={status} />
        <DetailStat
          label="Date"
          value={formatConcertDate(concert.concertDate)}
        />
        <DetailStat
          label="Tags"
          value={
            concert.tags.length > 0
              ? concert.tags.map(formatTagLabel).join(", ")
              : "None"
          }
        />
      </dl>
    </section>
  );
}

type DetailStatProps = {
  label: string;
  value: string;
};

function DetailStat({ label, value }: DetailStatProps) {
  return (
    <div className="bg-card p-4">
      <dt className="mb-1 font-mono text-[10px] uppercase text-muted-foreground">
        {label}
      </dt>
      <dd className="truncate text-sm font-semibold">{value}</dd>
    </div>
  );
}
