import type { ReactNode } from "react";

type PageIntroProps = {
  actions?: ReactNode;
  description?: string;
  eyebrow: string;
  title: ReactNode;
};

export function PageIntro({
  actions,
  description,
  eyebrow,
  title,
}: PageIntroProps) {
  return (
    <section className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="mb-2 font-mono text-xs uppercase text-secondary">
          {eyebrow}
        </p>
        <h1 className="font-display text-5xl font-black leading-none sm:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? <div className="shrink-0">{actions}</div> : null}
    </section>
  );
}
