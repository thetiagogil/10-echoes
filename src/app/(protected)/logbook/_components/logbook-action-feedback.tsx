import { Alert } from "@/shared/components/ui/alert";

type LogbookActionFeedbackProps = {
  message: string | null;
};

export const LogbookActionFeedback = ({
  message,
}: LogbookActionFeedbackProps) => {
  if (!message) return null;

  return (
    <Alert className="mb-5" tone="error">
      {message}
    </Alert>
  );
};
