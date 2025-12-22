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
    <div className="w-full bg-card/50 rounded-lg p-3 border border-border backdrop-blur-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bebas text-lg text-muted-foreground">TEMPO</span>
        <span 
          className={cn(
            "font-bebas text-3xl transition-all",
            isCritical && "text-destructive animate-pulse scale-110",
            isLow && !isCritical && "text-accent",
            !isLow && "text-secondary"
          )}
        >
          {Math.ceil(timeLeft)}s
        </span>
      </div>
      <div className="h-4 bg-muted rounded-full overflow-hidden border border-border">
        <div
          className={cn(
            "h-full transition-all duration-100 relative",
            isCritical && "bg-destructive",
            isLow && !isCritical && "bg-accent",
            !isLow && "bg-secondary"
          )}
          style={{ width: `${percent}%` }}
        >
          {/* Glow effect on the edge */}
          <div 
            className={cn(
              "absolute right-0 top-0 bottom-0 w-4",
              isCritical && "bg-gradient-to-l from-destructive to-transparent shadow-[0_0_15px_hsl(var(--destructive))]",
              isLow && !isCritical && "bg-gradient-to-l from-accent to-transparent shadow-[0_0_15px_hsl(var(--accent))]",
              !isLow && "bg-gradient-to-l from-secondary to-transparent shadow-[0_0_15px_hsl(var(--secondary))]"
            )}
          />
        </div>
      </div>
      
      {/* Menacing effect when low */}
      {isLow && (
        <div className="flex justify-center gap-4 mt-2">
          <span className="text-destructive text-sm animate-menacing">ゴ</span>
          <span className="text-destructive text-sm animate-menacing" style={{ animationDelay: "0.3s" }}>ゴ</span>
          <span className="text-destructive text-sm animate-menacing" style={{ animationDelay: "0.6s" }}>ゴ</span>
        </div>
      )}
    </div>
  );
}
