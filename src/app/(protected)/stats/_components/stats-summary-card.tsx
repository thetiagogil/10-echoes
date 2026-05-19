type StatsSummaryCardTone = "default" | "primary" | "secondary";

type StatsSummaryCardProps = {
  label: string;
  tone?: StatsSummaryCardTone;
  value: number | string;
};

const valueColors: Record<StatsSummaryCardTone, string> = {
  default: "text-foreground",
  primary: "text-gradient-stage",
  secondary: "text-secondary",
};

export function StatsSummaryCard({
  label,
  tone = "default",
  value,
}: StatsSummaryCardProps) {
  return (
    <div className="bg-card p-5 sm:p-6">
      <p className="text-muted-foreground mb-2 font-mono text-[10px] uppercase">
        {label}
      </p>
      <p
        className={`font-display text-4xl font-black sm:text-5xl ${valueColors[tone]}`}
      >
        {value}
      </p>
    </div>
  );
}
