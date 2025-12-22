import { Button } from "@/components/ui/button";
import { MenacingText } from "./MenacingText";
import { cn } from "@/lib/utils";

interface MainMenuProps {
  onStart: () => void;
}

export function MainMenu({ onStart }: MainMenuProps) {
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
          <MenacingText size="xl" className="text-primary">
            STEEL BALL RUN
          </MenacingText>
          <p className="font-bebas text-3xl gradient-text tracking-wide">
            ─ CORRIDA MATEMÁTICA ─
          </p>
        </div>

        {/* Decorative line */}
        <div className="w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto animate-glow-pulse" />

        {/* Description */}
        <p className="text-muted-foreground max-w-md mx-auto font-russo">
          Corra pelos Estados Unidos resolvendo problemas matemáticos!
          <br />
          Responda corretamente para avançar. Vença Diego até Nova York!
        </p>

        {/* Start button */}
        <Button
          onClick={onStart}
          className={cn(
            "px-12 py-6 text-2xl font-bebas tracking-widest",
            "bg-primary hover:bg-primary/90 text-primary-foreground",
            "border-4 border-accent hover:border-accent",
            "transition-all duration-300 hover:scale-110",
            "shadow-[0_0_30px_hsl(var(--primary)/0.5)]",
            "hover:shadow-[0_0_50px_hsl(var(--primary)/0.7)]"
          )}
        >
          INICIAR CORRIDA
        </Button>

        {/* Rules */}
        <div className="mt-12 p-6 bg-card/80 rounded-lg border-2 border-primary/30 max-w-md mx-auto backdrop-blur-sm">
          <h3 className="font-bebas text-xl text-accent mb-3">COMO JOGAR</h3>
          <ul className="text-sm text-muted-foreground space-y-2 text-left font-russo">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Duas cartas de Stand aparecerão com uma operação matemática</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-secondary">•</span>
              <span>Escolha a resposta correta antes do tempo acabar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gyro">•</span>
              <span>Respostas corretas fazem você avançar no mapa</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>Respostas erradas deixam Diego te alcançar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              <span>O primeiro a chegar em Nova York vence!</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Floating menacing symbols - more dramatic */}
      <div className="absolute top-10 left-8 text-menacing text-5xl animate-menacing opacity-50">ゴ</div>
      <div className="absolute top-32 right-16 text-primary text-4xl animate-menacing opacity-40" style={{ animationDelay: "0.3s" }}>ゴ</div>
      <div className="absolute top-20 right-32 text-secondary text-3xl animate-menacing opacity-30" style={{ animationDelay: "0.6s" }}>ゴ</div>
      <div className="absolute bottom-40 left-16 text-accent text-6xl animate-menacing opacity-45" style={{ animationDelay: "0.9s" }}>ゴ</div>
      <div className="absolute bottom-24 right-8 text-menacing text-5xl animate-menacing opacity-50" style={{ animationDelay: "0.5s" }}>ゴ</div>
      <div className="absolute bottom-16 left-1/3 text-primary text-4xl animate-menacing opacity-35" style={{ animationDelay: "1.2s" }}>ゴ</div>
    </div>
  );
}
