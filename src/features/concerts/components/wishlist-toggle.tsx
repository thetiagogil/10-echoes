import { Heart } from "lucide-react";

type WishlistToggleProps = {
  checked: boolean;
  disabled: boolean;
  onChange: (checked: boolean) => void;
};

export function WishlistToggle({
  checked,
  disabled,
  onChange,
}: WishlistToggleProps) {
  return (
    <label className="flex items-start gap-3 rounded-lg border border-border bg-background/35 p-3 text-sm">
      <input
        checked={checked}
        className="mt-1 h-4 w-4 accent-primary"
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span>
        <span className="flex items-center gap-2 font-semibold">
          <Heart className="h-4 w-4 text-primary" />
          Bucket-list show
        </span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
          Save this without a date when the show is still a wish.
        </span>
      </span>
    </label>
  );
}
