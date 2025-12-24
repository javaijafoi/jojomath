import { TOTAL_RACE_DISTANCE, characters } from "@/data/gameData";
import { cn } from "@/lib/utils";

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

  return (
    <div className="w-full bg-card/40 rounded-lg p-2 border border-border/50 backdrop-blur-sm">
      {/* Compact race display */}
      <div className="flex items-center gap-2 mb-1.5">
        {/* Player info */}
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border-2 border-success shrink-0">
            <img 
              src={playerAvatar}
              alt={playerName}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <span className="text-xs font-russo text-foreground truncate">{playerName}</span>
          <span className="text-xs font-bebas text-success">{Math.round(playerProgress)}km</span>
        </div>

        {/* Diego info */}
        <div className="flex items-center gap-1.5 min-w-0 flex-1 justify-end">
          <span className="text-xs font-bebas text-destructive">{Math.round(cpuProgress)}km</span>
          <span className="text-xs font-russo text-foreground">Diego</span>
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border-2 border-destructive shrink-0">
            <img 
              src={diego.avatar}
              alt="Diego Brando"
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Race track - dual progress bars */}
      <div className="space-y-1">
        {/* Player progress */}
        <div className="relative h-3 bg-muted/60 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-success/80 to-success rounded-full transition-all duration-500"
            style={{ width: `${playerPercent}%` }}
          />
          {/* Avatar marker */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-500"
            style={{ left: `calc(${Math.max(playerPercent, 3)}% - 8px)` }}
          >
            <div className="w-4 h-4 rounded-full bg-success border border-background shadow-[0_0_8px_hsl(var(--success))]" />
          </div>
        </div>

        {/* Diego progress */}
        <div className="relative h-3 bg-muted/60 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-destructive/80 to-destructive rounded-full transition-all duration-500"
            style={{ width: `${cpuPercent}%` }}
          />
          {/* Avatar marker */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 transition-all duration-500"
            style={{ left: `calc(${Math.max(cpuPercent, 3)}% - 8px)` }}
          >
            <div className="w-4 h-4 rounded-full bg-destructive border border-background shadow-[0_0_8px_hsl(var(--destructive))]" />
          </div>
        </div>
      </div>

      {/* Distance markers */}
      <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-russo">
        <span>San Diego</span>
        <span>Nova York ({TOTAL_RACE_DISTANCE}km)</span>
      </div>
    </div>
  );
}
