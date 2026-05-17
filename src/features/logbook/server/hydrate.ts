import { redirect } from "next/navigation";

import { getConcerts } from "@/features/logbook/server/concerts";
import type { LogbookHydration } from "@/features/logbook/types";
import { createClient } from "@/lib/supabase/server";
import {
  ensureProfileForAuthUser,
  getCurrentAuthUser,
} from "@/shared/server/auth";
import { mapProfile } from "@/shared/server/mappers";

export async function hydrateLogbook(): Promise<LogbookHydration> {
  const client = await createClient();
  const user = await getCurrentAuthUser(client);

  if (!user) {
    redirect("/auth?next=/logbook");
  }

  const [profile, concerts] = await Promise.all([
    ensureProfileForAuthUser(client, user),
    getConcerts(client),
  ]);

  return {
    currentUser: {
      id: user.id,
      email: user.email ?? null,
      profile: mapProfile(profile),
    },
    concerts,
  };
}
