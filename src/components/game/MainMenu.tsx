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
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.2) 0%, transparent 70%)"
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 dramatic-enter">
        {/* Title */}
        <div className="space-y-2">
          <p className="font-russo text-xl text-muted-foreground tracking-widest">
            JOJO'S BIZARRE ADVENTURE
          </p>
          <MenacingText size="xl" className="text-primary">
            STEEL BALL RUN
          </MenacingText>
          <p className="font-bebas text-3xl text-secondary tracking-wide">
            ─ MATH RACE ─
          </p>
        </div>

        {/* Decorative line */}
        <div className="w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />

        {/* Description */}
        <p className="text-muted-foreground max-w-md mx-auto font-russo">
          Race across America solving math problems!
          <br />
          Answer correctly to advance. Beat Diego to New York!
        </p>

        {/* Start button */}
        <Button
          onClick={onStart}
          className={cn(
            "px-12 py-6 text-2xl font-bebas tracking-widest",
            "bg-primary hover:bg-primary/90 text-primary-foreground",
            "border-2 border-primary/50 hover:border-primary",
            "transition-all duration-300 hover:scale-110",
            "shadow-lg hover:shadow-primary/50"
          )}
        >
          START RACE
        </Button>

        {/* Rules */}
        <div className="mt-12 p-6 bg-card/50 rounded-lg border border-border max-w-md mx-auto">
          <h3 className="font-bebas text-xl text-primary mb-3">HOW TO PLAY</h3>
          <ul className="text-sm text-muted-foreground space-y-2 text-left font-russo">
            <li>• Two Stand cards will appear with a math operation</li>
            <li>• Choose the correct answer before time runs out</li>
            <li>• Correct answers advance you on the race map</li>
            <li>• Wrong answers let Diego catch up</li>
            <li>• First to reach New York wins!</li>
          </ul>
        </div>
      </div>

      {/* Floating menacing symbols around the screen */}
      <div className="absolute top-20 left-10 text-menacing text-4xl animate-menacing opacity-40">ゴ</div>
      <div className="absolute top-40 right-20 text-menacing text-3xl animate-menacing opacity-30" style={{ animationDelay: "0.5s" }}>ゴ</div>
      <div className="absolute bottom-32 left-20 text-menacing text-5xl animate-menacing opacity-35" style={{ animationDelay: "1s" }}>ゴ</div>
      <div className="absolute bottom-20 right-10 text-menacing text-4xl animate-menacing opacity-40" style={{ animationDelay: "0.7s" }}>ゴ</div>
    </div>
  );
}
