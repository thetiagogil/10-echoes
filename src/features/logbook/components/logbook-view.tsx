"use client";

import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";

import { ConcertCard } from "@/features/logbook/components/concert-card";
import { ConcertForm } from "@/features/logbook/components/concert-form";
import { LogbookActionFeedback } from "@/features/logbook/components/logbook-action-feedback";
import { LogbookControls } from "@/features/logbook/components/logbook-controls";
import { LogbookSummary } from "@/features/logbook/components/logbook-summary";
import { StatsView } from "@/features/logbook/components/stats-view";
import { TimelineView } from "@/features/logbook/components/timeline-view";
import {
  getConcertStats,
  getFilteredConcerts,
  getLogbookProfileName,
  getNextConcert,
  getTimelineGroups,
} from "@/features/logbook/lib/view-model";
import {
  createConcertAction,
  deleteConcertAction,
  updateConcertAction,
} from "@/features/logbook/server/actions";
import type {
  Concert,
  ConcertFilter,
  ConcertFormInput,
  LogbookViewMode,
} from "@/features/logbook/types";
import { AppHeader } from "@/shared/components/layout/app-header";
import { AppLogo } from "@/shared/components/layout/app-logo";
import { AppMain } from "@/shared/components/layout/app-main";
import { AppShell } from "@/shared/components/layout/app-shell";
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
import { signOutAction } from "@/shared/server/auth-actions";
import type { CurrentUser } from "@/shared/types";

type LogbookViewProps = {
  currentUser: CurrentUser;
  initialConcerts: Concert[];
};

export function LogbookView({
  currentUser,
  initialConcerts,
}: LogbookViewProps) {
  const router = useRouter();
  const [concerts, setConcerts] = useState(initialConcerts);
  const [activeView, setActiveView] = useState<LogbookViewMode>("logbook");
  const [activeFilter, setActiveFilter] = useState<ConcertFilter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Concert | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Concert | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [pendingConcertId, setPendingConcertId] = useState<number | null>(null);
  const [isConcertPending, startConcertTransition] = useTransition();
  const [isAuthPending, startAuthTransition] = useTransition();

  const profileName = getLogbookProfileName(currentUser);
  const visibleConcerts = useMemo(
    () => getFilteredConcerts(concerts, activeFilter),
    [activeFilter, concerts],
  );
  const stats = useMemo(() => getConcertStats(concerts), [concerts]);
  const timelineGroups = useMemo(
    () => getTimelineGroups(visibleConcerts),
    [visibleConcerts],
  );
  const nextConcert = useMemo(() => getNextConcert(concerts), [concerts]);

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

  const signOut = () => {
    startAuthTransition(async () => {
      const result = await signOutAction();

      if (!result.ok) {
        setFeedback(result.error);
        return;
      }

      router.replace("/");
      router.refresh();
    });
  };

  return (
    <AppShell>
      <AppHeader
        leading={<AppLogo href="/" />}
        actions={
          <Button
            aria-label="Sign out"
            className="w-10 px-0 sm:w-auto sm:px-5"
            disabled={isAuthPending}
            onClick={signOut}
            size="lg"
            variant="outline"
          >
            {isAuthPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        }
      />

      <AppMain className="pb-10">
        <LogbookSummary
          nextConcert={nextConcert}
          profileName={profileName}
          stats={stats}
        />
        <LogbookActionFeedback message={feedback} />
        <LogbookControls
          activeFilter={activeFilter}
          activeView={activeView}
          onCreate={openCreateForm}
          onFilterChange={setActiveFilter}
          onViewChange={setActiveView}
        />

        {activeView === "logbook" ? (
          visibleConcerts.length > 0 ? (
            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleConcerts.map((concert) => (
                <ConcertCard
                  concert={concert}
                  disabled={
                    isConcertPending && pendingConcertId === concert.id
                  }
                  key={concert.id}
                  onDelete={requestDeleteConcert}
                  onEdit={openEditForm}
                />
              ))}
            </section>
          ) : (
            <EmptyLogbook onCreate={openCreateForm} />
          )
        ) : null}

        {activeView === "timeline" ? (
          <TimelineView groups={timelineGroups} />
        ) : null}

        {activeView === "stats" ? <StatsView stats={stats} /> : null}
      </AppMain>

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
    </AppShell>
  );
}

type EmptyLogbookProps = {
  onCreate: () => void;
};

function EmptyLogbook({ onCreate }: EmptyLogbookProps) {
  return (
    <section className="rounded-lg border border-dashed border-border p-12 text-center">
      <p className="font-display text-3xl font-bold">No shows here yet.</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Change the filter or log the first concert you want Echoes to remember.
      </p>
      <Button className="mt-6" onClick={onCreate}>
        Log a show
      </Button>
    </section>
  );
}
