import { useState, useEffect } from "react";
import { Fighter, getRandomFighters } from "@/data/battleData";
import { cn } from "@/lib/utils";
import { MenacingText } from "./MenacingText";

interface FighterSelectProps {
  onSelect: (fighter: Fighter) => void;
}

export function FighterSelect({ onSelect }: FighterSelectProps) {
  const [availableFighters, setAvailableFighters] = useState<Fighter[]>([]);
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null);

  useEffect(() => {
    setAvailableFighters(getRandomFighters(6));
  }, []);

  const handleSelect = (fighter: Fighter) => {
    setSelectedFighter(fighter);
    setTimeout(() => onSelect(fighter), 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 speed-lines opacity-10" />
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, hsl(var(--destructive) / 0.2) 0%, transparent 60%)"
        }}
      />

      {/* Title */}
      <div className="relative z-10 text-center mb-6 dramatic-enter">
        <MenacingText size="md" className="text-destructive">
          CHOOSE YOUR FIGHTER
        </MenacingText>
        <p className="font-russo text-muted-foreground mt-2">
          Selecione seu lutador para a batalha!
        </p>
      </div>

      {/* Fighter grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto relative z-10">
        {availableFighters.map((fighter, index) => (
          <button
            key={fighter.id}
            onClick={() => handleSelect(fighter)}
            disabled={selectedFighter !== null}
            className={cn(
              "group relative p-3 rounded-xl border-3 transition-all duration-300",
              "bg-gradient-to-br from-card to-card/50 backdrop-blur-sm",
              "hover:scale-105 hover:border-primary",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              selectedFighter?.id === fighter.id 
                ? "border-accent ring-4 ring-accent/50 scale-110" 
                : "border-primary/30",
              "dramatic-enter"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Fighter image */}
            <div className="relative mb-2">
              <img
                src={fighter.avatar}
                alt={fighter.name}
                className={cn(
                  "w-24 h-28 md:w-28 md:h-32 object-contain mx-auto",
                  "transition-all duration-300 group-hover:scale-110",
                  "drop-shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                )}
              />
              
              {/* HP indicator */}
              <div className="absolute top-0 right-0 bg-gyro/80 px-1.5 py-0.5 rounded text-xs font-bebas text-white">
                HP: {fighter.maxHp}
              </div>
              
              {/* ATK indicator */}
              <div className="absolute top-0 left-0 bg-destructive/80 px-1.5 py-0.5 rounded text-xs font-bebas text-white">
                ATK: {fighter.attackPower}
              </div>
            </div>

            {/* Fighter info */}
            <div className="text-center space-y-1">
              <h3 className="font-bebas text-lg md:text-xl text-primary tracking-wide">
                {fighter.name}
              </h3>
              <p className="font-russo text-xs text-secondary">
                {fighter.stand}
              </p>
              <p className="font-russo text-[10px] text-muted-foreground line-clamp-1">
                {fighter.specialAbility}
              </p>
            </div>

            {/* Selection indicator */}
            {selectedFighter?.id === fighter.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-accent/20 rounded-xl">
                <span className="font-bebas text-2xl text-accent animate-pulse">
                  SELECTED!
                </span>
              </div>
            )}

            {/* Hover menacing */}
            <div className="absolute -top-2 -right-2 text-menacing text-lg opacity-0 group-hover:opacity-70 transition-opacity animate-menacing">
              ゴ
            </div>
          </button>
        ))}
      </div>

      {/* Floating symbols */}
      <div className="absolute top-10 left-10 text-destructive text-4xl animate-menacing opacity-40">ゴ</div>
      <div className="absolute bottom-20 right-10 text-primary text-5xl animate-menacing opacity-30" style={{ animationDelay: "0.5s" }}>ゴ</div>
    </div>
  );
}
