import { useCallback, useEffect, useRef, useState } from "react";
import { MenacingText } from "./MenacingText";
import { cn } from "@/lib/utils";

type BattleAction = "attack" | "damage" | "special" | "idle";
type OverlayType = "ko" | "special";

interface BattleClashOverlayProps {
  showKO: boolean;
  lastAction: BattleAction;
  onResetKO?: () => void;
}

export function BattleClashOverlay({ showKO, lastAction, onResetKO }: BattleClashOverlayProps) {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousActionRef = useRef<BattleAction>("idle");

  const clearTimeoutRef = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startOverlay = useCallback((type: OverlayType) => {
    clearTimeoutRef();
    setActiveOverlay(type);

    timeoutRef.current = setTimeout(() => {
      setActiveOverlay(null);
      if (type === "ko") {
        onResetKO?.();
      }
    }, type === "ko" ? 1600 : 1100);
  }, [clearTimeoutRef, onResetKO]);

  useEffect(() => {
    const isNewSpecial = lastAction === "special" && previousActionRef.current !== "special";

    if (showKO) {
      startOverlay("ko");
    } else if (isNewSpecial) {
      startOverlay("special");
    }

    previousActionRef.current = lastAction;
  }, [lastAction, showKO, startOverlay]);

  useEffect(() => {
    return () => clearTimeoutRef();
  }, [clearTimeoutRef]);

  if (!activeOverlay) return null;

  const isKO = activeOverlay === "ko";

  return (
    <div className="fixed inset-0 z-[70] pointer-events-none flex items-center justify-center overflow-hidden">
      <div className={cn(
        "absolute inset-0 opacity-25 speed-lines animate-pulse",
        isKO ? "bg-gradient-to-b from-destructive/50 via-background/40 to-background/80" : "bg-gradient-to-b from-gyro/40 via-background/30 to-background/70"
      )} />
      <div className="absolute inset-0 diagonal-lines opacity-20" />

      <div className={cn(
        "relative z-10 flex flex-col items-center gap-3 px-8 py-6 rounded-3xl border-4 backdrop-blur-md",
        "shadow-[0_0_70px_rgba(0,0,0,0.35)]",
        isKO 
          ? "bg-destructive/90 border-destructive text-destructive-foreground animate-screen-shake" 
          : "bg-gyro/95 border-gyro text-gyro-foreground"
      )}>
        <MenacingText
          size="xl"
          className={cn(
            "drop-shadow-[0_0_22px_rgba(0,0,0,0.45)]",
            isKO ? "text-white" : "text-gyro-foreground"
          )}
        >
          {isKO ? "K.O.!" : "CRITICAL!"}
        </MenacingText>

        <p className="font-russo text-base md:text-lg text-center opacity-90">
          {isKO ? "Marvel vs. Capcom finish!" : "Stand power overload!"}
        </p>

        <div className="flex items-center gap-2 text-menacing text-2xl animate-menacing">
          <span className={isKO ? "text-white" : "text-gyro-foreground"}>ゴ</span>
          <span className={isKO ? "text-white" : "text-gyro-foreground"} style={{ animationDelay: "0.2s" }}>ゴ</span>
          <span className={isKO ? "text-white" : "text-gyro-foreground"} style={{ animationDelay: "0.4s" }}>ゴ</span>
        </div>
      </div>
    </div>
  );
}
