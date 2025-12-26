import { Button } from "@/components/ui/button";
import { Fighter } from "@/data/battleData";
import { MenacingText } from "./MenacingText";
import { cn } from "@/lib/utils";

interface BattleOverScreenProps {
  isVictory: boolean;
  player: Fighter;
  cpu: Fighter;
  correctAnswers: number;
  wrongAnswers: number;
  onRestart: () => void;
}

export function BattleOverScreen({
  isVictory,
  player,
  cpu,
  correctAnswers,
  wrongAnswers,
  onRestart,
}: BattleOverScreenProps) {
  const winner = isVictory ? player : cpu;

  return (
    <div className={cn(
      "min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden",
      isVictory 
        ? "bg-gradient-to-br from-gyro/20 via-background to-accent/20" 
        : "bg-gradient-to-br from-destructive/20 via-background to-destructive/10"
    )}>
      {/* Background effects */}
      <div className="absolute inset-0 speed-lines opacity-20" />
      
      {/* K.O. text */}
      <div className="relative z-10 text-center dramatic-enter">
        <MenacingText 
          size="xl" 
          className={cn(
            isVictory ? "text-accent" : "text-destructive",
            "animate-pulse"
          )}
        >
          {isVictory ? "K.O.!" : "DEFEATED"}
        </MenacingText>
      </div>

      {/* Winner display */}
      <div className="relative z-10 mt-8 text-center">
        <div className="relative inline-block">
          <img
            src={winner.avatar}
            alt={winner.name}
            className={cn(
              "w-40 h-52 md:w-56 md:h-72 object-contain mx-auto",
              "drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)]",
              isVictory ? "" : "scale-x-[-1]"
            )}
          />
          
          {/* Winner label */}
          <div className={cn(
            "absolute -bottom-4 left-1/2 -translate-x-1/2",
            "bg-gradient-to-r px-4 py-1 rounded-full",
            isVictory 
              ? "from-gyro to-accent text-white" 
              : "from-destructive to-destructive/70 text-white"
          )}>
            <span className="font-bebas text-xl tracking-wider">
              {isVictory ? "WINNER!" : "WINNER"}
            </span>
          </div>
        </div>

        <h2 className={cn(
          "font-bebas text-3xl md:text-4xl mt-6",
          isVictory ? "text-gyro" : "text-destructive"
        )}>
          {winner.name}
        </h2>
        
        <p className="font-russo text-muted-foreground mt-2">
          {isVictory ? winner.victoryQuote : winner.victoryQuote}
        </p>
      </div>

      {/* Stats */}
      <div className="relative z-10 mt-8 p-4 bg-card/80 rounded-xl border-2 border-primary/30 backdrop-blur-sm">
        <h3 className="font-bebas text-xl text-primary mb-3 text-center">
          BATTLE STATS
        </h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="font-bebas text-3xl text-gyro">{correctAnswers}</p>
            <p className="font-russo text-sm text-muted-foreground">Ataques</p>
          </div>
          <div>
            <p className="font-bebas text-3xl text-destructive">{wrongAnswers}</p>
            <p className="font-russo text-sm text-muted-foreground">Danos</p>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-primary/20 text-center">
          <p className="font-russo text-sm text-muted-foreground">
            Taxa de acerto: {Math.round((correctAnswers / Math.max(1, correctAnswers + wrongAnswers)) * 100)}%
          </p>
        </div>
      </div>

      {/* Restart button */}
      <Button
        onClick={onRestart}
        className={cn(
          "relative z-10 mt-8 px-8 py-4 text-xl font-bebas tracking-widest",
          "transition-all duration-300 hover:scale-110",
          isVictory
            ? "bg-gyro hover:bg-gyro/90 shadow-[0_0_30px_hsl(var(--gyro)/0.5)]"
            : "bg-destructive hover:bg-destructive/90 shadow-[0_0_30px_hsl(var(--destructive)/0.5)]"
        )}
      >
        LUTAR NOVAMENTE
      </Button>

      {/* Floating symbols */}
      <div className="absolute top-10 left-10 text-menacing text-5xl animate-menacing opacity-50">ゴ</div>
      <div className="absolute top-20 right-20 text-primary text-4xl animate-menacing opacity-40" style={{ animationDelay: "0.3s" }}>ゴ</div>
      <div className="absolute bottom-32 left-20 text-accent text-6xl animate-menacing opacity-45" style={{ animationDelay: "0.6s" }}>ゴ</div>
      <div className="absolute bottom-16 right-16 text-menacing text-5xl animate-menacing opacity-50" style={{ animationDelay: "0.9s" }}>ゴ</div>
    </div>
  );
}
