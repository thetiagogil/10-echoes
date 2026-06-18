import { LandingPageView } from "@/app/_components/landing-page-view";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { SetupMissing } from "@/shared/components/setup-missing";
import { getCurrentAuthUser } from "@/shared/server/auth";

export default async function Home() {
  if (!isSupabaseConfigured()) {
    return <SetupMissing />;
  }

  const client = await createClient();
  const currentUser = await getCurrentAuthUser(client);
  const isLoggedIn = Boolean(currentUser);

  return <LandingPageView isLoggedIn={isLoggedIn} />;
}
