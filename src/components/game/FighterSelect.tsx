import { useState, useEffect } from "react";
import { Fighter, getRandomFighters, JOHNNY_QUICK_ANSWER_WINDOW, JOHNNY_QUICK_DAMAGE_BONUS, JOHNNY_QUICK_METER_BONUS, VALENTINE_DAMAGE_REDUCTION, GYRO_HARD_OPERATION_BONUS } from "@/data/battleData";
import { cn } from "@/lib/utils";
import { MenacingText } from "./MenacingText";

interface FighterSelectProps {
  onSelect: (fighter: Fighter) => void;
}

export function FighterSelect({ onSelect }: FighterSelectProps) {
  const [availableFighters, setAvailableFighters] = useState<Fighter[]>([]);
  const [selectedFighter, setSelectedFighter] = useState<Fighter | null>(null);
  const [focusedFighter, setFocusedFighter] = useState<Fighter | null>(null);

  useEffect(() => {
    const fighters = getRandomFighters(6);
    setAvailableFighters(fighters);
    setFocusedFighter(fighters[0] ?? null);
  }, []);

  const handleSelect = (fighter: Fighter) => {
    setSelectedFighter(fighter);
    setFocusedFighter(fighter);
    setTimeout(() => onSelect(fighter), 500);
  };

  const getPerkBadge = (fighter: Fighter) => {
    switch (fighter.id) {
      case "johnny":
        return `Rápido (${JOHNNY_QUICK_ANSWER_WINDOW}s): +${JOHNNY_QUICK_DAMAGE_BONUS} dano / +${JOHNNY_QUICK_METER_BONUS} medidor`;
      case "gyro":
        return `×/÷: +${Math.round(GYRO_HARD_OPERATION_BONUS * 100)}% dano`;
      case "valentine":
        return `Love Train: -${Math.round(VALENTINE_DAMAGE_REDUCTION * 100)}% dano recebido`;
      default:
        return null;
    }
  };

  const maxHp = Math.max(...availableFighters.map((f) => f.maxHp), 1);
  const maxAtk = Math.max(...availableFighters.map((f) => f.attackPower), 1);
  const spotlightFighter = focusedFighter ?? availableFighters[0] ?? null;
  const selectionLocked = selectedFighter !== null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background/80 to-background/60 text-foreground">
      <div className="absolute inset-0 speed-lines opacity-10" />
      <div className="absolute inset-0 pointer-events-none mix-blend-screen" style={{ background: "radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.2), transparent 35%), radial-gradient(circle at 80% 0%, hsl(var(--accent) / 0.25), transparent 40%), radial-gradient(circle at 50% 80%, hsl(var(--destructive) / 0.18), transparent 45%)" }} />
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: "linear-gradient(120deg, transparent 0%, transparent 45%, rgba(255,255,255,0.08) 50%, transparent 55%, transparent 100%)", backgroundSize: "18px 18px" }} />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.08),transparent_45%)]" />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 py-10 lg:py-14 max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-8 dramatic-enter">
          <MenacingText size="md" className="text-destructive drop-shadow-[0_0_25px_hsl(var(--destructive)/0.45)]">
            CHOOSE YOUR FIGHTER
          </MenacingText>
          <p className="font-russo text-muted-foreground mt-2">
            Selecione seu lutador para a batalha!
          </p>
        </div>

        <div className="grid gap-8 lg:gap-6 lg:grid-cols-[1.2fr_1fr] w-full">
          <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-card/70 via-card/40 to-card/20 backdrop-blur-xl overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-0 opacity-25 pointer-events-none" style={{ background: "linear-gradient(135deg, transparent 55%, hsl(var(--primary)/0.6) 65%, transparent 75%), linear-gradient(-135deg, transparent 55%, hsl(var(--accent)/0.6) 65%, transparent 75%)" }} />
            <div className="absolute -right-16 -top-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-russo text-xs uppercase tracking-[0.2em] text-primary/70">Roaster</p>
                  <h2 className="font-bebas text-2xl text-primary drop-shadow-[0_2px_12px_hsl(var(--primary)/0.4)]">Lutadores Disponíveis</h2>
                </div>
                <div className="px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary font-bebas text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span>{availableFighters.length} fighters</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-3">
                {availableFighters.map((fighter, index) => (
                  <button
                    key={fighter.id}
                    onClick={() => handleSelect(fighter)}
                    onMouseEnter={() => setFocusedFighter(fighter)}
                    onFocus={() => setFocusedFighter(fighter)}
                    disabled={selectionLocked}
                    className={cn(
                      "group relative flex items-center gap-4 p-3 rounded-xl border transition-all duration-300",
                      "bg-gradient-to-r from-card/70 to-card/30 hover:from-primary/10 hover:to-primary/0",
                      "border-primary/25 hover:border-primary/70 hover:shadow-[0_0_20px_hsl(var(--primary)/0.35)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      "active:scale-[0.99]",
                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:border-muted/30 disabled:scale-100",
                      selectedFighter?.id === fighter.id
                        ? "border-accent shadow-[0_0_25px_hsl(var(--accent)/0.45)] ring-4 ring-accent/30 scale-[1.02]"
                        : focusedFighter?.id === fighter.id
                        ? "border-primary/70"
                        : "",
                      "dramatic-enter"
                    )}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-primary/40 to-transparent blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-20 h-24 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 via-card/60 to-accent/10 border border-primary/30">
                        <img
                          src={fighter.avatar}
                          alt={fighter.name}
                          className="w-16 h-20 object-contain drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                        />
                      </div>
                    </div>

                    <div className="flex-1 space-y-1 text-left min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <h3 className="font-bebas text-xl text-primary tracking-wide truncate max-w-[160px]">{fighter.name}</h3>
                        {getPerkBadge(fighter) && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 border border-accent/50 text-accent font-russo line-clamp-1">
                            Perk
                          </span>
                        )}
                      </div>
                      <p className="font-russo text-xs text-secondary truncate max-w-[180px]">{fighter.stand}</p>
                      <p className="font-russo text-[11px] text-muted-foreground line-clamp-2 leading-relaxed max-w-[240px]">{fighter.specialAbility}</p>
                      <div className="flex items-center gap-3 text-[10px] font-russo flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-gyro/15 text-gyro border border-gyro/40">HP {fighter.maxHp}</span>
                        <span className="px-2 py-0.5 rounded bg-destructive/15 text-destructive border border-destructive/40">ATK {fighter.attackPower}</span>
                      </div>
                    </div>

                    <div className="absolute -top-2 -right-2 text-menacing text-lg opacity-0 group-hover:opacity-70 transition-opacity animate-menacing">
                      ゴ
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  className={cn(
                    "group relative overflow-hidden rounded-xl border-2 border-primary/50 px-3 py-3 font-bebas text-lg tracking-wide",
                    "bg-gradient-to-br from-primary/20 via-primary/10 to-card/50 hover:from-primary/30 hover:to-primary/15 transition-all duration-300",
                    "shadow-[0_0_25px_hsl(var(--primary)/0.35)] disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "active:scale-[0.98] disabled:scale-100"
                  )}
                  onClick={() => spotlightFighter && handleSelect(spotlightFighter)}
                  disabled={!spotlightFighter || selectionLocked}
                >
                  <span className="relative z-10">Select</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-500" />
                </button>
                <button
                  className={cn(
                    "group relative overflow-hidden rounded-xl border-2 border-accent/60 px-3 py-3 font-bebas text-lg tracking-wide",
                    "bg-gradient-to-br from-accent/30 via-accent/15 to-card/50 hover:from-accent/40 hover:to-accent/20 transition-all duration-300",
                    "shadow-[0_0_30px_hsl(var(--accent)/0.35)] disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "active:scale-[0.98] disabled:scale-100"
                  )}
                  onClick={() => {
                    if (selectionLocked || availableFighters.length === 0) return;
                    const randomFighter = availableFighters[Math.floor(Math.random() * availableFighters.length)];
                    handleSelect(randomFighter);
                  }}
                  disabled={availableFighters.length === 0 || selectionLocked}
                >
                  <span className="relative z-10">Random</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-500" />
                </button>
                <button
                  className={cn(
                    "group relative overflow-hidden rounded-xl border-2 border-gyro/70 px-3 py-3 font-bebas text-lg tracking-wide",
                    "bg-gradient-to-br from-gyro/25 via-gyro/15 to-card/50 hover:from-gyro/35 hover:to-gyro/20 transition-all duration-300",
                    "shadow-[0_0_30px_hsl(var(--gyro)/0.3)] disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gyro/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "active:scale-[0.98] disabled:scale-100"
                  )}
                  onClick={() => spotlightFighter && handleSelect(spotlightFighter)}
                  disabled={!spotlightFighter || selectionLocked}
                >
                  <span className="relative z-10">Ready</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-white/10 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-500" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl border border-accent/30 bg-gradient-to-br from-card/80 via-card/60 to-card/20 backdrop-blur-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle at 20% 30%, hsl(var(--accent) / 0.35), transparent 40%), radial-gradient(circle at 80% 40%, hsl(var(--primary) / 0.25), transparent 45%)" }} />
            <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_0%,transparent_45%,rgba(255,255,255,0.12)_55%,transparent_65%,transparent_100%)] opacity-50 pointer-events-none" />
            <div className="relative p-6 h-full flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-russo text-xs uppercase tracking-[0.2em] text-accent/70">Spotlight</p>
                  <h2 className="font-bebas text-2xl text-accent drop-shadow-[0_2px_15px_hsl(var(--accent)/0.45)]">Perfil do Lutador</h2>
                </div>
                {spotlightFighter && (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/50 font-russo text-xs text-accent">
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                    Selecionado
                  </div>
                )}
              </div>

              {spotlightFighter ? (
                <div className="relative flex-1 flex flex-col gap-4 min-w-0">
                  <div className="relative overflow-hidden rounded-xl border border-accent/40 bg-gradient-to-br from-card/80 to-card/30 shadow-[0_0_30px_hsl(var(--accent)/0.35)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--primary)/0.25),transparent_40%)]" />
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)" }} />
                    <div className="relative flex flex-col items-center gap-3 p-5">
                      <img
                        src={spotlightFighter.avatar}
                        alt={spotlightFighter.name}
                        className="w-44 h-52 object-contain drop-shadow-[0_0_35px_hsl(var(--accent)/0.55)]"
                      />
                      <div className="text-center space-y-1">
                        <h3 className="font-bebas text-3xl text-accent tracking-wide line-clamp-1 max-w-[320px] mx-auto">{spotlightFighter.name}</h3>
                        <p className="font-russo text-sm text-secondary line-clamp-1 max-w-[260px] mx-auto">{spotlightFighter.stand}</p>
                        <p className="font-russo text-xs text-muted-foreground line-clamp-3 max-w-[360px] mx-auto">{spotlightFighter.specialAbility}</p>
                        {getPerkBadge(spotlightFighter) && (
                          <p className="inline-flex items-center gap-2 font-russo text-xs text-accent bg-accent/10 border border-accent/40 rounded-full px-3 py-1 line-clamp-2 text-center">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            {getPerkBadge(spotlightFighter)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-bebas text-lg text-gyro drop-shadow-[0_2px_10px_hsl(var(--gyro)/0.4)]">HP</span>
                      <div className="flex-1 h-4 rounded-full border border-gyro/50 bg-gyro/15 overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-gyro via-primary to-white/80 shadow-[0_0_20px_hsl(var(--gyro)/0.45)] transition-all duration-500"
                          style={{ width: `${Math.min((spotlightFighter.maxHp / maxHp) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="font-russo text-xs text-gyro px-2 py-1 rounded bg-gyro/15 border border-gyro/40">{spotlightFighter.maxHp}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bebas text-lg text-destructive drop-shadow-[0_2px_10px_hsl(var(--destructive)/0.45)]">ATK</span>
                      <div className="flex-1 h-4 rounded-full border border-destructive/50 bg-destructive/15 overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-destructive via-accent to-white/80 shadow-[0_0_20px_hsl(var(--destructive)/0.45)] transition-all duration-500"
                          style={{ width: `${Math.min((spotlightFighter.attackPower / maxAtk) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="font-russo text-xs text-destructive px-2 py-1 rounded bg-destructive/15 border border-destructive/40">{spotlightFighter.attackPower}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-card/50 to-accent/10 shadow-[0_0_20px_hsl(var(--primary)/0.25)]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/60 flex items-center justify-center text-primary text-xl font-bebas">
                        VS
                      </div>
                      <div>
                        <p className="font-russo text-xs uppercase tracking-[0.2em] text-muted-foreground">Status</p>
                        <p className="font-bebas text-xl text-primary drop-shadow-[0_1px_10px_hsl(var(--primary)/0.4)]">
                          Preparar para a batalha
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-russo text-[11px] text-muted-foreground">Selecione e confirme o lutador</p>
                      <p className="font-bebas text-lg text-accent">⚡ Ação Imediata</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-20 h-20 rounded-full border-2 border-dashed border-primary/40 flex items-center justify-center text-primary text-3xl animate-pulse">
                    ?
                  </div>
                  <p className="font-bebas text-2xl text-muted-foreground">Nenhum lutador carregado</p>
                  <p className="font-russo text-sm text-muted-foreground">Aguarde um instante enquanto reunimos os candidatos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-12 left-10 text-destructive text-4xl animate-menacing opacity-40">ゴ</div>
      <div className="absolute bottom-20 right-10 text-primary text-5xl animate-menacing opacity-30" style={{ animationDelay: "0.5s" }}>ゴ</div>
    </div>
  );
}
