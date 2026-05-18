"use client";

import { Heart, Loader2, Star, Tag } from "lucide-react";
import { FormEvent, useState } from "react";

import type { Concert, ConcertFormInput } from "@/features/logbook/types";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Modal } from "@/shared/components/ui/modal";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/utils/cn";

type ConcertFormProps = {
  editing: Concert | null;
  onClose: () => void;
  onSubmit: (input: ConcertFormInput) => void;
  open: boolean;
  pending: boolean;
};

export function ConcertForm({
  editing,
  onClose,
  onSubmit,
  open,
  pending,
}: ConcertFormProps) {
  const [artist, setArtist] = useState(editing?.artist ?? "");
  const [venue, setVenue] = useState(editing?.venue ?? "");
  const [city, setCity] = useState(editing?.city ?? "");
  const [concertDate, setConcertDate] = useState(editing?.concertDate ?? "");
  const [rating, setRating] = useState(editing?.rating ?? 0);
  const [notes, setNotes] = useState(editing?.notes ?? "");
  const [setlist, setSetlist] = useState(editing?.setlist ?? "");
  const [tagsText, setTagsText] = useState(editing?.tags.join(", ") ?? "");
  const [isWishlist, setIsWishlist] = useState(editing?.isWishlist ?? false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const readField = (name: string) => formData.get(name)?.toString() ?? "";

    onSubmit({
      artist: readField("artist"),
      venue: readField("venue"),
      city: readField("city"),
      concertDate: readField("concertDate") || null,
      rating: rating || null,
      notes: readField("notes"),
      setlist: readField("setlist"),
      tags: readField("tags"),
      isWishlist,
    });
  };

  return (
    <Modal
      description="Create or edit a private concert journal entry."
      onClose={onClose}
      open={open}
      title={editing ? "Edit show" : "Log a show"}
    >
      <form className="space-y-4" onSubmit={submit}>
        <div className="grid gap-1.5">
          <Label htmlFor="artist" required>
            Artist
          </Label>
          <Input
            autoComplete="off"
            disabled={pending}
            id="artist"
            maxLength={160}
            name="artist"
            onChange={(event) => setArtist(event.target.value)}
            placeholder="Who's playing?"
            required
            value={artist}
          />
        </div>

        <label className="flex items-start gap-3 rounded-lg border border-border bg-background/35 p-3 text-sm">
          <input
            checked={isWishlist}
            className="mt-1 h-4 w-4 accent-primary"
            disabled={pending}
            onChange={(event) => setIsWishlist(event.target.checked)}
            type="checkbox"
          />
          <span>
            <span className="flex items-center gap-2 font-semibold">
              <Heart className="h-4 w-4 text-primary" />
              Bucket-list show
            </span>
            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
              Save this without a date when the show is still a wish.
            </span>
          </span>
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="venue" required>
              Venue
            </Label>
            <Input
              autoComplete="off"
              disabled={pending}
              id="venue"
              maxLength={160}
              name="venue"
              onChange={(event) => setVenue(event.target.value)}
              placeholder="Madison Square Garden"
              required
              value={venue}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="city">City</Label>
            <Input
              autoComplete="off"
              disabled={pending}
              id="city"
              maxLength={120}
              name="city"
              onChange={(event) => setCity(event.target.value)}
              placeholder="New York, NY"
              value={city}
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="concertDate" required={!isWishlist}>
            Date
          </Label>
          <Input
            disabled={pending}
            id="concertDate"
            inputMode="numeric"
            name="concertDate"
            onChange={(event) => setConcertDate(event.target.value)}
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder="2026-06-01"
            required={!isWishlist}
            type="text"
            value={concertDate}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="tags">Tags</Label>
          <div className="relative">
            <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoComplete="off"
              className="pl-9"
              disabled={pending}
              id="tags"
              maxLength={520}
              name="tags"
              onChange={(event) => setTagsText(event.target.value)}
              placeholder="festival, favorite, late-night"
              value={tagsText}
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label>Rating</Label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                aria-label={`Set rating to ${value}`}
                className="rounded p-1 transition hover:bg-secondary/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                disabled={pending}
                key={value}
                onClick={() => setRating(value === rating ? 0 : value)}
                type="button"
              >
                <Star
                  className={cn(
                    "h-6 w-6",
                    value <= rating
                      ? "fill-secondary text-secondary"
                      : "text-muted-foreground/40",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            disabled={pending}
            id="notes"
            maxLength={3000}
            name="notes"
            onChange={(event) => setNotes(event.target.value)}
            placeholder="A moment, a memory, the way the room felt..."
            rows={3}
            value={notes}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="setlist">Setlist</Label>
          <Textarea
            className="font-mono text-xs"
            disabled={pending}
            id="setlist"
            maxLength={5000}
            name="setlist"
            onChange={(event) => setSetlist(event.target.value)}
            placeholder={"Opening track\nSecond song\nEncore..."}
            rows={5}
            value={setlist}
          />
        </div>

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button disabled={pending} onClick={onClose} type="button" variant="ghost">
            Cancel
          </Button>
          <Button disabled={pending} type="submit">
            {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {editing ? "Save changes" : "Save entry"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
