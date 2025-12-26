import { cn } from "@/lib/utils";
import { Fighter } from "@/data/battleData";

interface BattleStageProps {
  player: Fighter;
  cpu: Fighter;
  playerHp: number;
  cpuHp: number;
  lastAction: "attack" | "damage" | "special" | "idle";
  combo: number;
  isSpecialReady: boolean;
}

export function BattleStage({ 
  player, 
  cpu, 
  playerHp, 
  cpuHp,
  lastAction,
  combo,
  isSpecialReady,
}: BattleStageProps) {
  return (
    <div className="relative w-full h-full flex items-end justify-between px-4 pb-4">
      {/* Battle arena background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      {/* Speed lines when attacking */}
      {lastAction === "attack" && (
        <div className="absolute inset-0 speed-lines opacity-30 animate-pulse" />
      )}

      {/* Player side */}
      <div 
        className={cn(
          "relative z-10 transition-all duration-200",
          lastAction === "attack" && "animate-[attack_0.3s_ease-out]",
          lastAction === "damage" && "animate-screen-shake",
        )}
      >
        {/* Player fighter image */}
        <div 
          className={cn(
            "relative",
            lastAction === "attack" && "scale-110",
          )}
        >
          <img
            src={player.avatar}
            alt={player.name}
            className={cn(
              "w-32 h-40 md:w-48 md:h-60 object-contain drop-shadow-2xl",
              "transition-all duration-200",
              lastAction === "damage" && "brightness-50 contrast-150",
            )}
          />
          
          {/* Stand name */}
          <div className="absolute -bottom-2 left-0 right-0 text-center">
            <span className="font-bebas text-xs md:text-sm text-gyro bg-background/80 px-2 py-0.5 rounded">
              {player.stand}
            </span>
          </div>

          {/* Special ready indicator */}
          {isSpecialReady && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="font-bebas text-lg text-accent animate-pulse">
                ★ SPECIAL ★
              </span>
            </div>
          )}
        </div>

        {/* Combo counter */}
        {combo > 1 && (
          <div className="absolute top-0 -right-4 bg-accent/90 px-2 py-1 rounded-lg">
            <span className="font-bebas text-lg text-accent-foreground">
              x{combo}
            </span>
          </div>
        )}
      </div>

      {/* VS indicator */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <span className="font-bebas text-4xl md:text-6xl text-primary opacity-30">
          VS
        </span>
      </div>

      {/* CPU side */}
      <div 
        className={cn(
          "relative z-10 transition-all duration-200",
          lastAction === "attack" && "animate-[damage-flash_0.3s_ease-out]",
        )}
      >
        {/* CPU fighter image - MIRRORED */}
        <div className="relative">
          <img
            src={cpu.avatar}
            alt={cpu.name}
            className={cn(
              "w-32 h-40 md:w-48 md:h-60 object-contain drop-shadow-2xl",
              "transition-all duration-200",
              "scale-x-[-1]", // Mirror the sprite
              lastAction === "attack" && "brightness-50 contrast-150",
            )}
          />
          
          {/* Stand name */}
          <div className="absolute -bottom-2 left-0 right-0 text-center">
            <span className="font-bebas text-xs md:text-sm text-destructive bg-background/80 px-2 py-0.5 rounded">
              {cpu.stand}
            </span>
          </div>
        </div>
      </div>

      {/* Menacing symbols during battle */}
      <div className="absolute top-4 left-4 text-menacing text-3xl animate-menacing opacity-50">ゴ</div>
      <div className="absolute top-8 right-8 text-menacing text-2xl animate-menacing opacity-40" style={{ animationDelay: "0.3s" }}>ゴ</div>
      <div className="absolute bottom-20 left-1/3 text-menacing text-xl animate-menacing opacity-30" style={{ animationDelay: "0.6s" }}>ゴ</div>
    </div>
  );
}
