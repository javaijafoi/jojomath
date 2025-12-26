import { useState, useEffect, useRef, useCallback } from "react";
import { Fighter, MathProblem, MAX_COMBO_FOR_SPECIAL } from "@/data/battleData";
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

  return (
    <div className={cn(
      "h-screen w-full flex flex-col bg-background overflow-hidden",
      shakeScreen && "animate-screen-shake"
    )}>
      {/* Top HUD - Health bars */}
      <div className="flex-shrink-0 p-2 md:p-3 bg-card/50 backdrop-blur-sm border-b border-primary/20">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <HealthBar 
            currentHp={playerHp} 
            maxHp={playerMaxHp} 
            isPlayer={true} 
            fighterName={player.name}
            showDamage={lastAction === "damage"}
          />
          <div className="flex-shrink-0 px-2">
            <span className="font-bebas text-xl text-muted-foreground">VS</span>
          </div>
          <HealthBar 
            currentHp={cpuHp} 
            maxHp={cpuMaxHp} 
            isPlayer={false} 
            fighterName={cpu.name}
            showDamage={lastAction === "attack"}
          />
        </div>
        
        {/* Special meter */}
        <div className="max-w-4xl mx-auto mt-2">
          <div className="flex items-center gap-2">
            <span className="font-russo text-xs text-muted-foreground">SPECIAL:</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-300",
                  isSpecialReady 
                    ? "bg-accent animate-pulse" 
                    : "bg-gradient-to-r from-accent/50 to-accent"
                )}
                style={{ width: `${(specialMeter / MAX_COMBO_FOR_SPECIAL) * 100}%` }}
              />
            </div>
            {isSpecialReady && (
              <span className="font-bebas text-sm text-accent animate-pulse">READY!</span>
            )}
          </div>
        </div>
      </div>

      {/* Timer */}
      <Timer 
        duration={12} 
        onTimeUp={handleTimeUp}
        isPaused={isAnswering || showFeedback}
        key={`${round}-${problem.cardA}-${problem.cardB}`}
      />

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

      {/* Round indicator */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2">
        <span className="font-russo text-xs text-muted-foreground bg-background/80 px-3 py-1 rounded-full">
          Round {round}
        </span>
      </div>

      {/* Feedback overlay */}
      {showFeedback && answerState && (
        <FeedbackOverlay state={answerState} quote={feedbackQuote} />
      )}
    </div>
  );
}
