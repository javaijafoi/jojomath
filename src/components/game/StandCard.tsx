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
    sm: "w-20 h-28",
    md: "w-28 h-40",
    lg: "w-32 h-44 md:w-36 md:h-52",
  };

  const numberSizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-5xl",
  };

  return (
    <div
      className={cn(
        "relative rounded-xl border-3 overflow-hidden transition-all duration-300",
        "bg-gradient-to-br from-card via-card to-muted",
        isRevealed && "stand-glow",
        sizeClasses[size],
        className
      )}
      style={{
        borderColor: isRevealed ? stand.color : "hsl(var(--border))",
        boxShadow: isRevealed ? `0 0 30px ${stand.color}50, inset 0 0 20px ${stand.color}15` : undefined,
        borderWidth: "3px",
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
          {/* Stand Image */}
          <div className="absolute inset-0">
            <img 
              src={stand.image}
              alt={stand.name}
              loading="lazy"
              className="w-full h-full object-cover object-top opacity-90"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            {/* Gradient overlay */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${stand.color}35 0%, transparent 35%, transparent 65%, ${stand.color}50 100%)`,
              }}
            />
          </div>

          {/* Number - TOP LEFT */}
          <div 
            className={cn(
              "absolute top-1.5 left-1.5 font-bebas font-bold z-10",
              numberSizes[size]
            )}
            style={{ 
              color: "white",
              textShadow: `2px 2px 0 ${stand.color}, -1px -1px 0 rgba(0,0,0,0.7), 0 0 15px ${stand.color}`,
              WebkitTextStroke: `1.5px ${stand.color}`,
            }}
          >
            {value}
          </div>
          
          {/* Number - BOTTOM RIGHT (rotated) */}
          <div 
            className={cn(
              "absolute bottom-1.5 right-1.5 font-bebas font-bold rotate-180 z-10",
              numberSizes[size]
            )}
            style={{ 
              color: "white",
              textShadow: `2px 2px 0 ${stand.color}, -1px -1px 0 rgba(0,0,0,0.7), 0 0 15px ${stand.color}`,
              WebkitTextStroke: `1.5px ${stand.color}`,
            }}
          >
            {value}
          </div>

          {/* Stand name at bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent p-1.5 z-10"
          >
            <p 
              className="font-bebas text-center text-[10px] tracking-wider"
              style={{ 
                color: stand.color,
                textShadow: `0 0 8px ${stand.color}70`
              }}
            >
              {stand.name}
            </p>
          </div>

          {/* Single menacing symbol */}
          <div 
            className="absolute top-0.5 right-0.5 text-base animate-menacing font-bebas z-20"
            style={{ color: stand.color, opacity: 0.8 }}
          >
            ゴ
          </div>
        </>
      )}
    </div>
  );
}
