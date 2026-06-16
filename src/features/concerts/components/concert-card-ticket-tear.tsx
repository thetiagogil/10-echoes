export function ConcertCardTicketTear() {
  return (
    <div className="pointer-events-none absolute top-23 right-0 left-0 hidden justify-between px-2 sm:flex">
      <span className="bg-background/80 ring-border/50 h-2.5 w-2.5 -translate-x-1/2 rounded-full ring-1" />
      <span className="bg-background/80 ring-border/50 h-2.5 w-2.5 translate-x-1/2 rounded-full ring-1" />
    </div>
  );
}
