"use client";

import { Plus, Tag, X } from "lucide-react";
import { useMemo, useState } from "react";

import { formatTagLabel } from "@/features/concerts/lib/concerts";
import {
  getCreatableTagOptions,
  normalizeTagValue,
} from "@/features/concerts/lib/tags";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils/cn";

type TagPickerProps = {
  availableTags?: string[];
  disabled: boolean;
  onChange: (tags: string[]) => void;
  value: string[];
};

export function TagPicker({
  availableTags = [],
  disabled,
  onChange,
  value,
}: TagPickerProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const options = useMemo(
    () => getCreatableTagOptions(availableTags, value, query),
    [availableTags, query, value],
  );

  const addTag = (tag: string) => {
    const normalized = normalizeTagValue(tag);
    if (!normalized || value.includes(normalized)) return;

    onChange([...value, normalized]);
    setQuery("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((selectedTag) => selectedTag !== tag));
  };

  return (
    <div className="grid gap-1.5">
      <Label htmlFor="tags">Tags</Label>
      <div
        className={cn(
          "border-border bg-card relative rounded-lg border px-3 py-2 shadow-sm transition-colors hover:border-primary/50",
          focused && "border-secondary ring-ring ring-1",
          disabled && "opacity-50",
        )}
      >
        <div className="flex min-h-7 flex-wrap items-center gap-2">
          {value.map((tag) => (
            <span
              className="border-border bg-surface-elevated inline-flex items-center gap-1 rounded-sm border px-2 py-1 font-mono text-[10px] tracking-wider uppercase"
              key={tag}
            >
              {formatTagLabel(tag)}
              <button
                aria-label={`Remove ${formatTagLabel(tag)}`}
                className="text-muted-foreground hover:text-foreground transition"
                disabled={disabled}
                onClick={() => removeTag(tag)}
                type="button"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <div className="flex min-w-48 flex-1 items-center gap-2">
            <Tag className="text-muted-foreground h-4 w-4" />
            <input
              autoComplete="off"
              className="placeholder:text-muted-foreground h-7 min-w-0 flex-1 bg-transparent text-sm outline-none"
              disabled={disabled}
              id="tags"
              onBlur={() => {
                window.setTimeout(() => setFocused(false), 120);
              }}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setFocused(true)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === ",") {
                  event.preventDefault();
                  addTag(query);
                }

                if (event.key === "Backspace" && !query && value.length > 0) {
                  removeTag(value[value.length - 1]);
                }
              }}
              placeholder={
                value.length ? "Add another tag..." : "Select or add tags..."
              }
              value={query}
            />
          </div>
        </div>

        {focused && (options.matchingTags.length > 0 || options.canCreate) ? (
          <div className="scrollbar-themed border-border bg-popover shadow-card absolute top-[calc(100%+0.375rem)] right-0 left-0 z-40 max-h-56 overflow-y-auto overscroll-contain rounded-md border p-1">
            {options.matchingTags.map((tag) => (
              <button
                className="hover:bg-accent hover:text-accent-foreground flex w-full items-center rounded-sm px-2 py-2 text-left text-sm transition"
                disabled={disabled}
                key={tag}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => addTag(tag)}
                type="button"
              >
                {formatTagLabel(tag)}
              </button>
            ))}
            {options.canCreate ? (
              <button
                className="text-secondary hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm transition"
                disabled={disabled}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => addTag(options.normalizedQuery)}
                type="button"
              >
                <Plus className="h-4 w-4" />
                Add {formatTagLabel(options.normalizedQuery)}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
