"use server";

import { revalidatePath } from "next/cache";

import {
  normalizeProfileSettingsInput,
  type ProfileSettingsInput,
} from "@/features/settings/lib/profile-validation";
import { core } from "@/lib/supabase/schemas";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/shared/server/action-result";
import { requireAuthUser } from "@/shared/server/auth";
import { mapProfile } from "@/shared/server/mappers";
import type { Profile } from "@/shared/types";

export const updateProfileSettingsAction = async (
  input: ProfileSettingsInput,
): Promise<ActionResult<Profile>> => {
  const normalized = normalizeProfileSettingsInput(input);

  if (!normalized.ok) {
    return normalized;
  }

  try {
    const client = await createClient();
    const user = await requireAuthUser(client);

    const { data, error } = await core(client)
      .from("profiles")
      .update({
        bio: normalized.data.bio,
        display_name: normalized.data.displayName,
      })
      .eq("id", user.id)
      .select(
        "id, display_name, avatar_url, username, bio, created_at, updated_at",
      )
      .single();

    if (error || !data) {
      return {
        ok: false,
        error: error?.message ?? "Could not update profile settings.",
      };
    }

    revalidatePath("/settings");
    revalidatePath("/logbook");
    revalidatePath("/timeline");
    revalidatePath("/stats");

    return { ok: true, data: mapProfile(data) };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Could not update profile settings.",
    };
  }
};
