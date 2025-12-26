import { Button } from "@/components/ui/button";
import { MenacingText } from "./MenacingText";
import { cn } from "@/lib/utils";
import { GameMode } from "@/hooks/useBattleState";

interface ModeSelectProps {
  onSelectMode: (mode: GameMode) => void;
}

export function ModeSelect({ onSelectMode }: ModeSelectProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 speed-lines opacity-20" />
      <div className="absolute inset-0 diagonal-lines" />
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.3) 0%, transparent 60%)"
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 dramatic-enter">
        {/* Title */}
        <div className="space-y-2">
          <p className="font-russo text-xl text-secondary tracking-widest animate-glow-pulse">
            JOJO'S BIZARRE ADVENTURE
          </p>
          <MenacingText size="lg" className="text-primary">
            MATH ARENA
          </MenacingText>
          <p className="font-bebas text-2xl text-muted-foreground tracking-wide">
            ─ ESCOLHA SEU MODO ─
          </p>
        </div>

        {/* Mode selection buttons */}
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* Steel Ball Run Mode */}
          <button
            onClick={() => onSelectMode("race")}
            className={cn(
              "group relative p-6 rounded-xl border-4 transition-all duration-300",
              "bg-gradient-to-br from-gyro/20 to-gyro/5",
              "border-gyro/50 hover:border-gyro",
              "hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--gyro)/0.5)]",
              "min-w-[280px]"
            )}
          >
            <div className="space-y-3">
              <div className="text-6xl mb-2">🏇</div>
              <h3 className="font-bebas text-3xl text-gyro tracking-wider">
                STEEL BALL RUN
              </h3>
              <p className="font-russo text-sm text-muted-foreground">
                Corrida Matemática
              </p>
              <p className="text-xs text-muted-foreground/70 max-w-[200px] mx-auto">
                Corra pelos EUA resolvendo contas! 
                Vença Diego até Nova York!
              </p>
            </div>
            <div className="absolute -top-2 -right-2 text-gyro text-2xl animate-menacing opacity-70">ゴ</div>
          </button>

          {/* Math Fight Mode */}
          <button
            onClick={() => onSelectMode("battle")}
            className={cn(
              "group relative p-6 rounded-xl border-4 transition-all duration-300",
              "bg-gradient-to-br from-destructive/20 to-destructive/5",
              "border-destructive/50 hover:border-destructive",
              "hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--destructive)/0.5)]",
              "min-w-[280px]"
            )}
          >
            <div className="space-y-3">
              <div className="text-6xl mb-2">⚔️</div>
              <h3 className="font-bebas text-3xl text-destructive tracking-wider">
                JOJO MATH FIGHT
              </h3>
              <p className="font-russo text-sm text-muted-foreground">
                Batalha de Stands
              </p>
              <p className="text-xs text-muted-foreground/70 max-w-[200px] mx-auto">
                Lute 1v1 com seu Stand!
                Acerte contas para atacar, erre e leve dano!
              </p>
            </div>
            <div className="absolute -top-2 -right-2 text-destructive text-2xl animate-menacing opacity-70">ゴ</div>
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-muted-foreground/60 font-russo text-sm mt-4">
          Matemática + JoJo = Bizarra Diversão!
        </p>
      </div>

      {/* Floating menacing symbols */}
      <div className="absolute top-10 left-8 text-menacing text-5xl animate-menacing opacity-50">ゴ</div>
      <div className="absolute top-32 right-16 text-primary text-4xl animate-menacing opacity-40" style={{ animationDelay: "0.3s" }}>ゴ</div>
      <div className="absolute bottom-40 left-16 text-accent text-6xl animate-menacing opacity-45" style={{ animationDelay: "0.9s" }}>ゴ</div>
      <div className="absolute bottom-24 right-8 text-menacing text-5xl animate-menacing opacity-50" style={{ animationDelay: "0.5s" }}>ゴ</div>
    </div>
  );
}
