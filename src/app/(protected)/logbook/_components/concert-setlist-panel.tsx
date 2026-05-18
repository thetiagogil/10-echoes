import { Music2 } from "lucide-react";

type ConcertSetlistPanelProps = {
  songs: string[];
};

export function ConcertSetlistPanel({ songs }: ConcertSetlistPanelProps) {
  return (
    <section>
      <h2 className="flex items-center gap-2 font-mono text-xs uppercase text-secondary">
        <Music2 className="h-3.5 w-3.5" />
        Setlist
      </h2>
      <div className="mt-3 max-h-[420px] overflow-y-auto rounded-lg border border-border/50 bg-background/45 px-3 py-3">
        {songs.length > 0 ? (
          <ol className="space-y-2 font-mono text-xs text-foreground/85">
            {songs.map((song, index) => (
              <li className="flex gap-2" key={`${song}-${index}`}>
                <span className="w-6 shrink-0 text-right text-muted-foreground/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{song}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-xs italic text-muted-foreground/55">
            No setlist recorded.
          </p>
        )}
      </div>
    </section>
  );
}
