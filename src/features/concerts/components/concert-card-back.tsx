import { ListMusic, RotateCcw } from "lucide-react";

import { ConcertCardTicketTear } from "@/features/concerts/components/concert-card-ticket-tear";
import type { Concert } from "@/features/concerts/types";
import { Button } from "@/shared/components/ui/button";

type ConcertCardBackProps = {
  concert: Concert;
  disabled: boolean;
  onFlipBack: () => void;
  songs: string[];
};

export function ConcertCardBack({
  concert,
  disabled,
  onFlipBack,
  songs,
}: ConcertCardBackProps) {
  return (
    <div className="grain border-border bg-card shadow-card !absolute inset-0 flex [transform:rotateY(180deg)] flex-col overflow-hidden rounded-lg border [backface-visibility:hidden]">
      <ConcertCardTicketTear />
      <header className="border-border/70 flex min-h-[92px] items-start justify-between gap-4 border-b border-dashed p-5">
        <div className="min-w-0">
          <p className="text-muted-foreground mb-1 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase">
            <ListMusic className="h-3.5 w-3.5" />
            Setlist
          </p>
          <h3 className="font-display truncate text-2xl leading-tight font-bold">
            {concert.artist}
          </h3>
        </div>
        <Button
          aria-label={`Show ${concert.artist} summary`}
          disabled={disabled}
          onClick={onFlipBack}
          size="icon"
          variant="ghost"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </header>

      <div className="flex flex-1 flex-col p-5 pt-6">
        {songs.length > 0 ? (
          <ol className="text-foreground/85 max-h-[250px] space-y-2 overflow-y-auto pr-1 font-mono text-xs">
            {songs.map((song, index) => (
              <li
                className="border-border/50 bg-background/35 grid grid-cols-[2rem_minmax(0,1fr)] gap-3 rounded-md border px-3 py-2"
                key={`${song}-${index}`}
              >
                <span className="text-muted-foreground/60 text-right">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{song}</span>
              </li>
            ))}
          </ol>
        ) : (
          <div className="border-border grid flex-1 place-items-center rounded-lg border border-dashed px-6 text-center">
            <p className="text-muted-foreground text-sm leading-6 italic">
              No setlist recorded for this show yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
