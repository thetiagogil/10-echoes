import { Heart } from "lucide-react";

import { cn } from "@/shared/utils/cn";

type WishlistToggleProps = {
  checked: boolean;
  disabled: boolean;
  onChange: (checked: boolean) => void;
};

export const WishlistToggle = ({
  checked,
  disabled,
  onChange,
}: WishlistToggleProps) => {
  return (
    <label
      className={cn(
        "border-border bg-card hover:border-primary/50 flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm shadow-sm transition-colors",
        checked && "border-primary/70 bg-primary/8",
        disabled && "hover:border-border cursor-not-allowed opacity-60",
      )}
    >
      <input
        checked={checked}
        className="peer sr-only"
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span
        aria-hidden="true"
        className={cn(
          "border-border bg-background/40 text-muted-foreground peer-focus-visible:ring-primary/70 peer-focus-visible:ring-offset-card mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:outline-hidden",
          checked && "border-primary/80 bg-primary/15 text-primary",
        )}
      >
        <Heart className={cn("h-4 w-4", checked && "fill-current")} />
      </span>
      <span>
        <span className="flex items-center gap-2 font-semibold">
          Bucket-list show
        </span>
        <span className="text-muted-foreground mt-1 block text-xs leading-5">
          Save this without a date when the show is still a wish.
        </span>
      </span>
    </label>
  );
};
