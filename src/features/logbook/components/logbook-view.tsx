"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { ConcertDetailDialog } from "@/features/logbook/components/concert-detail-dialog";
import { ConcertCard } from "@/features/logbook/components/concert-card";
import { ConcertForm } from "@/features/logbook/components/concert-form";
import { LogbookEmptyState } from "@/features/logbook/components/logbook-empty-state";
import { LogbookActionFeedback } from "@/features/logbook/components/logbook-action-feedback";
import { LogbookControls } from "@/features/logbook/components/logbook-controls";
import { PageIntro } from "@/features/logbook/components/page-intro";
import { getFilteredConcerts } from "@/features/logbook/lib/view-model";
import {
  createConcertAction,
  deleteConcertAction,
  updateConcertAction,
} from "@/features/logbook/server/actions";
import type {
  Concert,
  ConcertFilter,
  ConcertFormInput,
} from "@/features/logbook/types";
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
import { Button } from "@/shared/components/ui/button";

type LogbookViewProps = {
  initialConcerts: Concert[];
};

export function LogbookView({ initialConcerts }: LogbookViewProps) {
  const router = useRouter();
  const [concerts, setConcerts] = useState(initialConcerts);
  const [activeFilter, setActiveFilter] = useState<ConcertFilter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Concert | null>(null);
  const [detailConcert, setDetailConcert] = useState<Concert | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Concert | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [pendingConcertId, setPendingConcertId] = useState<number | null>(null);
  const [isConcertPending, startConcertTransition] = useTransition();

  const visibleConcerts = useMemo(
    () => getFilteredConcerts(concerts, activeFilter),
    [activeFilter, concerts],
  );
  const entryLabel = `${concerts.length} ${
    concerts.length === 1 ? "entry" : "entries"
  } - and counting.`;

  const openCreateForm = () => {
    setFeedback(null);
    setEditing(null);
    setFormOpen(true);
  };

  const openEditForm = (concert: Concert) => {
    setFeedback(null);
    setDetailConcert(null);
    setEditing(concert);
    setFormOpen(true);
  };

  const closeForm = () => {
    if (isConcertPending) return;

    setFormOpen(false);
    setEditing(null);
  };

  const submitConcert = (input: ConcertFormInput) => {
    setFeedback(null);

    startConcertTransition(async () => {
      const result = editing
        ? await updateConcertAction(editing.id, input)
        : await createConcertAction(input);

      if (!result.ok) {
        setFeedback(result.error);
        return;
      }

      setConcerts((current) =>
        editing
          ? current.map((concert) =>
              concert.id === result.data.id ? result.data : concert,
            )
          : [result.data, ...current],
      );
      setFormOpen(false);
      setEditing(null);
      router.refresh();
    });
  };

  const requestDeleteConcert = (concert: Concert) => {
    setFeedback(null);
    setDetailConcert(null);
    setDeleteCandidate(concert);
  };

  const confirmDeleteConcert = () => {
    if (!deleteCandidate) return;

    const concert = deleteCandidate;
    setDeleteCandidate(null);
    setPendingConcertId(concert.id);

    startConcertTransition(async () => {
      const result = await deleteConcertAction(concert.id);
      setPendingConcertId(null);

      if (!result.ok) {
        setFeedback(result.error);
        return;
      }

      setConcerts((current) =>
        current.filter((item) => item.id !== result.data.id),
      );
      router.refresh();
    });
  };

  return (
    <>
      <AppMain className="pb-12">
        <PageIntro
          actions={
            <Button onClick={openCreateForm} size="lg">
              <Plus className="h-4 w-4" />
              Log a show
            </Button>
          }
          description={entryLabel}
          eyebrow="The Logbook"
          title={
            <>
              Your <span className="text-gradient-stage">shows</span>.
            </>
          }
        />

        <LogbookActionFeedback message={feedback} />
        <LogbookControls
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {visibleConcerts.length > 0 ? (
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleConcerts.map((concert) => (
              <ConcertCard
                concert={concert}
                disabled={isConcertPending && pendingConcertId === concert.id}
                key={concert.id}
                onDelete={requestDeleteConcert}
                onEdit={openEditForm}
                onView={setDetailConcert}
              />
            ))}
          </section>
        ) : (
          <LogbookEmptyState
            filter={activeFilter}
            onCreate={openCreateForm}
          />
        )}
      </AppMain>

      <ConcertDetailDialog
        concert={detailConcert}
        disabled={isConcertPending}
        onClose={() => setDetailConcert(null)}
        onDelete={requestDeleteConcert}
        onEdit={openEditForm}
        open={Boolean(detailConcert)}
      />

      <ConcertForm
        editing={editing}
        key={`${formOpen ? "open" : "closed"}-${editing?.id ?? "new"}`}
        onClose={closeForm}
        onSubmit={submitConcert}
        open={formOpen}
        pending={isConcertPending}
      />

      <AlertDialog
        onOpenChange={(open) => {
          if (!open) {
            setDeleteCandidate(null);
          }
        }}
        open={Boolean(deleteCandidate)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Show</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteCandidate
                ? `Delete ${deleteCandidate.artist} from your logbook? This cannot be undone.`
                : "Delete this show from your logbook? This cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isConcertPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isConcertPending}
              onClick={confirmDeleteConcert}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
