import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface HealthBarProps {
  currentHp: number;
  maxHp: number;
  isPlayer: boolean;
  fighterName: string;
  showDamage?: boolean;
}

export function HealthBar({ currentHp, maxHp, isPlayer, fighterName, showDamage }: HealthBarProps) {
  const percentage = Math.max(0, (currentHp / maxHp) * 100);
  const isLow = percentage <= 25;
  const isCritical = percentage <= 10;
  const clipPath = isPlayer
    ? "polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)"
    : "polygon(12px 0, 100% 0, 100% 100%, 12px 100%, 0 50%)";

  return (
    <div className={cn("relative flex items-end gap-3 w-full min-w-0", !isPlayer && "flex-row-reverse")}>
      <div className="flex-1 relative">
        {/* Nameplate */}
        <div 
          className={cn(
            "absolute -top-5 min-w-[150px] max-w-[240px]",
            isPlayer ? "left-0" : "right-0"
          )}
        >
          <div className="relative px-3 py-1.5 text-xs uppercase font-russo tracking-[0.2em]">
            <div 
              className="absolute inset-0 blur-sm opacity-60"
              style={{ 
                clipPath,
                background: isPlayer 
                  ? "linear-gradient(90deg, rgba(34,211,238,0.25), rgba(34,211,238,0.15))"
                  : "linear-gradient(90deg, rgba(239,68,68,0.25), rgba(239,68,68,0.15))"
              }}
            />
            <div 
              className={cn(
                "absolute inset-0 border border-border/60 bg-card/80 backdrop-blur-sm",
                isPlayer ? "shadow-[0_6px_16px_rgba(34,211,238,0.15)]" : "shadow-[0_6px_16px_rgba(239,68,68,0.15)]"
              )}
              style={{ clipPath }}
            />
            <div className="relative flex items-center justify-between gap-2 min-w-0" style={{ clipPath }}>
              <span className={cn("text-[10px] text-muted-foreground shrink-0", isPlayer ? "order-1" : "order-2")}>
                {isPlayer ? "Player" : "CPU"}
              </span>
              <span 
                className={cn(
                  "font-bebas text-lg leading-none tracking-wide truncate",
                  isPlayer ? "text-gyro order-2" : "text-destructive order-1"
                )}
              >
                {fighterName}
              </span>
            </div>
          </div>
        </div>

        {/* Health bar container */}
        <div 
          className={cn(
            "relative h-10 rounded-md border border-border/60 overflow-hidden",
            "bg-background/70 backdrop-blur-sm",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
            showDamage && "animate-screen-shake"
          )}
        >
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_35%)]" />
          
          {/* Health fill */}
          <div
            className={cn(
              "relative h-full transition-all duration-300 ease-out",
              isPlayer 
                ? "bg-gradient-to-r from-gyro/90 via-gyro/80 to-gyro/60" 
                : "bg-gradient-to-l from-destructive/90 via-destructive/80 to-destructive/60",
              isCritical && "animate-pulse",
              !isPlayer && "ml-auto"
            )}
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.25)_0,rgba(255,255,255,0.25)_10px,transparent_10px,transparent_18px)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent opacity-50" />
          </div>
          
          {/* HP text overlay */}
          <div 
            className={cn(
              "absolute inset-0 flex items-center px-3",
              isPlayer ? "justify-start" : "justify-end"
            )}
          >
            <span 
              className={cn(
                "font-bebas text-base drop-shadow-lg tracking-widest",
                isLow ? "text-white" : "text-white/90"
              )}
            >
              {currentHp}/{maxHp}
            </span>
          </div>
        </div>

        {/* Danger indicator */}
        {isLow && (
          <div 
            className={cn(
              "absolute -bottom-4 text-[11px] font-russo uppercase tracking-[0.2em]",
              isPlayer ? "left-0" : "right-0",
              isCritical ? "text-destructive animate-pulse" : "text-yellow-400"
            )}
          >
            {isCritical ? "Danger!" : "Low HP"}
          </div>
        )}
      </div>
    </div>
  );
}
