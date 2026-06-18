import { Music2 } from "lucide-react";

type ConcertSetlistPanelProps = {
  songs: string[];
};

export const ConcertSetlistPanel = ({ songs }: ConcertSetlistPanelProps) => {
  return (
    <section>
      <h2 className="text-secondary flex items-center gap-2 font-mono text-xs uppercase">
        <Music2 className="h-3.5 w-3.5" />
        Setlist
      </h2>
      <div className="scrollbar-themed border-border/50 bg-background/45 mt-3 max-h-105 overflow-y-auto rounded-lg border px-3 py-3">
        {songs.length > 0 ? (
          <ol className="text-foreground/85 space-y-2 font-mono text-xs">
            {songs.map((song, index) => (
              <li className="flex gap-2" key={`${song}-${index}`}>
                <span className="text-muted-foreground/60 w-6 shrink-0 text-right">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{song}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-muted-foreground/55 text-xs italic">
            No setlist recorded.
          </p>
        )}
      </div>
    </section>
  );
};
