import { Edit3, Eye, ListMusic, Trash2 } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { cn } from "@/shared/utils/cn";

type ConcertCardActionsProps = {
  artist: string;
  disabled: boolean;
  href: string;
  onDelete: () => void;
  onEdit: () => void;
  onFlip: () => void;
};

export function ConcertCardActions({
  artist,
  disabled,
  href,
  onDelete,
  onEdit,
  onFlip,
}: ConcertCardActionsProps) {
  return (
    <div className="mt-auto flex items-center justify-end gap-1 pt-3">
      <ButtonLink
        aria-label={`View ${artist}`}
        className={cn(disabled && "pointer-events-none opacity-60")}
        href={href}
        size="icon"
        variant="ghost"
      >
        <Eye className="h-4 w-4" />
      </ButtonLink>
      <Button
        aria-label={`Show ${artist} setlist`}
        disabled={disabled}
        onClick={onFlip}
        size="icon"
        variant="ghost"
      >
        <ListMusic className="h-4 w-4" />
      </Button>
      <Button
        aria-label={`Edit ${artist}`}
        disabled={disabled}
        onClick={onEdit}
        size="icon"
        variant="ghost"
      >
        <Edit3 className="h-4 w-4" />
      </Button>
      <Button
        aria-label={`Delete ${artist}`}
        disabled={disabled}
        onClick={onDelete}
        size="icon"
        variant="ghost"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
