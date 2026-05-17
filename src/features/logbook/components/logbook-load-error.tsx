import { Alert } from "@/shared/components/ui/alert";

type LogbookLoadErrorProps = {
  error: unknown;
};

export function LogbookLoadError({ error }: LogbookLoadErrorProps) {
  return (
    <div className="mx-auto mt-32 max-w-xl px-6">
      <Alert tone="error">
        {error instanceof Error
          ? error.message
          : "Could not load your Echoes logbook."}
      </Alert>
    </div>
  );
}
