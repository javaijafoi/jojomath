import { Stand } from "@/data/gameData";
import { cn } from "@/lib/utils";

interface StandCardProps {
  value: number;
  stand: Stand;
  isRevealed?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function StandCard({ 
  value, 
  stand, 
  isRevealed = true, 
  className,
  size = "md" 
}: StandCardProps) {
  const sizeClasses = {
    sm: "w-20 h-28 text-2xl",
    md: "w-28 h-40 text-4xl",
    lg: "w-36 h-52 text-5xl",
  };

  return (
    <div
      className={cn(
        "relative rounded-lg border-2 overflow-hidden transition-all duration-300",
        "bg-gradient-to-br from-card to-muted",
        isRevealed ? "stand-glow" : "opacity-80",
        sizeClasses[size],
        className
      )}
      style={{
        borderColor: isRevealed ? stand.color : "hsl(var(--border))",
      }}
    >
      {/* Card back pattern */}
      {!isRevealed && (
        <div className="absolute inset-0 speed-lines opacity-50" />
      )}

      {/* Card front */}
      {isRevealed && (
        <>
          {/* Stand glow background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at center, ${stand.color}, transparent)`,
            }}
          />

          {/* Number */}
          <div className="absolute top-2 left-2 font-bebas text-foreground">
            {value}
          </div>
          <div className="absolute bottom-2 right-2 font-bebas text-foreground rotate-180">
            {value}
          </div>

          {/* Stand icon area */}
          <div className="flex items-center justify-center h-full">
            <div 
              className="font-bebas tracking-wide text-center px-2 leading-tight"
              style={{ 
                color: stand.color,
                fontSize: size === "lg" ? "0.9rem" : size === "md" ? "0.7rem" : "0.5rem"
              }}
            >
              {stand.name}
            </div>
          </div>

          {/* Menacing symbols */}
          <div className="absolute -top-2 -right-2 text-menacing text-lg animate-menacing font-bebas opacity-70">
            ゴ
          </div>
          <div className="absolute -bottom-2 -left-2 text-menacing text-lg animate-menacing font-bebas opacity-70" style={{ animationDelay: "0.5s" }}>
            ゴ
          </div>
        </>
      )}
    </div>
  );
}
