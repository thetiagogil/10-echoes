import { BarChart3, CalendarClock, ListMusic } from "lucide-react";

import { LandingFeatureCard } from "@/app/_components/landing-feature-card";

const featureItems = [
  {
    body: "Capture artist, venue, date, tags, rating, setlist, and private notes in one focused flow.",
    icon: ListMusic,
    title: "Logbook",
  },
  {
    body: "See dated shows in a simple chronology while bucket-list entries stay in your logbook.",
    icon: CalendarClock,
    title: "Timeline",
  },
  {
    body: "Track totals, wishlist count, average rating, top tags, most-seen artists, and favorite venues.",
    icon: BarChart3,
    title: "Stats",
  },
];

export const LandingFeatures = () => {
  return (
    <section className="border-border bg-border mx-auto grid max-w-6xl gap-px overflow-hidden rounded-xl border px-0 md:grid-cols-3">
      {featureItems.map((feature) => (
        <LandingFeatureCard
          body={feature.body}
          icon={feature.icon}
          key={feature.title}
          title={feature.title}
        />
      ))}
    </section>
  );
};
