import { Character } from "@/data/gameData";
import { Button } from "@/components/ui/button";
import { MenacingText } from "./MenacingText";
import { cn } from "@/lib/utils";

interface GameOverScreenProps {
  isVictory: boolean;
  player: Character;
  correctAnswers: number;
  wrongAnswers: number;
  onRestart: () => void;
}

export function GameOverScreen({
  isVictory,
  player,
  correctAnswers,
  wrongAnswers,
  onRestart,
}: GameOverScreenProps) {
  const totalRounds = correctAnswers + wrongAnswers;
  const accuracy = totalRounds > 0 ? Math.round((correctAnswers / totalRounds) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: isVictory
            ? "radial-gradient(ellipse at center, hsl(var(--primary) / 0.3) 0%, transparent 70%)"
            : "radial-gradient(ellipse at center, hsl(var(--destructive) / 0.3) 0%, transparent 70%)"
        }}
      />
      <div className="absolute inset-0 speed-lines opacity-20" />

      <div className="relative z-10 text-center space-y-8 dramatic-enter max-w-md w-full">
        {/* Result */}
        {isVictory ? (
          <>
            <div className="text-8xl mb-4">🏆</div>
            <MenacingText size="xl" className="text-primary">
              VICTORY!
            </MenacingText>
            <p className="font-bebas text-2xl text-success">
              {player.name} reaches New York first!
            </p>
          </>
        ) : (
          <>
            <div className="text-8xl mb-4">💀</div>
            <MenacingText size="xl" className="text-destructive">
              DEFEAT
            </MenacingText>
            <p className="font-bebas text-2xl text-muted-foreground">
              Diego Brando wins the race...
            </p>
          </>
        )}

        {/* Stats */}
        <div className="p-6 bg-card rounded-lg border border-border space-y-4">
          <h3 className="font-bebas text-xl text-primary">RACE STATS</h3>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-bebas text-3xl text-success">{correctAnswers}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div>
              <p className="font-bebas text-3xl text-destructive">{wrongAnswers}</p>
              <p className="text-xs text-muted-foreground">Wrong</p>
            </div>
            <div>
              <p className="font-bebas text-3xl text-primary">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </div>

        {/* JoJo "To Be Continued" style */}
        <div className="flex items-center justify-center gap-2 py-4">
          <div className="w-16 h-0.5 bg-primary" />
          <span className="font-bebas text-lg tracking-widest text-muted-foreground">
            {isVictory ? "THE END" : "TO BE CONTINUED →"}
          </span>
          <div className="w-16 h-0.5 bg-primary" />
        </div>

        {/* Restart button */}
        <Button
          onClick={onRestart}
          className={cn(
            "px-10 py-5 text-xl font-bebas tracking-widest",
            "bg-primary hover:bg-primary/90 text-primary-foreground",
            "border-2 border-primary/50 hover:border-primary",
            "transition-all duration-300 hover:scale-110"
          )}
        >
          RACE AGAIN
        </Button>
      </div>

      {/* Menacing symbols */}
      <div className="absolute top-20 left-10 text-menacing text-4xl animate-menacing opacity-40">ゴ</div>
      <div className="absolute bottom-20 right-10 text-menacing text-4xl animate-menacing opacity-40" style={{ animationDelay: "0.7s" }}>ゴ</div>
    </div>
  );
}
