"use server";

import { revalidatePath } from "next/cache";

import { normalizeConcertInput } from "@/features/logbook/lib/concerts";
import {
  formatCaughtConcertActionError,
  formatConcertMutationError,
} from "@/features/logbook/server/action-errors";
import {
  buildCreateConcertArgs,
  buildDeleteConcertArgs,
  buildUpdateConcertArgs,
  validateConcertId,
} from "@/features/logbook/server/action-inputs";
import { mapConcert } from "@/features/logbook/server/mappers";
import type { Concert, ConcertFormInput } from "@/features/logbook/types";
import { echoes } from "@/lib/supabase/schemas";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/shared/server/action-result";
import {
  ensureProfileForAuthUser,
  requireAuthUser,
} from "@/shared/server/auth";

export async function createConcertAction(
  input: ConcertFormInput,
): Promise<ActionResult<Concert>> {
  const normalized = normalizeConcertInput(input);

  if (!normalized.ok) {
    return { ok: false, error: normalized.error };
  }

  try {
    const client = await createClient();
    const user = await requireAuthUser(client);
    await ensureProfileForAuthUser(client, user);

    const { data, error } = await echoes(client).rpc(
      "create_concert",
      buildCreateConcertArgs(normalized.data),
    );

    if (error || !data) {
      return { ok: false, error: formatConcertMutationError(error?.message) };
    }

    revalidatePath("/logbook");

    return { ok: true, data: mapConcert(data) };
  } catch (error) {
    return { ok: false, error: formatCaughtConcertActionError(error) };
  }
}

export async function updateConcertAction(
  concertId: number,
  input: ConcertFormInput,
): Promise<ActionResult<Concert>> {
  const idResult = validateConcertId(concertId);

  if (!idResult.ok) {
    return idResult;
  }

  const normalized = normalizeConcertInput(input);

  if (!normalized.ok) {
    return { ok: false, error: normalized.error };
  }

  try {
    const client = await createClient();
    await requireAuthUser(client);

    const { data, error } = await echoes(client).rpc(
      "update_concert",
      buildUpdateConcertArgs(idResult.id, normalized.data),
    );

    if (error || !data) {
      return { ok: false, error: formatConcertMutationError(error?.message) };
    }

    revalidatePath("/logbook");

    return { ok: true, data: mapConcert(data) };
  } catch (error) {
    return { ok: false, error: formatCaughtConcertActionError(error) };
  }
}

export async function deleteConcertAction(
  concertId: number,
): Promise<ActionResult<Concert>> {
  const idResult = validateConcertId(concertId);

  if (!idResult.ok) {
    return idResult;
  }

  try {
    const client = await createClient();
    await requireAuthUser(client);

    const { data, error } = await echoes(client).rpc(
      "delete_concert",
      buildDeleteConcertArgs(idResult.id),
    );

    if (error || !data) {
      return { ok: false, error: formatConcertMutationError(error?.message) };
    }

    revalidatePath("/logbook");

    return { ok: true, data: mapConcert(data) };
  } catch (error) {
    return { ok: false, error: formatCaughtConcertActionError(error) };
  }
}
