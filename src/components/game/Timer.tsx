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

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="font-bebas text-lg">TIME</span>
        <span 
          className={cn(
            "font-bebas text-2xl transition-colors",
            isLow && "text-destructive animate-pulse"
          )}
        >
          {Math.ceil(timeLeft)}s
        </span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-100",
            isLow ? "bg-destructive" : "bg-primary"
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
