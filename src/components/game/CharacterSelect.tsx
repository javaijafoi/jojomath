import { Character, characters } from "@/data/gameData";
import { Button } from "@/components/ui/button";
import { MenacingText } from "./MenacingText";
import { cn } from "@/lib/utils";

interface CharacterSelectProps {
  onSelect: (character: Character) => void;
}

export function CharacterSelect({ onSelect }: CharacterSelectProps) {
  const playableCharacters = characters.filter(c => c.isPlayable);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 speed-lines opacity-10" />

      <div className="relative z-10 text-center space-y-8 w-full max-w-4xl">
        <MenacingText size="lg" className="text-primary">
          SELECT YOUR RIDER
        </MenacingText>

        <p className="text-muted-foreground font-russo">
          Choose your character for the Steel Ball Run!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {playableCharacters.map((character, idx) => (
            <button
              key={character.id}
              onClick={() => onSelect(character)}
              className={cn(
                "p-6 rounded-lg border-2 transition-all duration-300",
                "bg-card hover:bg-muted",
                "border-border hover:border-primary",
                "hover:scale-105 hover:shadow-lg hover:shadow-primary/20",
                "group dramatic-enter"
              )}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Avatar */}
              <div className="text-6xl mb-4">{character.avatar}</div>

              {/* Name */}
              <h3 className="font-bebas text-2xl text-foreground group-hover:text-primary transition-colors">
                {character.name}
              </h3>

              {/* Stand */}
              <div 
                className="mt-2 px-3 py-1 rounded-full text-sm font-russo"
                style={{ 
                  backgroundColor: `${character.stand.color}20`,
                  color: character.stand.color,
                  border: `1px solid ${character.stand.color}50`
                }}
              >
                {character.stand.name}
              </div>

              {/* Stand description */}
              <p className="mt-3 text-xs text-muted-foreground font-russo">
                {character.stand.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
