import { cn } from "@/lib/utils";

interface FeedbackOverlayProps {
  state: "correct" | "wrong";
  quote: string;
}

export function FeedbackOverlay({ state, quote }: FeedbackOverlayProps) {
  const isCorrect = state === "correct";

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm",
        !isCorrect && "screen-shake"
      )}
    >
      <div 
        className={cn(
          "feedback-overlay text-center px-8 py-6 rounded-2xl border-4 max-w-md mx-4",
          isCorrect 
            ? "bg-gyro/95 border-gyro shadow-[0_0_60px_hsl(140,80%,50%/0.8)]" 
            : "bg-destructive/95 border-destructive shadow-[0_0_60px_hsl(0,85%,55%/0.8)]"
        )}
      >
        {/* Menacing symbols */}
        <div className="flex justify-center gap-3 mb-2">
          <span className={cn(
            "text-2xl animate-menacing",
            isCorrect ? "text-gyro-foreground" : "text-destructive-foreground"
          )}>ゴ</span>
          <span className={cn(
            "text-2xl animate-menacing",
            isCorrect ? "text-gyro-foreground" : "text-destructive-foreground"
          )} style={{ animationDelay: "0.2s" }}>ゴ</span>
          <span className={cn(
            "text-2xl animate-menacing",
            isCorrect ? "text-gyro-foreground" : "text-destructive-foreground"
          )} style={{ animationDelay: "0.4s" }}>ゴ</span>
        </div>

        {/* Main text */}
        <p className={cn(
          "font-bebas text-5xl md:text-6xl",
          isCorrect 
            ? "text-gyro-foreground ora-effect" 
            : "text-destructive-foreground"
        )}>
          {isCorrect ? "CORRETO!" : "ERRADO!"}
        </p>

        {/* Quote */}
        <p className={cn(
          "font-russo text-lg md:text-xl mt-3 opacity-90",
          isCorrect ? "text-gyro-foreground" : "text-destructive-foreground"
        )}>
          {quote}
        </p>
      </div>
    </div>
  );
}
