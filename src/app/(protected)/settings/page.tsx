import { ProfileSettingsForm } from "@/features/settings/components/profile-settings-form";
import { AppMain } from "@/shared/components/layout/app-main";
import { requireUser } from "@/shared/server/auth";
import { PageIntro } from "../_components/page-intro";

export default async function SettingsPage() {
  const currentUser = await requireUser();

  return (
    <AppMain className="max-w-3xl pb-12">
      <PageIntro
        description="This is your concert-going identity across the shared app workspace."
        title={
          <>
            Settings<span className="text-gradient-stage">.</span>
          </>
        }
      />
      <ProfileSettingsForm currentUser={currentUser} />
    </AppMain>
  );
}
