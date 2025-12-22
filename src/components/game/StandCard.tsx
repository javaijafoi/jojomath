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
    sm: "w-24 h-36",
    md: "w-36 h-52",
    lg: "w-44 h-64",
  };

  const numberSizes = {
    sm: "text-3xl",
    md: "text-5xl",
    lg: "text-6xl",
  };

  return (
    <div
      className={cn(
        "relative rounded-xl border-4 overflow-hidden transition-all duration-300",
        "bg-gradient-to-br from-card via-card to-muted",
        isRevealed && "stand-glow",
        sizeClasses[size],
        className
      )}
      style={{
        borderColor: isRevealed ? stand.color : "hsl(var(--border))",
        boxShadow: isRevealed ? `0 0 40px ${stand.color}60, inset 0 0 30px ${stand.color}20` : undefined,
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
          {/* Stand Image - FOCO PRINCIPAL */}
          <div className="absolute inset-0">
            <img 
              src={stand.image}
              alt={stand.name}
              className="w-full h-full object-cover object-top opacity-90"
              onError={(e) => {
                // Fallback gradient if image fails
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* Gradient overlay for better number visibility */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${stand.color}40 0%, transparent 40%, transparent 60%, ${stand.color}60 100%)`,
              }}
            />
          </div>

          {/* Number - TOP LEFT - GRANDE E VISÍVEL */}
          <div 
            className={cn(
              "absolute top-2 left-2 font-bebas font-bold z-10",
              numberSizes[size]
            )}
            style={{ 
              color: "white",
              textShadow: `3px 3px 0 ${stand.color}, -2px -2px 0 rgba(0,0,0,0.8), 0 0 20px ${stand.color}`,
              WebkitTextStroke: `2px ${stand.color}`,
            }}
          >
            {value}
          </div>
          
          {/* Number - BOTTOM RIGHT (rotated) */}
          <div 
            className={cn(
              "absolute bottom-2 right-2 font-bebas font-bold rotate-180 z-10",
              numberSizes[size]
            )}
            style={{ 
              color: "white",
              textShadow: `3px 3px 0 ${stand.color}, -2px -2px 0 rgba(0,0,0,0.8), 0 0 20px ${stand.color}`,
              WebkitTextStroke: `2px ${stand.color}`,
            }}
          >
            {value}
          </div>

          {/* Stand name at bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2 z-10"
          >
            <p 
              className="font-bebas text-center text-xs tracking-wider"
              style={{ 
                color: stand.color,
                textShadow: `0 0 10px ${stand.color}80`
              }}
            >
              {stand.name}
            </p>
          </div>

          {/* Menacing symbols */}
          <div 
            className="absolute top-1 right-1 text-xl animate-menacing font-bebas z-20"
            style={{ color: stand.color, opacity: 0.9 }}
          >
            ゴ
          </div>
          <div 
            className="absolute bottom-8 left-1 text-lg animate-menacing font-bebas z-20" 
            style={{ 
              color: stand.color, 
              opacity: 0.7,
              animationDelay: "0.5s" 
            }}
          >
            ゴ
          </div>
        </>
      )}
    </div>
  );
}
