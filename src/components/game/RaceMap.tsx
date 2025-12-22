import { raceStages, TOTAL_RACE_DISTANCE } from "@/data/gameData";
import { cn } from "@/lib/utils";

interface RaceMapProps {
  playerProgress: number;
  cpuProgress: number;
  playerName: string;
  playerEmoji: string;
}

export function RaceMap({ 
  playerProgress, 
  cpuProgress, 
  playerName,
  playerEmoji 
}: RaceMapProps) {
  const playerPercent = Math.min((playerProgress / TOTAL_RACE_DISTANCE) * 100, 100);
  const cpuPercent = Math.min((cpuProgress / TOTAL_RACE_DISTANCE) * 100, 100);

  return (
    <div className="w-full bg-card/80 rounded-lg p-4 border-2 border-primary/30 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bebas text-xl text-accent">Steel Ball Run</h3>
        <span className="text-muted-foreground text-sm font-russo">
          San Diego → Nova York
        </span>
      </div>

      {/* Race track */}
      <div className="relative h-20 bg-muted rounded-full overflow-hidden mb-4 border-2 border-border">
        {/* Stage markers */}
        {raceStages.map((stage, idx) => {
          const percent = (stage.distance / TOTAL_RACE_DISTANCE) * 100;
          return (
            <div
              key={stage.id}
              className="absolute top-0 bottom-0 w-0.5 bg-border/50"
              style={{ left: `${percent}%` }}
            >
              <div 
                className={cn(
                  "absolute -bottom-7 transform -translate-x-1/2 text-xs whitespace-nowrap font-russo",
                  idx === 0 && "translate-x-0",
                  idx === raceStages.length - 1 && "-translate-x-full"
                )}
              >
                <span className="text-muted-foreground">{stage.name}</span>
              </div>
            </div>
          );
        })}

        {/* Track background gradient - JoJo colors */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: "linear-gradient(90deg, hsl(330 85% 60% / 0.3), hsl(180 80% 50% / 0.3), hsl(45 100% 55% / 0.3))"
          }}
        />

        {/* Player marker */}
        <div
          className={cn(
            "absolute top-2 h-7 w-10 flex items-center justify-center",
            "text-lg transition-all duration-500 ease-out race-glow rounded-full bg-success border-2 border-success"
          )}
          style={{ left: `calc(${playerPercent}% - 20px)` }}
        >
          <img 
            src={playerEmoji}
            alt="player"
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) parent.textContent = '🏇';
            }}
          />
        </div>

        {/* CPU marker */}
        <div
          className={cn(
            "absolute bottom-2 h-7 w-10 flex items-center justify-center",
            "text-lg transition-all duration-500 ease-out enemy-glow rounded-full bg-destructive border-2 border-destructive"
          )}
          style={{ left: `calc(${cpuPercent}% - 20px)` }}
        >
          🦖
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between text-sm mt-8 font-russo">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-success race-glow border border-success" />
          <span className="text-foreground">{playerName}</span>
          <span className="text-muted-foreground">({Math.round(playerProgress)} km)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-destructive enemy-glow border border-destructive" />
          <span className="text-foreground">Diego Brando</span>
          <span className="text-muted-foreground">({Math.round(cpuProgress)} km)</span>
        </div>
      </div>
    </div>
  );
}
