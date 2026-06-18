import { AuthRequiredError } from "@/shared/server/auth";

export const formatConcertMutationError = (message?: string | null) => {
  if (!message) return "Concert could not be saved.";
  if (message.includes("concerts_artist_length_check"))
    return "Artist must be 160 characters or less.";
  if (message.includes("concerts_venue_length_check"))
    return "Venue must be 160 characters or less.";
  if (message.includes("concerts_city_length_check"))
    return "City must be 120 characters or less.";
  if (message.includes("concerts_date_range_check"))
    return "Concert date must be between 1900 and 2100.";
  if (message.includes("concerts_rating_check"))
    return "Rating must be between 1 and 5.";
  if (message.includes("concerts_setlist_length_check"))
    return "Setlist must be 5,000 characters or less.";
  if (message.includes("concerts_notes_length_check"))
    return "Notes must be 3,000 characters or less.";

  return message;
};

export const formatCaughtConcertActionError = (error: unknown) => {
  if (error instanceof AuthRequiredError) {
    return "Sign in to manage your concert logbook.";
  }

  return error instanceof Error ? error.message : "Concert action failed.";
};
