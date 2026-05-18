import { Tag } from "lucide-react";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

type TagsInputProps = {
  disabled: boolean;
  onChange: (value: string) => void;
  value: string;
};

export function TagsInput({ disabled, onChange, value }: TagsInputProps) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor="tags">Tags</Label>
      <div className="relative">
        <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          autoComplete="off"
          className="pl-9"
          disabled={disabled}
          id="tags"
          maxLength={520}
          name="tags"
          onChange={(event) => onChange(event.target.value)}
          placeholder="festival, favorite, late-night"
          value={value}
        />
      </div>
    </div>
  );
}
