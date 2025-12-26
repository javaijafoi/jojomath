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
  const percentage = (currentHp / maxHp) * 100;
  const isLow = percentage <= 25;
  const isCritical = percentage <= 10;

  return (
    <div 
      className={cn(
        "flex items-center gap-3 w-full",
        !isPlayer && "flex-row-reverse"
      )}
    >
      {/* Fighter name */}
      <div 
        className={cn(
          "font-bebas text-lg tracking-wider min-w-[100px]",
          isPlayer ? "text-left text-gyro" : "text-right text-destructive"
        )}
      >
        {fighterName}
      </div>

      {/* Health bar container */}
      <div className="flex-1 relative">
        {/* Background */}
        <div 
          className={cn(
            "h-6 rounded-sm border-2 overflow-hidden",
            "bg-background/50 backdrop-blur-sm",
            isPlayer ? "border-gyro/50" : "border-destructive/50",
            showDamage && "animate-screen-shake"
          )}
        >
          {/* Health fill */}
          <div
            className={cn(
              "h-full transition-all duration-300 ease-out",
              isPlayer 
                ? "bg-gradient-to-r from-gyro to-gyro/70" 
                : "bg-gradient-to-l from-destructive to-destructive/70",
              isCritical && "animate-pulse",
              !isPlayer && "ml-auto"
            )}
            style={{ 
              width: `${percentage}%`,
            }}
          />
          
          {/* HP text overlay */}
          <div 
            className={cn(
              "absolute inset-0 flex items-center px-2",
              isPlayer ? "justify-start" : "justify-end"
            )}
          >
            <span 
              className={cn(
                "font-bebas text-sm drop-shadow-lg",
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
              "absolute -bottom-1 text-xs font-russo",
              isPlayer ? "left-0" : "right-0",
              isCritical ? "text-destructive animate-pulse" : "text-yellow-500"
            )}
          >
            {isCritical ? "DANGER!" : "LOW HP"}
          </div>
        )}
      </div>
    </div>
  );
}
