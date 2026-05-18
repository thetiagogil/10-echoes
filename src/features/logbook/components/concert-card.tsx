import {
  CalendarDays,
  Edit3,
  Eye,
  Heart,
  MapPin,
  Music2,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import {
  formatTagLabel,
  formatConcertDate,
  isPastConcert,
  isWishlistConcert,
} from "@/features/logbook/lib/concerts";
import type { Concert } from "@/features/logbook/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { cn } from "@/shared/utils/cn";

type ConcertCardProps = {
  concert: Concert;
  disabled?: boolean;
  onDelete: (concert: Concert) => void;
  onEdit: (concert: Concert) => void;
};

export function ConcertCard({
  concert,
  disabled = false,
  onDelete,
  onEdit,
}: ConcertCardProps) {
  const wishlist = isWishlistConcert(concert);
  const past = !wishlist && isPastConcert(concert.concertDate);
  const status = wishlist ? "Wishlist" : past ? "Attended" : "Upcoming";
  const songs = concert.setlist
    ? concert.setlist
        .split("\n")
        .map((song) => song.trim())
        .filter(Boolean)
    : [];

  return (
    <article className="group relative h-full">
      <div className="absolute -inset-px rounded-lg bg-gradient-stage opacity-0 blur-xl transition-opacity group-hover:opacity-40" />
      <div className="grain relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <div className="absolute left-0 right-0 top-[92px] flex justify-between px-2 pointer-events-none">
          <span className="h-3 w-3 -translate-x-1/2 rounded-full bg-background" />
          <span className="h-3 w-3 translate-x-1/2 rounded-full bg-background" />
        </div>

        <header className="flex min-h-[92px] items-start justify-between gap-4 border-b border-dashed border-border/70 p-5">
          <div className="min-w-0">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {status}
            </p>
            <Link
              className="block truncate font-display text-2xl font-bold leading-tight transition-colors hover:text-primary"
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
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">
              {concert.venue}
              {concert.city ? ` - ${concert.city}` : ""}
            </span>
          </p>
          <p className="flex items-center gap-2 font-mono text-xs text-secondary">
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
                        ? "h-4 w-4 fill-secondary text-secondary"
                        : "h-4 w-4 text-muted-foreground/30"
                    }
                    key={index}
                  />
                ))
              : null}
          </div>

          <div className="min-h-[64px]">
            {concert.notes ? (
              <p className="line-clamp-3 text-sm italic leading-6 text-muted-foreground">
                &quot;{concert.notes}&quot;
              </p>
            ) : (
              <p className="text-sm italic text-muted-foreground/60">
                No notes recorded.
              </p>
            )}
          </div>

          <div className="mt-auto">
            <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <Music2 className="h-3 w-3" />
              Setlist
            </p>
            <div className="h-[118px] overflow-y-auto rounded-md border border-border/50 bg-background/45 px-3 py-2">
              {songs.length > 0 ? (
                <ol className="space-y-1 font-mono text-xs text-foreground/80">
                  {songs.slice(0, 12).map((song, index) => (
                    <li className="flex gap-2" key={`${song}-${index}`}>
                      <span className="w-5 shrink-0 text-right text-muted-foreground/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate">{song}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-xs italic text-muted-foreground/55">
                  No setlist recorded.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <ButtonLink
              aria-label={`View ${concert.artist}`}
              className={cn(
                "min-w-0 flex-1",
                disabled && "pointer-events-none opacity-60",
              )}
              href={`/logbook/${concert.id}`}
              size="sm"
              variant="outline"
            >
              <Eye className="h-4 w-4" />
              View entry
            </ButtonLink>
            <div className="flex shrink-0 gap-1">
              <Button
                aria-label={`Edit ${concert.artist}`}
                disabled={disabled}
                onClick={() => onEdit(concert)}
                size="icon"
                variant="ghost"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button
                aria-label={`Delete ${concert.artist}`}
                disabled={disabled}
                onClick={() => onDelete(concert)}
                size="icon"
                variant="ghost"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
