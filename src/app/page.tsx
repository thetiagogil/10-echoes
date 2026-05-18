import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  ListMusic,
  Music2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

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
            <div className="hidden items-center gap-1 md:flex">
              <HeaderLink href="/auth?next=/logbook">Logbook</HeaderLink>
              <HeaderLink href="/auth?next=/timeline">Timeline</HeaderLink>
              <HeaderLink href="/auth?next=/stats">Stats</HeaderLink>
            </div>
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
        <section className="relative overflow-hidden pt-20">
          <div className="absolute inset-0">
            <Image
              alt=""
              className="object-cover opacity-45"
              fill
              priority
              sizes="100vw"
              src="/hero-concert.jpg"
            />
            <div className="absolute inset-0 bg-linear-to-b from-background/35 via-background/78 to-background" />
          </div>

          <div className="relative mx-auto flex min-h-[calc(100dvh-8rem)] max-w-6xl flex-col justify-center px-6 py-16 md:py-24">
            <p className="mb-6 font-mono text-xs uppercase text-secondary">
              Echoes - a journal for live music
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-black leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl">
              Every show you&apos;ve{" "}
              <em className="text-gradient-stage not-italic">ever</em> been to.
              <br />
              Every one you&apos;re{" "}
              <em className="font-light italic text-secondary">about</em> to.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Keep artists, venues, setlists, ratings, and the kind of memories
              you only get when the lights go down in one private archive.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/auth?mode=signup&next=/logbook" size="lg">
                Open your logbook
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
                  Use demo account
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-xl border border-border bg-border px-0 md:grid-cols-3">
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
          <p className="font-display text-3xl italic leading-snug md:text-4xl">
            There is a reason we still keep ticket stubs.{" "}
            <span className="text-gradient-stage">
              A song heard live becomes part of a life lived.
            </span>
          </p>
        </section>

        <footer className="border-t border-border/60 py-10 text-center font-mono text-xs text-muted-foreground">
          Echoes - built for nights you do not want to forget
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

function HeaderLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link
      className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      href={href}
    >
      {children}
    </Link>
  );
}
