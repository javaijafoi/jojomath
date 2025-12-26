import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isRunning?: boolean;
  isPaused?: boolean;
  resetKey?: string | number;
  variant?: "compact" | "arena";
}

export function Timer({ 
  duration, 
  onTimeUp, 
  isRunning = true, 
  isPaused = false, 
  resetKey,
  variant = "compact",
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const hasEndedRef = useRef(false);

  useEffect(() => {
    setTimeLeft(duration);
    hasEndedRef.current = false;
  }, [duration, resetKey]);

  useEffect(() => {
    const shouldCount = isRunning && !isPaused;
    if (!shouldCount || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 0.1, 0));
    }, 100);

    return () => clearInterval(timer);
  }, [isRunning, isPaused, timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0 && !hasEndedRef.current) {
      hasEndedRef.current = true;
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  const percent = (timeLeft / duration) * 100;
  const isLow = timeLeft <= duration * 0.3;
  const isCritical = timeLeft <= duration * 0.15;
  const displaySeconds = Math.ceil(timeLeft);

  if (variant === "arena") {
    return (
      <div className="relative flex flex-col items-center w-full max-w-xs">
        <div className="relative w-full rounded-lg border border-primary/30 bg-gradient-to-b from-background/80 via-background/50 to-background/80 shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden px-4 py-2 md:py-3">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(94,234,212,0.18),transparent_45%),radial-gradient(circle_at_50%_130%,rgba(99,102,241,0.12),transparent_35%)] pointer-events-none" />
          <div className="absolute inset-0 opacity-40 bg-[linear-gradient(120deg,rgba(255,255,255,0.06)_20%,transparent_25%),linear-gradient(300deg,rgba(255,255,255,0.04)_20%,transparent_25%)]" />
          
          <div className="relative flex items-center justify-center gap-2">
            <span className="px-2 py-1 rounded-sm text-[10px] font-russo uppercase tracking-[0.2em] text-foreground/70 bg-primary/10 border border-primary/30">
              Timer
            </span>
            <span 
              className={cn(
                "font-bebas text-3xl md:text-4xl tracking-widest drop-shadow-sm",
                isCritical && "text-destructive animate-pulse",
                isLow && !isCritical && "text-accent",
                !isLow && "text-secondary"
              )}
            >
              {displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}
            </span>
          </div>

          <div className="relative mt-2 h-3 bg-muted/40 rounded-full overflow-hidden border border-border/60">
            <div 
              className={cn(
                "h-full transition-all duration-100",
                isCritical && "bg-destructive",
                isLow && !isCritical && "bg-accent",
                !isLow && "bg-secondary"
              )}
              style={{ width: `${percent}%` }}
            />
            <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.15)_0,rgba(255,255,255,0.15)_8px,transparent_8px,transparent_14px)]" />
          </div>
        </div>
        <div className="mt-1 text-[10px] uppercase font-russo tracking-[0.3em] text-muted-foreground/80">
          Fight Fair
        </div>
      </div>
    );
  }

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
