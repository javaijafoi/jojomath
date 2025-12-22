import { Operation } from "@/data/gameData";
import { cn } from "@/lib/utils";

interface OperationBadgeProps {
  operation: Operation;
  className?: string;
}

export function OperationBadge({ operation, className }: OperationBadgeProps) {
  const operationColors = {
    '+': 'bg-success',
    '-': 'bg-destructive',
    '×': 'bg-accent',
    '÷': 'bg-secondary',
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center w-14 h-14 rounded-full",
        "font-bebas text-3xl text-foreground",
        "shadow-lg border-2 border-primary/30",
        "dramatic-enter",
        operationColors[operation],
        className
      )}
    >
      {operation}
    </div>
  );
}
