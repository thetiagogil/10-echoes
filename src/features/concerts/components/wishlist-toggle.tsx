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
    <label className="border-border bg-background/35 flex items-start gap-3 rounded-lg border p-3 text-sm">
      <input
        checked={checked}
        className="accent-primary mt-1 h-4 w-4"
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span>
        <span className="flex items-center gap-2 font-semibold">
          <Heart className="text-primary h-4 w-4" />
          Bucket-list show
        </span>
        <span className="text-muted-foreground mt-1 block text-xs leading-5">
          Save this without a date when the show is still a wish.
        </span>
      </span>
    </label>
  );
}
