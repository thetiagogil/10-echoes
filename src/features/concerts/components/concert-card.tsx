"use client";

import { useState } from "react";

import { ConcertCardBack } from "@/features/concerts/components/concert-card-back";
import { ConcertCardFront } from "@/features/concerts/components/concert-card-front";
import {
  isPastConcert,
  isWishlistConcert,
} from "@/features/concerts/lib/concerts";
import type { Concert } from "@/features/concerts/types";
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
  const [flipped, setFlipped] = useState(false);
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
    <article className="group relative min-h-107.5 perspective-distant">
      <div className="bg-gradient-stage absolute -inset-px rounded-lg opacity-0 blur-xl transition-opacity group-hover:opacity-40" />
      <div
        className={cn(
          "relative h-full min-h-107.5 transform-3d transition-transform duration-500",
          flipped && "transform-[rotateY(180deg)]",
        )}
      >
        <ConcertCardFront
          concert={concert}
          disabled={disabled}
          onDelete={() => onDelete(concert)}
          onEdit={() => onEdit(concert)}
          onFlip={() => setFlipped(true)}
          past={past}
          status={status}
          wishlist={wishlist}
        />
        <ConcertCardBack
          concert={concert}
          disabled={disabled}
          onFlipBack={() => setFlipped(false)}
          songs={songs}
        />
      </div>
    </article>
  );
}
