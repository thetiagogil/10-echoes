import { CalendarDays, Edit3, Heart, MapPin, Star, Trash2 } from "lucide-react";

import {
  formatConcertDate,
  formatTagLabel,
} from "@/features/concerts/lib/concerts";
import type { Concert } from "@/features/concerts/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

type ConcertDetailHeaderProps = {
  concert: Concert;
  disabled: boolean;
  onDelete: () => void;
  onEdit: () => void;
  past: boolean;
  status: string;
  wishlist: boolean;
};

export const ConcertDetailHeader = ({
  concert,
  disabled,
  onDelete,
  onEdit,
  past,
  status,
  wishlist,
}: ConcertDetailHeaderProps) => {
  const rating = concert.rating ?? 0;

  return (
    <header className="border-border/70 border-b border-dashed p-5 sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant={wishlist ? "surface" : past ? "accent" : "primary"}>
              {status}
            </Badge>
            {concert.tags.map((tag) => (
              <Badge key={tag} variant="surface">
                {formatTagLabel(tag)}
              </Badge>
            ))}
          </div>
          <h1 className="font-display text-4xl leading-none font-black sm:text-6xl">
            {concert.artist}
          </h1>
          <p className="text-muted-foreground mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-2">
              <MapPin className="text-primary h-4 w-4" />
              {concert.venue}
              {concert.city ? ` - ${concert.city}` : ""}
            </span>
            <span className="text-secondary inline-flex items-center gap-2 font-mono">
              {wishlist ? (
                <Heart className="h-4 w-4" />
              ) : (
                <CalendarDays className="h-4 w-4" />
              )}
              {formatConcertDate(concert.concertDate)}
            </span>
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button disabled={disabled} onClick={onEdit} variant="outline">
            <Edit3 className="h-4 w-4" />
            Edit
          </Button>
          <Button disabled={disabled} onClick={onDelete} variant="danger">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="mt-6 flex min-h-6 items-center gap-1">
        {rating > 0 ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Star
              className={
                index < rating
                  ? "fill-secondary text-secondary h-5 w-5"
                  : "text-muted-foreground/30 h-5 w-5"
              }
              key={index}
            />
          ))
        ) : (
          <span className="text-muted-foreground text-sm italic">
            No rating recorded.
          </span>
        )}
      </div>
    </header>
  );
};
