import type { ComponentType } from "react";

type LandingFeatureCardProps = {
  body: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
};

export const LandingFeatureCard = ({
  body,
  icon: Icon,
  title,
}: LandingFeatureCardProps) => {
  return (
    <article className="bg-card p-6 md:p-8">
      <div className="mb-4 flex items-center gap-3">
        <Icon className="text-secondary h-7 w-7 shrink-0" />
        <h2 className="font-display text-3xl leading-none font-bold">
          {title}
        </h2>
      </div>
      <p className="text-muted-foreground text-sm leading-6">{body}</p>
    </article>
  );
};
