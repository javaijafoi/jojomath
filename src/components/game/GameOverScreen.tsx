import { Character, victoryQuotes, defeatQuotes } from "@/data/gameData";
import { Button } from "@/components/ui/button";
import { MenacingText } from "./MenacingText";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

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

  const quote = useMemo(() => {
    const quotes = isVictory ? victoryQuotes : defeatQuotes;
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, [isVictory]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: isVictory
            ? "radial-gradient(ellipse at center, hsl(var(--gyro) / 0.4) 0%, transparent 60%)"
            : "radial-gradient(ellipse at center, hsl(var(--destructive) / 0.4) 0%, transparent 60%)"
        }}
      />
      <div className="absolute inset-0 speed-lines opacity-20" />
      <div className="absolute inset-0 diagonal-lines" />

      <div className="relative z-10 text-center space-y-8 dramatic-enter max-w-md w-full">
        {/* Result */}
        {isVictory ? (
          <>
            <div className="text-8xl mb-4 animate-bounce">🏆</div>
            <MenacingText size="xl" className="text-gyro ora-effect">
              VITÓRIA!
            </MenacingText>
            <p className="font-bebas text-2xl text-success">
              {player.name} chega primeiro em Nova York!
            </p>
          </>
        ) : (
          <>
            <div className="text-8xl mb-4">💀</div>
            <MenacingText size="xl" className="text-destructive">
              DERROTA
            </MenacingText>
            <p className="font-bebas text-2xl text-muted-foreground">
              Diego Brando vence a corrida...
            </p>
          </>
        )}

        {/* Quote */}
        <p className="font-russo text-lg text-muted-foreground italic">
          {quote}
        </p>

        {/* Stats */}
        <div className="p-6 bg-card/80 rounded-lg border-2 border-primary/30 space-y-4 backdrop-blur-sm">
          <h3 className="font-bebas text-xl text-accent">ESTATÍSTICAS DA CORRIDA</h3>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gyro/20 rounded-lg border border-gyro/50">
              <p className="font-bebas text-4xl text-gyro">{correctAnswers}</p>
              <p className="text-xs text-muted-foreground mt-1">Acertos</p>
            </div>
            <div className="p-3 bg-destructive/20 rounded-lg border border-destructive/50">
              <p className="font-bebas text-4xl text-destructive">{wrongAnswers}</p>
              <p className="text-xs text-muted-foreground mt-1">Erros</p>
            </div>
            <div className="p-3 bg-primary/20 rounded-lg border border-primary/50">
              <p className="font-bebas text-4xl text-primary">{accuracy}%</p>
              <p className="text-xs text-muted-foreground mt-1">Precisão</p>
            </div>
          </div>
        </div>

        {/* JoJo "To Be Continued" style */}
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="w-20 h-1 bg-gradient-to-r from-transparent to-primary" />
          <span className="font-bebas text-xl tracking-widest text-primary">
            {isVictory ? "THE END" : "TO BE CONTINUED"}
          </span>
          <div className="flex items-center">
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent" />
            {!isVictory && <span className="text-primary text-2xl ml-2">➤</span>}
          </div>
        </div>

        {/* Restart button */}
        <Button
          onClick={onRestart}
          className={cn(
            "px-10 py-5 text-xl font-bebas tracking-widest",
            "bg-primary hover:bg-primary/90 text-primary-foreground",
            "border-4 border-accent hover:border-accent",
            "transition-all duration-300 hover:scale-110",
            "shadow-[0_0_30px_hsl(var(--primary)/0.5)]",
            "hover:shadow-[0_0_50px_hsl(var(--primary)/0.7)]"
          )}
        >
          CORRER NOVAMENTE
        </Button>
      </div>

      {/* Menacing symbols */}
      <div className="absolute top-16 left-8 text-menacing text-5xl animate-menacing opacity-50">ゴ</div>
      <div className="absolute top-32 right-16 text-primary text-4xl animate-menacing opacity-40" style={{ animationDelay: "0.4s" }}>ゴ</div>
      <div className="absolute bottom-32 left-16 text-accent text-6xl animate-menacing opacity-45" style={{ animationDelay: "0.8s" }}>ゴ</div>
      <div className="absolute bottom-16 right-8 text-menacing text-5xl animate-menacing opacity-50" style={{ animationDelay: "0.6s" }}>ゴ</div>
    </div>
  );
}
