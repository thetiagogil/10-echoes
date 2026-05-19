import { CalendarDays, Heart, MapPin, Star } from "lucide-react";
import Link from "next/link";

import { ConcertCardActions } from "@/features/concerts/components/concert-card-actions";
import { ConcertCardTicketTear } from "@/features/concerts/components/concert-card-ticket-tear";
import {
  formatConcertDate,
  formatTagLabel,
} from "@/features/concerts/lib/concerts";
import type { Concert } from "@/features/concerts/types";
import { Badge } from "@/shared/components/ui/badge";

type ConcertCardFrontProps = {
  concert: Concert;
  disabled: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onFlip: () => void;
  past: boolean;
  status: string;
  wishlist: boolean;
};

export function ConcertCardFront({
  concert,
  disabled,
  onDelete,
  onEdit,
  onFlip,
  past,
  status,
  wishlist,
}: ConcertCardFrontProps) {
  return (
    <div className="grain border-border bg-card shadow-card absolute inset-0 flex flex-col overflow-hidden rounded-lg border [backface-visibility:hidden]">
      <ConcertCardTicketTear />

      <header className="border-border/70 flex min-h-[92px] items-start justify-between gap-4 border-b border-dashed p-5">
        <div className="min-w-0">
          <p className="text-muted-foreground mb-1 font-mono text-[10px] tracking-[0.18em] uppercase">
            {status}
          </p>
          <Link
            className="font-display hover:text-primary block truncate text-2xl leading-tight font-bold transition-colors"
            href={`/logbook/${concert.id}`}
          >
            {concert.artist}
          </Link>
        </div>
        <Badge variant={wishlist ? "surface" : past ? "accent" : "primary"}>
          {wishlist ? "Wish" : past ? "Stub" : "Plan"}
        </Badge>
      </header>

      <div className="relative flex flex-1 flex-col gap-3 p-5 pt-6">
        <p className="flex items-center gap-2 text-sm">
          <MapPin className="text-primary h-4 w-4 shrink-0" />
          <span className="truncate">
            {concert.venue}
            {concert.city ? ` - ${concert.city}` : ""}
          </span>
        </p>
        <p className="text-muted-foreground flex items-center gap-2 font-mono text-xs">
          {wishlist ? (
            <Heart className="h-4 w-4 shrink-0" />
          ) : (
            <CalendarDays className="h-4 w-4 shrink-0" />
          )}
          {formatConcertDate(concert.concertDate)}
        </p>

        {concert.tags.length > 0 ? (
          <div className="flex min-h-6 flex-wrap gap-1">
            {concert.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="surface">
                {formatTagLabel(tag)}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="flex h-5 items-center gap-0.5">
          {concert.rating
            ? Array.from({ length: 5 }).map((_, index) => (
                <Star
                  className={
                    index < concert.rating!
                      ? "fill-secondary text-secondary h-4 w-4"
                      : "text-muted-foreground/30 h-4 w-4"
                  }
                  key={index}
                />
              ))
            : null}
        </div>

        <div className="min-h-[118px]">
          {concert.notes ? (
            <p className="text-muted-foreground line-clamp-3 text-sm leading-6 italic">
              &quot;{concert.notes}&quot;
            </p>
          ) : (
            <p className="text-muted-foreground/60 text-sm italic">
              No notes recorded.
            </p>
          )}
        </div>

        <ConcertCardActions
          artist={concert.artist}
          disabled={disabled}
          href={`/logbook/${concert.id}`}
          onDelete={onDelete}
          onEdit={onEdit}
          onFlip={onFlip}
        />
      </div>
    </div>
  );
}
