import { ArrowRight, Music2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";

type LandingHeroProps = {
  isLoggedIn: boolean;
};

export const LandingHero = ({ isLoggedIn }: LandingHeroProps) => {
  return (
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
          Keep artists, venues, setlists, ratings, and the kind of memories you
          only get when the lights go down in one private archive.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink
            className="w-full sm:w-auto"
            href={isLoggedIn ? "/logbook" : "/auth?next=/logbook"}
            size="lg"
          >
            {isLoggedIn ? "Open your logbook" : "Log in to open your logbook"}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          {!isLoggedIn ? (
            <form action="/api/auth/demo" method="post">
              <input name="next" type="hidden" value="/logbook" />
              <Button
                className="w-full sm:w-auto"
                size="lg"
                type="submit"
                variant="outline"
              >
                <Music2 className="h-4 w-4" />
                Continue with demo account
              </Button>
            </form>
          ) : null}
        </div>
      </div>
    </section>
  );
};
