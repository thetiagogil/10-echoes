"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { ConcertCard } from "@/features/concerts/components/concert-card";
import { ConcertForm } from "@/features/concerts/components/concert-form";
import { formatTagLabel } from "@/features/concerts/lib/concerts";
import {
  getAvailableTags,
  getAvailableYears,
  getFilteredConcerts,
} from "@/features/concerts/lib/view-model";
import {
  createConcertAction,
  deleteConcertAction,
  updateConcertAction,
} from "@/features/concerts/server/actions";
import type {
  Concert,
  ConcertFilter,
  ConcertFormInput,
} from "@/features/concerts/types";
import { PageIntro } from "../../_components/page-intro";
import { DeleteConcertDialog } from "./delete-concert-dialog";
import { LogbookActionFeedback } from "./logbook-action-feedback";
import { LogbookControls } from "./logbook-controls";
import { LogbookEmptyState } from "./logbook-empty-state";
import { AppMain } from "@/shared/components/layout/app-main";
import { Button } from "@/shared/components/ui/button";

type LogbookViewProps = {
  initialConcerts: Concert[];
};

export function LogbookView({ initialConcerts }: LogbookViewProps) {
  const router = useRouter();
  const [concerts, setConcerts] = useState(initialConcerts);
  const [activeFilter, setActiveFilter] = useState<ConcertFilter>("all");
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [tag, setTag] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Concert | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Concert | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [pendingConcertId, setPendingConcertId] = useState<number | null>(null);
  const [isConcertPending, startConcertTransition] = useTransition();

  const visibleConcerts = useMemo(
    () =>
      getFilteredConcerts(concerts, {
        status: activeFilter,
        query,
        year,
        tag,
      }),
    [activeFilter, concerts, query, tag, year],
  );
  const yearOptions = useMemo(
    () =>
      getAvailableYears(concerts).map((availableYear) => ({
        label: availableYear,
        value: availableYear,
      })),
    [concerts],
  );
  const tagOptions = useMemo(
    () =>
      getAvailableTags(concerts).map((availableTag) => ({
        label: formatTagLabel(availableTag),
        value: availableTag,
      })),
    [concerts],
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
          onQueryChange={setQuery}
          onTagChange={setTag}
          onYearChange={setYear}
          query={query}
          tag={tag}
          tagOptions={tagOptions}
          year={year}
          yearOptions={yearOptions}
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

      <ConcertForm
        editing={editing}
        key={`${formOpen ? "open" : "closed"}-${editing?.id ?? "new"}`}
        onClose={closeForm}
        onSubmit={submitConcert}
        open={formOpen}
        pending={isConcertPending}
      />

      <DeleteConcertDialog
        artist={deleteCandidate?.artist}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteCandidate(null);
          }
        }}
        open={Boolean(deleteCandidate)}
        onConfirm={confirmDeleteConcert}
        pending={isConcertPending}
      />
    </>
  );
}
