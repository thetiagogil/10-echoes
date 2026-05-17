import { ArrowRight, BarChart3, CalendarClock, ListMusic, Music2 } from "lucide-react";
import Image from "next/image";
import type { ComponentType } from "react";

import { AppHeader } from "@/shared/components/layout/app-header";
import { AppShell } from "@/shared/components/layout/app-shell";
import { SetupMissing } from "@/shared/components/setup-missing";
import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { isSupabaseConfigured } from "@/lib/env";

export default function Home() {
  if (!isSupabaseConfigured()) {
    return <SetupMissing />;
  }

  return (
    <AppShell>
      <AppHeader
        actions={
          <>
            <ButtonLink href="/auth?next=/logbook" size="sm" variant="ghost">
              Sign in
            </ButtonLink>
            <ButtonLink href="/auth?mode=signup&next=/logbook" size="sm">
              Create account
            </ButtonLink>
          </>
        }
      />

      <main>
        <section className="relative min-h-[calc(100dvh-2rem)] overflow-hidden pt-28">
          <div className="absolute inset-0">
            <Image
              alt=""
              className="object-cover opacity-45"
              fill
              priority
              sizes="100vw"
              src="/hero-concert.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/78 to-background" />
          </div>

          <div className="relative mx-auto flex min-h-[calc(100dvh-9rem)] max-w-7xl flex-col justify-center px-6 py-16">
            <h1 className="max-w-4xl font-display text-6xl font-black leading-[0.92] tracking-tight md:text-8xl">
              Echoes
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-foreground md:text-2xl md:leading-9">
              A private live music journal for the nights you do not want to
              lose: artists, venues, setlists, ratings, and the memory that
              stayed with you.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/auth?mode=signup&next=/logbook" size="lg">
                Open your logbook
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <form action="/api/auth/demo" method="post">
                <input name="next" type="hidden" value="/logbook" />
                <Button className="w-full sm:w-auto" size="lg" type="submit" variant="outline">
                  <Music2 className="h-4 w-4" />
                  Use demo account
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-lg border border-border bg-border px-0 md:grid-cols-3">
          <Feature
            body="Capture artist, venue, date, rating, setlist, and private notes in one focused flow."
            icon={ListMusic}
            title="Logbook"
          />
          <Feature
            body="See past shows and upcoming plans in a simple chronology grouped by year."
            icon={CalendarClock}
            title="Timeline"
          />
          <Feature
            body="Track totals, average rating, most-seen artists, and favorite venues without extra setup."
            icon={BarChart3}
            title="Stats"
          />
        </section>

        <footer className="mx-auto max-w-7xl px-6 py-10 text-sm text-muted-foreground">
          Echoes is private by default. No social feed, no uploads, no external
          music integrations.
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
      <Icon className="mb-5 h-7 w-7 text-secondary" />
      <h2 className="font-display text-3xl font-bold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
    </article>
  );
}
