import { useState, useEffect } from "react";
import { Character, getRandomPlayableCharacters } from "@/data/gameData";
import { MenacingText } from "./MenacingText";
import { cn } from "@/lib/utils";

interface CharacterSelectProps {
  onSelect: (character: Character) => void;
}

export function CharacterSelect({ onSelect }: CharacterSelectProps) {
  // Sorteia 4 personagens aleatórios a cada vez que abre
  const [availableCharacters, setAvailableCharacters] = useState<Character[]>([]);

  useEffect(() => {
    setAvailableCharacters(getRandomPlayableCharacters(4));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background - mais sutil */}
      <div className="absolute inset-0 speed-lines opacity-10" />
      <div className="absolute inset-0 diagonal-lines opacity-50" />

      <div className="relative z-10 text-center space-y-6 w-full max-w-6xl">
        <MenacingText size="lg" className="text-primary">
          ESCOLHA SEU CORREDOR
        </MenacingText>

        <p className="text-muted-foreground font-russo text-base">
          「Quem vai encarar a Steel Ball Run?」
        </p>

        {/* Grid de personagens - FOCO NAS IMAGENS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {availableCharacters.map((character, idx) => (
            <button
              key={character.id}
              onClick={() => onSelect(character)}
              className={cn(
                "relative rounded-xl overflow-hidden transition-all duration-300",
                "border-4 border-transparent hover:border-primary",
                "hover:scale-105 hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)]",
                "group dramatic-enter aspect-[3/4]"
              )}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Character Image - FULL COVERAGE */}
              <img 
                src={character.avatar} 
                alt={character.name}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"
              />

              {/* Character info at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <h3 className="font-bebas text-xl md:text-2xl text-white drop-shadow-lg">
                  {character.name}
                </h3>
                <p 
                  className="text-xs font-russo"
                  style={{ color: character.stand.color }}
                >
                  {character.stand.name}
                </p>
              </div>

              {/* Quote on hover */}
              <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-russo text-sm italic text-center">
                  「{character.quote}」
                </p>
              </div>

              {/* Menacing on hover */}
              <div className="absolute top-2 right-2 text-menacing text-2xl opacity-0 group-hover:opacity-80 animate-menacing">
                ゴ
              </div>

              {/* Stand color accent */}
              <div 
                className="absolute top-0 left-0 w-full h-1"
                style={{ backgroundColor: character.stand.color }}
              />
            </button>
          ))}
        </div>

        {/* VS Diego - mais compacto */}
        <div className="mt-6 flex items-center justify-center gap-4 p-3 bg-destructive/10 rounded-lg border border-destructive/30 max-w-sm mx-auto">
          <img 
            src="https://static.jojowiki.com/images/thumb/e/ef/latest/20191015214412/Diego_Brando_Infobox_Manga.png/270px-Diego_Brando_Infobox_Manga.png"
            alt="Diego"
            className="w-16 h-16 rounded-full object-cover object-top border-2 border-destructive"
          />
          <div className="text-left">
            <p className="font-bebas text-lg text-destructive">VS DIEGO BRANDO</p>
            <p className="text-xs text-muted-foreground font-russo italic">
              「WRYYYYY!」
            </p>
          </div>
        </div>
      </div>

      {/* Floating menacing symbols */}
      <div className="absolute top-10 left-6 text-menacing text-3xl animate-menacing opacity-30">ゴ</div>
      <div className="absolute bottom-10 right-6 text-primary text-4xl animate-menacing opacity-25" style={{ animationDelay: "0.5s" }}>ゴ</div>
    </div>
  );
}
