"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

type SetlistBuilderProps = {
  disabled: boolean;
  onChange: (value: string) => void;
  value: string;
};

export function SetlistBuilder({
  disabled,
  onChange,
  value,
}: SetlistBuilderProps) {
  const [songs, setSongs] = useState(() => (value ? value.split("\n") : []));

  const commitSongs = (nextSongs: string[]) => {
    setSongs(nextSongs);
    onChange(nextSongs.join("\n"));
  };

  const updateSong = (index: number, song: string) => {
    const nextSongs = [...songs];
    nextSongs[index] = song;
    commitSongs(nextSongs);
  };

  const addSong = () => {
    commitSongs([...songs, ""]);
  };

  const removeSong = (index: number) => {
    commitSongs(songs.filter((_, songIndex) => songIndex !== index));
  };

  return (
    <div className="grid gap-1.5">
      <div className="flex items-center justify-between gap-3">
        <Label>Setlist</Label>
        <Button
          disabled={disabled}
          onClick={addSong}
          size="sm"
          type="button"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          Add song
        </Button>
      </div>

      <div className="border-border bg-background/35 space-y-2 rounded-lg border p-3">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <div className="flex items-center gap-2" key={index}>
              <span className="text-muted-foreground w-7 shrink-0 text-right font-mono text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Input
                disabled={disabled}
                onChange={(event) => updateSong(index, event.target.value)}
                placeholder="Song title"
                value={song}
              />
              <Button
                aria-label={`Remove song ${index + 1}`}
                disabled={disabled}
                onClick={() => removeSong(index)}
                size="icon"
                type="button"
                variant="ghost"
              >
                <Trash2 className="text-destructive h-4 w-4" />
              </Button>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground px-1 py-3 text-sm italic">
            Add songs one at a time to build a clean setlist.
          </p>
        )}
      </div>
    </div>
  );
}
