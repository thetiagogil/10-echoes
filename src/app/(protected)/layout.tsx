import { isSupabaseConfigured } from "@/lib/env";
import { ProtectedAppShell } from "@/shared/components/layout/protected-app-shell";
import { requireUser } from "@/shared/server/auth";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (isSupabaseConfigured()) {
    const currentUser = await requireUser();

    return (
      <ProtectedAppShell currentUser={currentUser}>
        {children}
      </ProtectedAppShell>
    );
  }

  return children;
}
