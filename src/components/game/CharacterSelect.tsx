import { Character, characters } from "@/data/gameData";
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
      <div className="absolute inset-0 speed-lines opacity-15" />
      <div className="absolute inset-0 diagonal-lines" />

      <div className="relative z-10 text-center space-y-8 w-full max-w-5xl">
        <MenacingText size="lg" className="text-primary">
          ESCOLHA SEU CORREDOR
        </MenacingText>

        <p className="text-muted-foreground font-russo text-lg">
          「Quem vai encarar a Steel Ball Run?」
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {playableCharacters.map((character, idx) => (
            <button
              key={character.id}
              onClick={() => onSelect(character)}
              className={cn(
                "p-6 rounded-lg border-2 transition-all duration-300",
                "bg-card/80 hover:bg-card backdrop-blur-sm",
                "border-border hover:border-primary",
                "hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]",
                "group dramatic-enter relative overflow-hidden"
              )}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Avatar */}
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-muted group-hover:border-primary transition-colors">
                <img 
                  src={character.avatar} 
                  alt={character.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback to emoji if image fails
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 flex items-center justify-center text-6xl bg-muted">
                  {character.id === 'johnny' ? '🏇' : character.id === 'gyro' ? '🎱' : '✝️'}
                </div>
              </div>

              {/* Name */}
              <h3 className="font-bebas text-2xl text-foreground group-hover:text-primary transition-colors relative z-10">
                {character.name}
              </h3>

              {/* Stand badge */}
              <div 
                className="mt-3 px-4 py-1.5 rounded-full text-sm font-russo inline-block"
                style={{ 
                  backgroundColor: `${character.stand.color}30`,
                  color: character.stand.color,
                  border: `2px solid ${character.stand.color}`,
                  boxShadow: `0 0 15px ${character.stand.color}40`
                }}
              >
                {character.stand.name}
              </div>

              {/* Quote */}
              <p className="mt-4 text-xs text-muted-foreground font-russo italic leading-relaxed">
                「{character.quote}」
              </p>

              {/* Menacing on hover */}
              <div className="absolute -top-2 -right-2 text-menacing text-2xl opacity-0 group-hover:opacity-70 animate-menacing">
                ゴ
              </div>
            </button>
          ))}
        </div>

        {/* VS Diego indicator */}
        <div className="mt-8 p-4 bg-destructive/20 rounded-lg border border-destructive/50 max-w-md mx-auto">
          <p className="font-bebas text-lg text-destructive">
            VS DIEGO BRANDO
          </p>
          <p className="text-sm text-muted-foreground font-russo">
            「WRYYYYY! Eu serei o vencedor desta corrida!」
          </p>
        </div>
      </div>

      {/* Menacing symbols */}
      <div className="absolute top-20 left-10 text-menacing text-4xl animate-menacing opacity-40">ゴ</div>
      <div className="absolute bottom-20 right-10 text-primary text-5xl animate-menacing opacity-35" style={{ animationDelay: "0.7s" }}>ゴ</div>
    </div>
  );
}
