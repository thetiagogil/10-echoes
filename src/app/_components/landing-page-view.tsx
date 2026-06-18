import { LandingFeatures } from "@/app/_components/landing-features";
import { LandingFooter } from "@/app/_components/landing-footer";
import { LandingHero } from "@/app/_components/landing-hero";
import { LandingQuote } from "@/app/_components/landing-quote";
import { AppHeader } from "@/shared/components/layout/app-header";
import { AppShell } from "@/shared/components/layout/app-shell";
import { ButtonLink } from "@/shared/components/ui/button-link";

type LandingPageViewProps = {
  isLoggedIn: boolean;
};

export const LandingPageView = ({ isLoggedIn }: LandingPageViewProps) => {
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
        <LandingHero isLoggedIn={isLoggedIn} />
        <LandingFeatures />
        <LandingQuote />
        <LandingFooter />
      </main>
    </AppShell>
  );
};
