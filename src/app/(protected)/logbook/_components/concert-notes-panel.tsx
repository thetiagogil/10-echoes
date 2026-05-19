type ConcertNotesPanelProps = {
  notes: string | null;
};

export function ConcertNotesPanel({ notes }: ConcertNotesPanelProps) {
  return (
    <section>
      <h2 className="text-secondary font-mono text-xs uppercase">Notes</h2>
      {notes ? (
        <p className="text-muted-foreground mt-3 text-base leading-8 whitespace-pre-line italic">
          &quot;{notes}&quot;
        </p>
      ) : (
        <p className="text-muted-foreground mt-3 text-sm leading-6 italic">
          No notes recorded.
        </p>
      )}
    </section>
  );
}
