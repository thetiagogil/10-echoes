import { ProfileSettingsForm } from "@/features/settings/components/profile-settings-form";
import { AppMain } from "@/shared/components/layout/app-main";
import { requireUser } from "@/shared/server/auth";
import { PageIntro } from "../_components/page-intro";

export default async function SettingsPage() {
  const currentUser = await requireUser();

  return (
    <AppMain className="pb-12">
      <PageIntro
        description="Manage the shared profile details Echoes can show in your private app shell."
        title={
          <>
            Account <span className="text-gradient-stage">settings</span>.
          </>
        }
      />
      <ProfileSettingsForm currentUser={currentUser} />
    </AppMain>
  );
}
