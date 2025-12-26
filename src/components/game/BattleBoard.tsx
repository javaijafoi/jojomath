import { useState, useEffect, useRef, useCallback } from "react";
import { 
  Fighter, 
  MathProblem, 
  MAX_COMBO_FOR_SPECIAL,
  BATTLE_QUESTION_DURATION,
  JOHNNY_QUICK_ANSWER_WINDOW,
  JOHNNY_QUICK_DAMAGE_BONUS,
  JOHNNY_QUICK_METER_BONUS,
  VALENTINE_DAMAGE_REDUCTION,
  GYRO_HARD_OPERATION_BONUS,
} from "@/data/battleData";
import { correctAnswerQuotes, wrongAnswerQuotes } from "@/data/gameData";
import { HealthBar } from "./HealthBar";
import { BattleStage } from "./BattleStage";
import { StandCard } from "./StandCard";
import { OperationBadge } from "./OperationBadge";
import { AnswerButton } from "./AnswerButton";
import { Timer } from "./Timer";
import { FeedbackOverlay } from "./FeedbackOverlay";
import { cn } from "@/lib/utils";

interface BattleBoardProps {
  player: Fighter;
  cpu: Fighter;
  playerHp: number;
  cpuHp: number;
  playerMaxHp: number;
  cpuMaxHp: number;
  problem: MathProblem;
  round: number;
  combo: number;
  specialMeter: number;
  isSpecialReady: boolean;
  isAnswering: boolean;
  lastAction: "attack" | "damage" | "special" | "idle";
  onSubmitAnswer: (answer: number) => void;
  onNextRound: () => void;
  onTimeUp: () => void;
}

export function BattleBoard({
  player,
  cpu,
  playerHp,
  cpuHp,
  playerMaxHp,
  cpuMaxHp,
  problem,
  round,
  combo,
  specialMeter,
  isSpecialReady,
  isAnswering,
  lastAction,
  onSubmitAnswer,
  onNextRound,
  onTimeUp,
}: BattleBoardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<"correct" | "wrong" | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [shakeScreen, setShakeScreen] = useState(false);
  const [feedbackQuote, setFeedbackQuote] = useState("");
  
  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnsweredRef = useRef(false);

  const clearFeedbackTimeout = useCallback(() => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }
  }, []);

  const handleAnswer = useCallback((answer: number) => {
    if (isAnswering || showFeedback || hasAnsweredRef.current) return;
    
    hasAnsweredRef.current = true;
    clearFeedbackTimeout();
    
    const isCorrect = answer === problem.answer;
    setSelectedAnswer(answer);
    setAnswerState(isCorrect ? "correct" : "wrong");
    setShowFeedback(true);
    setFeedbackQuote(
      isCorrect 
        ? correctAnswerQuotes[Math.floor(Math.random() * correctAnswerQuotes.length)]
        : wrongAnswerQuotes[Math.floor(Math.random() * wrongAnswerQuotes.length)]
    );
    
    if (!isCorrect) {
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 500);
    }
    
    onSubmitAnswer(answer);
    
    feedbackTimeoutRef.current = setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setAnswerState(null);
      hasAnsweredRef.current = false;
      onNextRound();
    }, 1200);
  }, [isAnswering, showFeedback, problem.answer, onSubmitAnswer, onNextRound, clearFeedbackTimeout]);

  const handleTimeUp = useCallback(() => {
    if (isAnswering || showFeedback || hasAnsweredRef.current) return;
    
    hasAnsweredRef.current = true;
    clearFeedbackTimeout();
    
    setAnswerState("wrong");
    setShowFeedback(true);
    setFeedbackQuote(wrongAnswerQuotes[Math.floor(Math.random() * wrongAnswerQuotes.length)]);
    setShakeScreen(true);
    setTimeout(() => setShakeScreen(false), 500);
    
    onTimeUp();
    
    feedbackTimeoutRef.current = setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setAnswerState(null);
      hasAnsweredRef.current = false;
      onNextRound();
    }, 1200);
  }, [isAnswering, showFeedback, onTimeUp, onNextRound, clearFeedbackTimeout]);

  useEffect(() => {
    clearFeedbackTimeout();
    setSelectedAnswer(null);
    setAnswerState(null);
    setShowFeedback(false);
    hasAnsweredRef.current = false;
  }, [problem, round, clearFeedbackTimeout]);

  useEffect(() => {
    return () => clearFeedbackTimeout();
  }, [clearFeedbackTimeout]);

  const getButtonState = (option: number) => {
    if (selectedAnswer === option) {
      return answerState === "correct" ? "correct" : "wrong";
    }
    return "idle";
  };

  const getPerkLabel = (fighter: Fighter) => {
    switch (fighter.id) {
      case "johnny":
        return `Responda em ${JOHNNY_QUICK_ANSWER_WINDOW}s: +${JOHNNY_QUICK_DAMAGE_BONUS} dano e +${JOHNNY_QUICK_METER_BONUS} medidor`;
      case "gyro":
        return `×/÷: +${Math.round(GYRO_HARD_OPERATION_BONUS * 100)}% de dano`;
      case "valentine":
        return `Love Train: -${Math.round(VALENTINE_DAMAGE_REDUCTION * 100)}% dano recebido (HP alto)`;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "h-screen w-full flex flex-col bg-background overflow-hidden",
      shakeScreen && "animate-screen-shake"
    )}>
      {/* Top HUD - Health bars & timer */}
      <div className="relative flex-shrink-0 border-b border-primary/20 bg-gradient-to-b from-background/80 via-background/50 to-background/0 backdrop-blur-lg">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_10%_0%,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_90%_0%,rgba(239,68,68,0.18),transparent_35%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="max-w-6xl mx-auto px-3 md:px-4 pt-6 pb-4 space-y-3 relative">
          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 md:gap-6">
            <HealthBar 
              currentHp={playerHp} 
              maxHp={playerMaxHp} 
              isPlayer={true} 
              fighterName={player.name}
              showDamage={lastAction === "damage"}
            />
            
            <div className="relative flex flex-col items-center gap-2 px-3 py-2 rounded-xl border border-border/70 bg-card/80 backdrop-blur-md shadow-[0_12px_36px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_15%,transparent_25%),linear-gradient(300deg,rgba(255,255,255,0.08)_15%,transparent_25%)]" />
              <div className="absolute -inset-x-6 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              <div className="relative flex items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-russo tracking-[0.25em] text-primary bg-primary/10 border border-primary/30 shadow-inner">
                  ROUND {round}
                </span>
                <div className="px-3 py-1 rounded-full text-sm font-bebas tracking-[0.35em] text-foreground bg-gradient-to-r from-primary/30 to-secondary/30 border border-border/60 shadow-md">
                  VS
                </div>
              </div>
              <Timer 
                duration={BATTLE_QUESTION_DURATION} 
                onTimeUp={handleTimeUp}
                isPaused={isAnswering || showFeedback}
                resetKey={`${round}-${problem.cardA}-${problem.cardB}`}
                variant="arena"
              />
            </div>

            <HealthBar 
              currentHp={cpuHp} 
              maxHp={cpuMaxHp} 
              isPlayer={false} 
              fighterName={cpu.name}
              showDamage={lastAction === "attack"}
            />
          </div>

          <div className="grid grid-cols-1 gap-2 md:gap-3 text-[11px] md:text-xs font-russo text-muted-foreground">
            {/* Special meter */}
            <div className="relative overflow-hidden rounded-lg border border-border/70 bg-card/70 backdrop-blur-sm px-3 py-2 shadow-md">
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_10%,transparent_20%)]" />
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-sm text-[10px] uppercase tracking-[0.25em] bg-primary/10 border border-primary/30 text-primary">Special</span>
                  {isSpecialReady && (
                    <span className="font-bebas text-base text-accent animate-pulse">READY!</span>
                  )}
                </div>
                <div className="flex-1 relative h-3 bg-muted/40 rounded-full overflow-hidden border border-border/60">
                  <div 
                    className={cn(
                      "h-full transition-all duration-300",
                      isSpecialReady 
                        ? "bg-accent animate-pulse" 
                        : "bg-gradient-to-r from-accent/50 to-accent"
                    )}
                    style={{ width: `${(specialMeter / MAX_COMBO_FOR_SPECIAL) * 100}%` }}
                  />
                  <div className="absolute inset-0 opacity-50 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.22)_0,rgba(255,255,255,0.22)_12px,transparent_12px,transparent_18px)]" />
                </div>
              </div>
            </div>

            {/* Perk indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {getPerkLabel(player) && (
                <div className="flex items-center gap-2 bg-card/70 border border-border/60 rounded-md px-3 py-2 shadow-sm">
                  <span className="text-primary font-bebas text-sm tracking-wide">Player Perk</span>
                  <span className="text-foreground/80">{getPerkLabel(player)}</span>
                </div>
              )}
              {getPerkLabel(cpu) && (
                <div className="flex items-center gap-2 bg-card/70 border border-border/60 rounded-md px-3 py-2 shadow-sm">
                  <span className="text-destructive font-bebas text-sm tracking-wide">CPU Perk</span>
                  <span className="text-foreground/80">{getPerkLabel(cpu)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main battle area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 relative min-h-[150px] md:min-h-[200px]">
          <BattleStage
            player={player}
            cpu={cpu}
            playerHp={playerHp}
            cpuHp={cpuHp}
            lastAction={lastAction}
            combo={combo}
            isSpecialReady={isSpecialReady}
          />
        </div>

        {/* Math problem area */}
        <div className="flex-shrink-0 p-2 md:p-3">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-3">
            <StandCard stand={problem.standA} value={problem.cardA} size="sm" />
            <OperationBadge operation={problem.operation} />
            <StandCard stand={problem.standB} value={problem.cardB} size="sm" />
          </div>

          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
            {problem.options.map((option, index) => (
              <AnswerButton
                key={`${round}-${index}-${option}`}
                value={option}
                onClick={() => handleAnswer(option)}
                state={getButtonState(option)}
                index={index}
                disabled={isAnswering || showFeedback}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Feedback overlay */}
      {showFeedback && answerState && (
        <FeedbackOverlay state={answerState} quote={feedbackQuote} />
      )}
    </div>
  );
}
