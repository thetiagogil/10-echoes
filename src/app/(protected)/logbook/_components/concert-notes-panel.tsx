type ConcertNotesPanelProps = {
  notes: string | null;
};

export function ConcertNotesPanel({ notes }: ConcertNotesPanelProps) {
  return (
    <section>
      <h2 className="font-mono text-xs uppercase text-secondary">Notes</h2>
      {notes ? (
        <p className="mt-3 whitespace-pre-line text-base italic leading-8 text-muted-foreground">
          &quot;{notes}&quot;
        </p>
      ) : (
        <p className="mt-3 text-sm italic leading-6 text-muted-foreground">
          No notes recorded.
        </p>
      )}
    </section>
  );
}
