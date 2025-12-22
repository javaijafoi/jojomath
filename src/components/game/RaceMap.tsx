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
    <div className="w-full bg-card rounded-lg p-4 border border-border">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bebas text-xl text-primary">Steel Ball Run</h3>
        <span className="text-muted-foreground text-sm">
          San Diego → New York
        </span>
      </div>

      {/* Race track */}
      <div className="relative h-16 bg-muted rounded-full overflow-hidden mb-4">
        {/* Stage markers */}
        {raceStages.map((stage, idx) => {
          const percent = (stage.distance / TOTAL_RACE_DISTANCE) * 100;
          return (
            <div
              key={stage.id}
              className="absolute top-0 bottom-0 w-0.5 bg-border"
              style={{ left: `${percent}%` }}
            >
              <div 
                className={cn(
                  "absolute -bottom-6 transform -translate-x-1/2 text-xs whitespace-nowrap",
                  idx === 0 && "translate-x-0",
                  idx === raceStages.length - 1 && "-translate-x-full"
                )}
              >
                <span className="text-muted-foreground">{stage.name}</span>
              </div>
            </div>
          );
        })}

        {/* Track background gradient */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(90deg, hsl(35, 50%, 40%), hsl(35, 40%, 30%), hsl(210, 30%, 40%))"
          }}
        />

        {/* Player marker */}
        <div
          className={cn(
            "absolute top-1 h-6 w-8 flex items-center justify-center",
            "text-lg transition-all duration-500 ease-out race-glow rounded-full bg-success"
          )}
          style={{ left: `calc(${playerPercent}% - 16px)` }}
        >
          {playerEmoji}
        </div>

        {/* CPU marker */}
        <div
          className={cn(
            "absolute bottom-1 h-6 w-8 flex items-center justify-center",
            "text-lg transition-all duration-500 ease-out enemy-glow rounded-full bg-destructive"
          )}
          style={{ left: `calc(${cpuPercent}% - 16px)` }}
        >
          🦖
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between text-sm mt-8">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-success race-glow" />
          <span>{playerName}</span>
          <span className="text-muted-foreground">({Math.round(playerProgress)} km)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-destructive enemy-glow" />
          <span>Diego Brando</span>
          <span className="text-muted-foreground">({Math.round(cpuProgress)} km)</span>
        </div>
      </div>
    </div>
  );
}
