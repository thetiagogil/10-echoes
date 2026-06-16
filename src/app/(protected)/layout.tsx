import { isSupabaseConfigured } from "@/lib/env";
import { ProtectedAppShell } from "@/shared/components/layout/protected-app-shell";
import { requireUser } from "@/shared/server/auth";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (isSupabaseConfigured()) {
    await requireUser();

    return <ProtectedAppShell>{children}</ProtectedAppShell>;
  }

  return children;
}
