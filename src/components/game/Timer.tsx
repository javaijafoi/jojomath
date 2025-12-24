import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isRunning: boolean;
  key?: number;
}

export function Timer({ duration, onTimeUp, isRunning }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration, isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 0.1);
    }, 100);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onTimeUp]);

  const percent = (timeLeft / duration) * 100;
  const isLow = timeLeft <= duration * 0.3;
  const isCritical = timeLeft <= duration * 0.15;

  return (
    <div className="w-full">
      {/* Compact timer bar */}
      <div className="flex items-center gap-2">
        <span 
          className={cn(
            "font-bebas text-lg md:text-xl transition-all min-w-[40px]",
            isCritical && "text-destructive animate-pulse",
            isLow && !isCritical && "text-accent",
            !isLow && "text-secondary"
          )}
        >
          {Math.ceil(timeLeft)}s
        </span>
        
        <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-100 rounded-full",
              isCritical && "bg-destructive",
              isLow && !isCritical && "bg-accent",
              !isLow && "bg-secondary"
            )}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
