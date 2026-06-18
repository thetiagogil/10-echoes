"use client";

import { type FormEvent, useState } from "react";

import type { Concert, ConcertFormInput } from "@/features/concerts/types";

type UseConcertFormOptions = {
  editing: Concert | null;
  onSubmit: (input: ConcertFormInput) => void;
};

export const useConcertForm = ({
  editing,
  onSubmit,
}: UseConcertFormOptions) => {
  const [artist, setArtist] = useState(editing?.artist ?? "");
  const [venue, setVenue] = useState(editing?.venue ?? "");
  const [city, setCity] = useState(editing?.city ?? "");
  const [concertDate, setConcertDate] = useState(editing?.concertDate ?? "");
  const [rating, setRating] = useState(editing?.rating ?? 0);
  const [notes, setNotes] = useState(editing?.notes ?? "");
  const [setlist, setSetlist] = useState(editing?.setlist ?? "");
  const [tags, setTags] = useState(editing?.tags ?? []);
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
      setlist,
      tags,
      isWishlist,
    });
  };

  return {
    artist,
    city,
    concertDate,
    isWishlist,
    notes,
    rating,
    setArtist,
    setCity,
    setConcertDate,
    setIsWishlist,
    setNotes,
    setRating,
    setSetlist,
    setTags,
    setVenue,
    setlist,
    submit,
    tags,
    venue,
  };
};
