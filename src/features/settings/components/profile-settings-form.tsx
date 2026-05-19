"use client";

import { Loader2, Save } from "lucide-react";
import { FormEvent, useState, useTransition } from "react";

import { updateProfileSettingsAction } from "@/features/settings/server/actions";
import { Alert } from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import type { CurrentUser } from "@/shared/types";

type ProfileSettingsFormProps = {
  currentUser: CurrentUser;
};

export function ProfileSettingsForm({ currentUser }: ProfileSettingsFormProps) {
  const [displayName, setDisplayName] = useState(
    currentUser.profile.displayName,
  );
  const [bio, setBio] = useState(currentUser.profile.bio ?? "");
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

  return (
    <Card as="section" className="max-w-2xl p-6 sm:p-8">
      <form className="space-y-5" onSubmit={submit}>
        <div>
          <h2 className="font-display text-3xl font-bold">Profile</h2>
          <p className="text-muted-foreground mt-2 text-sm leading-6">
            These details are stored in your shared profile and can be reused
            across shared apps.
          </p>
        </div>

        {feedback ? (
          <Alert tone={feedback.tone}>{feedback.message}</Alert>
        ) : null}

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

        <div className="flex justify-end">
          <Button disabled={isPending} type="submit" variant="gradient">
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save profile
          </Button>
        </div>
      </form>
    </Card>
  );
}
