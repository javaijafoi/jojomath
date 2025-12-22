import { Stand } from "@/data/gameData";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface StandCardProps {
  value: number;
  stand: Stand;
  isRevealed?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  style?: CSSProperties;
}

export function StandCard({ 
  value, 
  stand, 
  isRevealed = true, 
  className,
  size = "md",
  style 
}: StandCardProps) {
  const sizeClasses = {
    sm: "w-20 h-28 text-2xl",
    md: "w-28 h-40 text-4xl",
    lg: "w-36 h-52 text-5xl",
  };

  return (
    <div
      className={cn(
        "relative rounded-lg border-4 overflow-hidden transition-all duration-300",
        "bg-gradient-to-br from-card via-card to-muted",
        isRevealed && "stand-glow",
        sizeClasses[size],
        className
      )}
      style={{
        borderColor: isRevealed ? stand.color : "hsl(var(--border))",
        boxShadow: isRevealed ? `0 0 30px ${stand.color}60, inset 0 0 20px ${stand.color}20` : undefined,
        ...style,
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
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at center, ${stand.color}, transparent 70%)`,
            }}
          />

          {/* Diagonal pattern */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${stand.color}20 10px, ${stand.color}20 12px)`
            }}
          />

          {/* Number - top left */}
          <div 
            className="absolute top-2 left-2 font-bebas drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
            style={{ color: stand.color }}
          >
            {value}
          </div>
          
          {/* Number - bottom right (rotated) */}
          <div 
            className="absolute bottom-2 right-2 font-bebas rotate-180 drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
            style={{ color: stand.color }}
          >
            {value}
          </div>

          {/* Stand name area */}
          <div className="flex items-center justify-center h-full">
            <div 
              className="font-bebas tracking-wide text-center px-2 leading-tight drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]"
              style={{ 
                color: stand.color,
                fontSize: size === "lg" ? "1rem" : size === "md" ? "0.8rem" : "0.6rem",
                textShadow: `0 0 10px ${stand.color}80`
              }}
            >
              {stand.name}
            </div>
          </div>

          {/* Menacing symbols - more dramatic */}
          <div 
            className="absolute -top-1 -right-1 text-xl animate-menacing font-bebas"
            style={{ color: stand.color, opacity: 0.8 }}
          >
            ゴ
          </div>
          <div 
            className="absolute -bottom-1 -left-1 text-xl animate-menacing font-bebas" 
            style={{ 
              color: stand.color, 
              opacity: 0.8,
              animationDelay: "0.5s" 
            }}
          >
            ゴ
          </div>
          <div 
            className="absolute top-1/2 -right-1 text-lg animate-menacing font-bebas" 
            style={{ 
              color: stand.color, 
              opacity: 0.5,
              animationDelay: "1s" 
            }}
          >
            ゴ
          </div>
        </>
      )}
    </div>
  );
}
