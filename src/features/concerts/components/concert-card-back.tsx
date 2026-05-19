import { ConcertCardTicketTear } from "@/features/concerts/components/concert-card-ticket-tear";
import type { Concert } from "@/features/concerts/types";
import { cn } from "@/shared/utils/cn";

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
    <div
      className={cn(
        "grain border-border bg-card shadow-card absolute! inset-0 flex transform-[rotateY(180deg)] flex-col overflow-hidden rounded-lg border transition-colors backface-hidden",
        disabled ? "cursor-default" : "hover:border-primary/45 cursor-pointer",
      )}
    >
      <button
        aria-label={`Show ${concert.artist} summary`}
        className="focus-visible:ring-primary/70 absolute inset-0 z-0 appearance-none rounded-lg border-0 bg-transparent p-0 focus-visible:ring-2 focus-visible:outline-hidden focus-visible:ring-inset disabled:cursor-default"
        disabled={disabled}
        onClick={onFlipBack}
        type="button"
      />
      <ConcertCardTicketTear />
      <header className="border-border/70 pointer-events-none relative z-10 flex min-h-23 items-start justify-between gap-4 border-b border-dashed p-5">
        <div className="min-w-0">
          <p className="text-muted-foreground mb-1 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase">
            Setlist
          </p>
          <h3 className="font-display group-hover:text-primary truncate text-2xl leading-tight font-bold transition-colors">
            {concert.artist}
          </h3>
        </div>
      </header>

      <div className="pointer-events-none relative z-10 flex flex-1 flex-col p-5 pt-6">
        {songs.length > 0 ? (
          <ol className="text-foreground/85 max-h-62.5 space-y-2 overflow-y-auto pr-1 font-mono text-xs">
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
