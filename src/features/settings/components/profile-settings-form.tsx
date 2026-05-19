"use client";

import { Loader2, Save } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";

import { ProfileSummaryPanel } from "@/features/settings/components/profile-summary-panel";
import { updateProfileSettingsAction } from "@/features/settings/server/actions";
import { Alert } from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import type { CurrentUser } from "@/shared/types";

type ProfileSettingsFormProps = {
  currentUser: CurrentUser;
};

export function ProfileSettingsForm({ currentUser }: ProfileSettingsFormProps) {
  const initialDisplayName = currentUser.profile.displayName;
  const initialBio = currentUser.profile.bio ?? "";
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [bio, setBio] = useState(initialBio);
  const [feedback, setFeedback] = useState<{
    message: string;
    tone: "error" | "success";
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    startTransition(async () => {
      const result = await updateProfileSettingsAction({
        bio,
        displayName,
      });

      if (!result.ok) {
        setFeedback({ message: result.error, tone: "error" });
        return;
      }

      setDisplayName(result.data.displayName);
      setBio(result.data.bio ?? "");
      setFeedback({ message: "Profile settings saved.", tone: "success" });
    });
  };

  const reset = () => {
    setDisplayName(initialDisplayName);
    setBio(initialBio);
    setFeedback(null);
  };

  return (
    <form className="space-y-8" onSubmit={submit}>
      <ProfileSummaryPanel
        bio={bio}
        displayName={displayName}
        email={currentUser.email}
      />

      <section className="space-y-5">
        <div>
          <h2 className="font-display text-3xl font-bold">Profile</h2>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            These details are stored in your shared core profile and can be
            reused across shared apps.
          </p>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input disabled id="email" value={currentUser.email ?? ""} />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="displayName" required>
            Display name
          </Label>
          <Input
            autoComplete="name"
            disabled={isPending}
            id="displayName"
            maxLength={80}
            onChange={(event) => setDisplayName(event.target.value)}
            required
            value={displayName}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            disabled={isPending}
            id="bio"
            maxLength={500}
            onChange={(event) => setBio(event.target.value)}
            placeholder="A short note about your live music taste."
            rows={5}
            value={bio}
          />
          <p className="text-muted-foreground text-right font-mono text-[10px]">
            {bio.length}/500
          </p>
        </div>
      </section>

      {feedback ? <Alert tone={feedback.tone}>{feedback.message}</Alert> : null}

      <div className="border-border flex items-center justify-end gap-3 border-t pt-4">
        <Button
          disabled={isPending}
          onClick={reset}
          type="button"
          variant="ghost"
        >
          Reset
        </Button>
        <Button disabled={isPending} type="submit">
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save profile
        </Button>
      </div>
    </form>
  );
}
