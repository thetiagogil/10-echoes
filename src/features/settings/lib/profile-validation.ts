export type ProfileSettingsInput = {
  bio?: string | null;
  displayName: string;
};

export type NormalizedProfileSettingsInput = {
  bio: string | null;
  displayName: string;
};

const displayNameMaxLength = 80;
const bioMaxLength = 500;

export function normalizeProfileSettingsInput(
  input: ProfileSettingsInput,
):
  | { ok: true; data: NormalizedProfileSettingsInput }
  | { ok: false; error: string } {
  const displayName = input.displayName.trim();
  const bio = input.bio?.trim() || null;

  if (!displayName) {
    return { ok: false, error: "Display name is required." };
  }

  if (displayName.length > displayNameMaxLength) {
    return {
      ok: false,
      error: `Display name must be ${displayNameMaxLength} characters or fewer.`,
    };
  }

  if (bio && bio.length > bioMaxLength) {
    return {
      ok: false,
      error: `Bio must be ${bioMaxLength} characters or fewer.`,
    };
  }

  return { ok: true, data: { bio, displayName } };
}
