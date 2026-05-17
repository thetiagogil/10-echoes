"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  CalendarDays,
  Edit3,
  MapPin,
  Music2,
  Star,
  Trash2,
  X,
} from "lucide-react";

import {
  formatConcertDate,
  isPastConcert,
} from "@/features/logbook/lib/concerts";
import type { Concert } from "@/features/logbook/types";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";

type ConcertDetailDialogProps = {
  concert: Concert | null;
  disabled?: boolean;
  onClose: () => void;
  onDelete: (concert: Concert) => void;
  onEdit: (concert: Concert) => void;
  open: boolean;
};

export function ConcertDetailDialog({
  concert,
  disabled = false,
  onClose,
  onDelete,
  onEdit,
  open,
}: ConcertDetailDialogProps) {
  const past = concert ? isPastConcert(concert.concertDate) : false;
  const songs = concert?.setlist
    ? concert.setlist
        .split("\n")
        .map((song) => song.trim())
        .filter(Boolean)
    : [];

  return (
    <DialogPrimitive.Root
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
      open={open}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto focus-visible:outline-none">
          {concert ? (
            <Card className="grain overflow-hidden p-0" gradient tone="primary">
              <div className="relative">
                <div className="border-b border-dashed border-border/70 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <DialogPrimitive.Title className="font-display text-4xl font-black leading-tight sm:text-5xl">
                        {concert.artist}
                      </DialogPrimitive.Title>
                      <DialogPrimitive.Description className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          {concert.venue}
                          {concert.city ? ` - ${concert.city}` : ""}
                        </span>
                        <span className="inline-flex items-center gap-2 font-mono text-secondary">
                          <CalendarDays className="h-4 w-4" />
                          {formatConcertDate(concert.concertDate)}
                        </span>
                      </DialogPrimitive.Description>
                    </div>

                    <div className="flex shrink-0 items-start gap-2">
                      <Badge variant={past ? "accent" : "primary"}>
                        {past ? "Stub" : "Plan"}
                      </Badge>
                      <DialogPrimitive.Close asChild>
                        <Button aria-label="Close" size="icon" variant="ghost">
                          <X className="h-4 w-4" />
                        </Button>
                      </DialogPrimitive.Close>
                    </div>
                  </div>

                  <div className="mt-5 flex min-h-5 items-center gap-1">
                    {concert.rating ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          className={
                            index < concert.rating!
                              ? "h-5 w-5 fill-secondary text-secondary"
                              : "h-5 w-5 text-muted-foreground/30"
                          }
                          key={index}
                        />
                      ))
                    ) : (
                      <span className="text-sm italic text-muted-foreground">
                        No rating recorded.
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(220px,0.75fr)] sm:p-6">
                  <section>
                    <h3 className="font-mono text-xs uppercase text-secondary">
                      Notes
                    </h3>
                    {concert.notes ? (
                      <p className="mt-3 whitespace-pre-line text-sm italic leading-7 text-muted-foreground">
                        &quot;{concert.notes}&quot;
                      </p>
                    ) : (
                      <p className="mt-3 text-sm italic leading-6 text-muted-foreground">
                        No notes recorded.
                      </p>
                    )}
                  </section>

                  <section>
                    <h3 className="flex items-center gap-2 font-mono text-xs uppercase text-secondary">
                      <Music2 className="h-3.5 w-3.5" />
                      Setlist
                    </h3>
                    <div className="mt-3 max-h-72 overflow-y-auto rounded-md border border-border/50 bg-background/45 px-3 py-3">
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
                </div>

                <div className="flex flex-col-reverse gap-2 border-t border-border/70 p-5 sm:flex-row sm:justify-end sm:p-6">
                  <Button
                    disabled={disabled}
                    onClick={() => onDelete(concert)}
                    variant="danger"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                  <Button
                    disabled={disabled}
                    onClick={() => onEdit(concert)}
                    variant="outline"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit entry
                  </Button>
                </div>
              </div>
            </Card>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
