"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { ConcertForm } from "@/features/concerts/components/concert-form";
import {
  isPastConcert,
  isWishlistConcert,
} from "@/features/concerts/lib/concerts";
import {
  deleteConcertAction,
  updateConcertAction,
} from "@/features/concerts/server/actions";
import type { Concert, ConcertFormInput } from "@/features/concerts/types";
import { AppMain } from "@/shared/components/layout/app-main";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { ConcertDetailHeader } from "./concert-detail-header";
import { ConcertMetadataPanel } from "./concert-metadata-panel";
import { ConcertNotesPanel } from "./concert-notes-panel";
import { ConcertSetlistPanel } from "./concert-setlist-panel";
import { DeleteConcertDialog } from "./delete-concert-dialog";
import { LogbookActionFeedback } from "./logbook-action-feedback";

type ConcertDetailViewProps = {
  initialConcert: Concert;
};

export function ConcertDetailView({
  initialConcert,
}: ConcertDetailViewProps) {
  const router = useRouter();
  const [concert, setConcert] = useState(initialConcert);
  const [editing, setEditing] = useState<Concert | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const wishlist = isWishlistConcert(concert);
  const past = !wishlist && isPastConcert(concert.concertDate);
  const status = wishlist ? "Wishlist" : past ? "Attended" : "Upcoming";
  const songs = concert.setlist
    ? concert.setlist
        .split("\n")
        .map((song) => song.trim())
        .filter(Boolean)
    : [];

  const submitUpdate = (input: ConcertFormInput) => {
    setFeedback(null);

    startTransition(async () => {
      const result = await updateConcertAction(concert.id, input);

      if (!result.ok) {
        setFeedback(result.error);
        return;
      }

      setConcert(result.data);
      setEditing(null);
      router.refresh();
    });
  };

  const confirmDelete = () => {
    setFeedback(null);

    startTransition(async () => {
      const result = await deleteConcertAction(concert.id);

      if (!result.ok) {
        setFeedback(result.error);
        return;
      }

      setDeleteOpen(false);
      router.replace("/logbook");
      router.refresh();
    });
  };

  return (
    <>
      <AppMain className="pb-12">
        <div className="mb-6">
          <ButtonLink href="/logbook" variant="ghost">
            <ArrowLeft className="h-4 w-4" />
            Back to logbook
          </ButtonLink>
        </div>

        <LogbookActionFeedback message={feedback} />

        <article className="grain overflow-hidden rounded-xl border border-border bg-card shadow-card">
          <ConcertDetailHeader
            concert={concert}
            disabled={isPending}
            onDelete={() => setDeleteOpen(true)}
            onEdit={() => setEditing(concert)}
            past={past}
            status={status}
            wishlist={wishlist}
          />

          <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.65fr)] sm:p-7">
            <ConcertNotesPanel notes={concert.notes} />
            <ConcertSetlistPanel songs={songs} />
            <ConcertMetadataPanel concert={concert} status={status} />
          </div>
        </article>
      </AppMain>

      <ConcertForm
        editing={editing}
        key={editing?.id ?? "closed"}
        onClose={() => {
          if (!isPending) {
            setEditing(null);
          }
        }}
        onSubmit={submitUpdate}
        open={Boolean(editing)}
        pending={isPending}
      />

      <DeleteConcertDialog
        artist={concert.artist}
        onConfirm={confirmDelete}
        onOpenChange={setDeleteOpen}
        open={deleteOpen}
        pending={isPending}
      />
    </>
  );
}
