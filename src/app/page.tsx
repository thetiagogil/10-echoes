import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  ListMusic,
  Music2,
} from "lucide-react";
import Image from "next/image";
import type { ComponentType } from "react";

import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/shared/components/layout/app-header";
import { AppShell } from "@/shared/components/layout/app-shell";
import { SetupMissing } from "@/shared/components/setup-missing";
import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { getCurrentAuthUser } from "@/shared/server/auth";

export default async function Home() {
  if (!isSupabaseConfigured()) {
    return <SetupMissing />;
  }

  const client = await createClient();
  const currentUser = await getCurrentAuthUser(client);
  const isLoggedIn = Boolean(currentUser);

  return (
    <AppShell>
      <AppHeader
        actions={
          isLoggedIn ? (
            <ButtonLink href="/logbook" size="sm">
              Open logbook
            </ButtonLink>
          ) : (
            <>
              <ButtonLink href="/auth" size="sm" variant="ghost">
                Log in
              </ButtonLink>
              <ButtonLink href="/auth?mode=signup" size="sm">
                Sign up
              </ButtonLink>
            </>
          )
        }
      />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              alt=""
              className="object-cover opacity-40"
              fill
              priority
              sizes="100vw"
              src="/hero-concert.jpg"
            />
            <div className="from-background/40 via-background/70 to-background absolute inset-0 bg-linear-to-b" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-32 md:pt-32 md:pb-44">
            <h1 className="max-w-4xl text-5xl leading-[0.95] font-black tracking-tight md:text-7xl lg:text-8xl">
              Every show you&apos;ve <br />
              <em className="text-gradient-stage not-italic">ever</em> been to.{" "}
              <br />
              Every one you&apos;re <br />
              <em className="text-secondary font-light italic">about</em> to.
            </h1>
            <p className="text-muted-foreground mt-8 max-w-xl text-lg leading-relaxed">
              Keep artists, venues, setlists, ratings, and the kind of memories
              you only get when the lights go down in one private archive.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink
                href={isLoggedIn ? "/logbook" : "/auth?next=/logbook"}
                size="lg"
              >
                {isLoggedIn ? "Open your logbook" : "Log in to open logbook"}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <form action="/api/auth/demo" method="post">
                <input name="next" type="hidden" value="/logbook" />
                <Button
                  className="w-full sm:w-auto"
                  size="lg"
                  type="submit"
                  variant="outline"
                >
                  <Music2 className="h-4 w-4" />
                  Continue with test user
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section className="border-border bg-border mx-auto grid max-w-6xl gap-px overflow-hidden rounded-xl border px-0 md:grid-cols-3">
          <Feature
            body="Capture artist, venue, date, tags, rating, setlist, and private notes in one focused flow."
            icon={ListMusic}
            title="Logbook"
          />
          <Feature
            body="See dated shows in a simple chronology while bucket-list entries stay in your logbook."
            icon={CalendarClock}
            title="Timeline"
          />
          <Feature
            body="Track totals, wishlist count, average rating, top tags, most-seen artists, and favorite venues."
            icon={BarChart3}
            title="Stats"
          />
        </section>

        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="font-display text-gradient-stage text-3xl leading-snug italic md:text-4xl">
            A song heard live becomes part of a life lived.
          </p>
        </section>

        <footer className="border-border/60 text-muted-foreground border-t py-10 text-center font-mono text-xs">
          Echoes - track your live music history
        </footer>
      </main>
    </AppShell>
  );
}

type FeatureProps = {
  body: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
};

function Feature({ body, icon: Icon, title }: FeatureProps) {
  return (
    <article className="bg-card p-6 md:p-8">
      <Icon className="text-secondary mb-5 h-7 w-7" />
      <h2 className="font-display text-3xl font-bold">{title}</h2>
      <p className="text-muted-foreground mt-3 text-sm leading-6">{body}</p>
    </article>
  );
}
