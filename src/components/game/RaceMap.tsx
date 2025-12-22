import { raceStages, TOTAL_RACE_DISTANCE, characters, encouragementQuotes, diegoTaunts } from "@/data/gameData";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface RaceMapProps {
  playerProgress: number;
  cpuProgress: number;
  playerName: string;
  playerAvatar: string;
}

export function RaceMap({ 
  playerProgress, 
  cpuProgress, 
  playerName,
  playerAvatar 
}: RaceMapProps) {
  const playerPercent = Math.min((playerProgress / TOTAL_RACE_DISTANCE) * 100, 100);
  const cpuPercent = Math.min((cpuProgress / TOTAL_RACE_DISTANCE) * 100, 100);
  const diego = characters.find(c => c.id === "diego")!;
  
  const [quote, setQuote] = useState("");

  // Citação aleatória que muda periodicamente
  useEffect(() => {
    const updateQuote = () => {
      const quotes = cpuPercent > playerPercent ? diegoTaunts : encouragementQuotes;
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    };
    updateQuote();
    const interval = setInterval(updateQuote, 5000);
    return () => clearInterval(interval);
  }, [playerPercent, cpuPercent]);

  return (
    <div className="w-full bg-card/60 rounded-xl p-4 border-2 border-primary/30 backdrop-blur-sm">
      {/* Quote */}
      <div className="text-center mb-3">
        <p className="text-sm font-russo text-accent italic">{quote}</p>
      </div>

      {/* Race track */}
      <div className="relative h-28 bg-muted/80 rounded-2xl overflow-visible mb-2 border-2 border-border">
        {/* Track background gradient */}
        <div 
          className="absolute inset-0 opacity-30 rounded-2xl"
          style={{
            background: "linear-gradient(90deg, hsl(330 85% 60% / 0.4), hsl(180 80% 50% / 0.4), hsl(45 100% 55% / 0.4))"
          }}
        />

        {/* Stage markers - simplified */}
        {raceStages.filter((_, i) => i === 0 || i === raceStages.length - 1).map((stage, idx) => {
          const percent = (stage.distance / TOTAL_RACE_DISTANCE) * 100;
          return (
            <div
              key={stage.id}
              className="absolute top-full w-0.5 h-2 bg-border/50"
              style={{ left: `${percent}%` }}
            >
              <div 
                className={cn(
                  "absolute top-2 transform text-xs whitespace-nowrap font-russo",
                  idx === 0 ? "left-0" : "-translate-x-full"
                )}
              >
                <span className="text-muted-foreground text-[10px]">{stage.name}</span>
              </div>
            </div>
          );
        })}

        {/* Player marker - GRANDE */}
        <div
          className={cn(
            "absolute top-2 transition-all duration-500 ease-out"
          )}
          style={{ left: `calc(${playerPercent}% - 28px)` }}
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-success race-glow bg-card">
              <img 
                src={playerAvatar}
                alt={playerName}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-full animate-pulse"
              style={{ boxShadow: "0 0 20px hsl(var(--success))" }}
            />
          </div>
        </div>

        {/* CPU (Diego) marker - GRANDE */}
        <div
          className={cn(
            "absolute bottom-2 transition-all duration-500 ease-out"
          )}
          style={{ left: `calc(${cpuPercent}% - 28px)` }}
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-destructive enemy-glow bg-card">
              <img 
                src={diego.avatar}
                alt="Diego Brando"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) parent.innerHTML = '<span class="text-3xl flex items-center justify-center h-full">🦖</span>';
                }}
              />
            </div>
            {/* Menacing effect for Diego */}
            <div className="absolute -top-2 -right-2 text-lg animate-menacing text-destructive">
              ゴ
            </div>
          </div>
        </div>
      </div>

      {/* Simplified legend with avatars */}
      <div className="flex justify-between text-sm mt-6 font-russo">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-success">
            <img src={playerAvatar} alt="" className="w-full h-full object-cover object-top" />
          </div>
          <span className="text-foreground text-sm">{playerName}</span>
          <span className="text-success font-bold">{Math.round(playerProgress)} km</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-destructive font-bold">{Math.round(cpuProgress)} km</span>
          <span className="text-foreground text-sm">Diego</span>
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-destructive">
            <img src={diego.avatar} alt="" className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>
    </div>
  );
}
