"use client";

import { Loader2 } from "lucide-react";

import { RatingInput } from "@/features/concerts/components/rating-input";
import { SetlistBuilder } from "@/features/concerts/components/setlist-builder";
import { TagPicker } from "@/features/concerts/components/tag-picker";
import { WishlistToggle } from "@/features/concerts/components/wishlist-toggle";
import { useConcertForm } from "@/features/concerts/hooks/use-concert-form";
import type { Concert, ConcertFormInput } from "@/features/concerts/types";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Modal } from "@/shared/components/ui/modal";
import { Textarea } from "@/shared/components/ui/textarea";

type ConcertFormProps = {
  availableTags?: string[];
  editing: Concert | null;
  onClose: () => void;
  onSubmit: (input: ConcertFormInput) => void;
  open: boolean;
  pending: boolean;
};

export const ConcertForm = ({
  availableTags = [],
  editing,
  onClose,
  onSubmit,
  open,
  pending,
}: ConcertFormProps) => {
  const form = useConcertForm({ editing, onSubmit });

  return (
    <Modal
      description="Create or edit a private concert journal entry."
      onClose={onClose}
      open={open}
      title={editing ? "Edit show" : "Log a show"}
    >
      <form className="space-y-4" onSubmit={form.submit}>
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
            onChange={(event) => form.setArtist(event.target.value)}
            placeholder="Who's playing?"
            required
            value={form.artist}
          />
        </div>

        <WishlistToggle
          checked={form.isWishlist}
          disabled={pending}
          onChange={form.setIsWishlist}
        />

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
              onChange={(event) => form.setVenue(event.target.value)}
              placeholder="Madison Square Garden"
              required
              value={form.venue}
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
              onChange={(event) => form.setCity(event.target.value)}
              placeholder="New York, NY"
              value={form.city}
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="concertDate" required={!form.isWishlist}>
            Date
          </Label>
          <Input
            disabled={pending}
            id="concertDate"
            inputMode="numeric"
            name="concertDate"
            onChange={(event) => form.setConcertDate(event.target.value)}
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder="2026-06-01"
            required={!form.isWishlist}
            type="text"
            value={form.concertDate}
          />
        </div>

        <TagPicker
          availableTags={availableTags}
          disabled={pending}
          onChange={form.setTags}
          value={form.tags}
        />

        <RatingInput
          disabled={pending}
          onChange={form.setRating}
          value={form.rating}
        />

        <div className="grid gap-1.5">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            disabled={pending}
            id="notes"
            maxLength={3000}
            name="notes"
            onChange={(event) => form.setNotes(event.target.value)}
            placeholder="A moment, a memory, the way the room felt..."
            rows={3}
            value={form.notes}
          />
        </div>

        <SetlistBuilder
          disabled={pending}
          onChange={form.setSetlist}
          value={form.setlist}
        />

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button
            disabled={pending}
            onClick={onClose}
            type="button"
            variant="ghost"
          >
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
};
