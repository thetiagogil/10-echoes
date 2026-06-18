import { Star } from "lucide-react";

import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils/cn";

type RatingInputProps = {
  disabled: boolean;
  onChange: (value: number) => void;
  value: number;
};

export const RatingInput = ({
  disabled,
  onChange,
  value,
}: RatingInputProps) => {
  return (
    <div className="grid gap-1.5">
      <Label>Rating</Label>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            aria-label={`Set rating to ${rating}`}
            className="hover:bg-secondary/10 focus-visible:ring-ring rounded p-1 transition focus-visible:ring-1 focus-visible:outline-none"
            disabled={disabled}
            key={rating}
            onClick={() => onChange(rating === value ? 0 : rating)}
            type="button"
          >
            <Star
              className={cn(
                "h-6 w-6",
                rating <= value
                  ? "fill-secondary text-secondary"
                  : "text-muted-foreground/40",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
