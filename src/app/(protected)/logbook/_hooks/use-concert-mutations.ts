"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  createConcertAction,
  deleteConcertAction,
  updateConcertAction,
} from "@/features/concerts/server/actions";
import type { Concert, ConcertFormInput } from "@/features/concerts/types";

export function useConcertMutations(initialConcerts: Concert[]) {
  const router = useRouter();
  const [concerts, setConcerts] = useState(initialConcerts);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Concert | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Concert | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [pendingConcertId, setPendingConcertId] = useState<number | null>(null);
  const [isConcertPending, startConcertTransition] = useTransition();

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

  const closeDeleteDialog = () => {
    setDeleteCandidate(null);
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

  return {
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
  };
}
