"use client";

import {
  ArrowLeft,
  CalendarDays,
  Edit3,
  Heart,
  MapPin,
  Music2,
  Star,
  Tag,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { ConcertForm } from "@/features/logbook/components/concert-form";
import { LogbookActionFeedback } from "@/features/logbook/components/logbook-action-feedback";
import {
  formatConcertDate,
  formatTagLabel,
  isPastConcert,
  isWishlistConcert,
} from "@/features/logbook/lib/concerts";
import {
  deleteConcertAction,
  updateConcertAction,
} from "@/features/logbook/server/actions";
import type { Concert, ConcertFormInput } from "@/features/logbook/types";
import { AppMain } from "@/shared/components/layout/app-main";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";

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
          <header className="border-b border-dashed border-border/70 p-5 sm:p-7">
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
                <h1 className="font-display text-4xl font-black leading-none sm:text-6xl">
                  {concert.artist}
                </h1>
                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {concert.venue}
                    {concert.city ? ` - ${concert.city}` : ""}
                  </span>
                  <span className="inline-flex items-center gap-2 font-mono text-secondary">
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
                <Button
                  disabled={isPending}
                  onClick={() => setEditing(concert)}
                  variant="outline"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  disabled={isPending}
                  onClick={() => setDeleteOpen(true)}
                  variant="danger"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>

            <div className="mt-6 flex min-h-6 items-center gap-1">
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
          </header>

          <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.65fr)] sm:p-7">
            <section>
              <h2 className="font-mono text-xs uppercase text-secondary">
                Notes
              </h2>
              {concert.notes ? (
                <p className="mt-3 whitespace-pre-line text-base italic leading-8 text-muted-foreground">
                  &quot;{concert.notes}&quot;
                </p>
              ) : (
                <p className="mt-3 text-sm italic leading-6 text-muted-foreground">
                  No notes recorded.
                </p>
              )}
            </section>

            <section>
              <h2 className="flex items-center gap-2 font-mono text-xs uppercase text-secondary">
                <Music2 className="h-3.5 w-3.5" />
                Setlist
              </h2>
              <div className="mt-3 max-h-[420px] overflow-y-auto rounded-lg border border-border/50 bg-background/45 px-3 py-3">
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

            <section className="lg:col-span-2">
              <h2 className="flex items-center gap-2 font-mono text-xs uppercase text-secondary">
                <Tag className="h-3.5 w-3.5" />
                Entry metadata
              </h2>
              <dl className="mt-3 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
                <DetailStat label="Status" value={status} />
                <DetailStat
                  label="Date"
                  value={formatConcertDate(concert.concertDate)}
                />
                <DetailStat
                  label="Tags"
                  value={
                    concert.tags.length > 0
                      ? concert.tags.map(formatTagLabel).join(", ")
                      : "None"
                  }
                />
              </dl>
            </section>
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

      <AlertDialog onOpenChange={setDeleteOpen} open={deleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Show</AlertDialogTitle>
            <AlertDialogDescription>
              Delete {concert.artist} from your logbook? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isPending} onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

type DetailStatProps = {
  label: string;
  value: string;
};

function DetailStat({ label, value }: DetailStatProps) {
  return (
    <div className="bg-card p-4">
      <dt className="mb-1 font-mono text-[10px] uppercase text-muted-foreground">
        {label}
      </dt>
      <dd className="truncate text-sm font-semibold">{value}</dd>
    </div>
  );
}
