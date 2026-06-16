"use client";

import { Plus } from "lucide-react";

import { ConcertCard } from "@/features/concerts/components/concert-card";
import { ConcertForm } from "@/features/concerts/components/concert-form";
import type { Concert } from "@/features/concerts/types";
import { PageIntro } from "../../_components/page-intro";
import { useConcertMutations } from "../_hooks/use-concert-mutations";
import { useLogbookFilters } from "../_hooks/use-logbook-filters";
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
  const {
    closeDeleteDialog,
    closeForm,
    concerts,
    confirmDeleteConcert,
    deleteCandidate,
    editing,
    feedback,
    formOpen,
    isConcertPending,
    openCreateForm,
    openEditForm,
    pendingConcertId,
    requestDeleteConcert,
    submitConcert,
  } = useConcertMutations(initialConcerts);
  const {
    activeFilter,
    availableTags,
    hasActiveFilters,
    query,
    resetFilters,
    setActiveFilter,
    setQuery,
    setTag,
    setYear,
    tag,
    tagOptions,
    visibleConcerts,
    year,
    yearOptions,
  } = useLogbookFilters(concerts);
  const entryLabel = `${concerts.length} ${
    concerts.length === 1 ? "entry" : "entries"
  } - and counting.`;

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
          title={
            <>
              Your <span className="text-gradient-stage">shows</span>.
            </>
          }
        />

        <LogbookActionFeedback message={feedback} />
        <LogbookControls
          activeFilter={activeFilter}
          hasConcerts={concerts.length > 0}
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
            hasActiveFilters={hasActiveFilters}
            onCreate={openCreateForm}
            onResetFilters={resetFilters}
          />
        )}
      </AppMain>

      <ConcertForm
        availableTags={availableTags}
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
            closeDeleteDialog();
          }
        }}
        open={Boolean(deleteCandidate)}
        onConfirm={confirmDeleteConcert}
        pending={isConcertPending}
      />
    </>
  );
}
