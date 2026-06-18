type DetailStatProps = {
  label: string;
  value: string;
};

export const DetailStat = ({ label, value }: DetailStatProps) => {
  return (
    <div className="bg-card p-4">
      <dt className="text-muted-foreground mb-1 font-mono text-[10px] uppercase">
        {label}
      </dt>
      <dd className="truncate text-sm font-semibold">{value}</dd>
    </div>
  );
};
