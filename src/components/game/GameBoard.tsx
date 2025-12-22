import { useEffect, useState } from "react";
import { Character, MathProblem } from "@/data/gameData";
import { StandCard } from "./StandCard";
import { OperationBadge } from "./OperationBadge";
import { AnswerButton } from "./AnswerButton";
import { RaceMap } from "./RaceMap";
import { Timer } from "./Timer";
import { MenacingText } from "./MenacingText";
import { cn } from "@/lib/utils";

interface GameBoardProps {
  player: Character;
  problem: MathProblem;
  playerProgress: number;
  cpuProgress: number;
  round: number;
  correctAnswers: number;
  wrongAnswers: number;
  isAnswering: boolean;
  onSubmitAnswer: (answer: number) => void;
  onNextRound: () => void;
  onTimeUp: () => void;
}

const ROUND_TIME = 15; // seconds per round

export function GameBoard({
  player,
  problem,
  playerProgress,
  cpuProgress,
  round,
  correctAnswers,
  wrongAnswers,
  isAnswering,
  onSubmitAnswer,
  onNextRound,
  onTimeUp,
}: GameBoardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<"idle" | "correct" | "wrong">("idle");
  const [timerKey, setTimerKey] = useState(0);

  // Reset state when problem changes
  useEffect(() => {
    setSelectedAnswer(null);
    setAnswerState("idle");
    setTimerKey(prev => prev + 1);
  }, [problem, round]);

  const handleAnswer = (answer: number) => {
    if (isAnswering) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === problem.answer;
    setAnswerState(isCorrect ? "correct" : "wrong");
    onSubmitAnswer(answer);

    // Proceed to next round after delay
    setTimeout(() => {
      onNextRound();
    }, 1500);
  };

  const handleTimeUp = () => {
    if (!isAnswering) {
      setAnswerState("wrong");
      onTimeUp();
      
      setTimeout(() => {
        onNextRound();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 speed-lines opacity-5" />

      <div className="relative z-10 flex flex-col h-full max-w-4xl mx-auto w-full gap-4">
        {/* Header with stats */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{player.avatar}</span>
            <div>
              <p className="font-bebas text-lg text-foreground">{player.name}</p>
              <p className="text-xs text-muted-foreground">
                {player.stand.name}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <MenacingText size="sm" className="text-primary">
              ROUND {round}
            </MenacingText>
          </div>

          <div className="text-right">
            <p className="font-bebas text-lg">
              <span className="text-success">{correctAnswers}</span>
              <span className="text-muted-foreground"> / </span>
              <span className="text-destructive">{wrongAnswers}</span>
            </p>
            <p className="text-xs text-muted-foreground">Correct / Wrong</p>
          </div>
        </div>

        {/* Race Map */}
        <RaceMap
          playerProgress={playerProgress}
          cpuProgress={cpuProgress}
          playerName={player.name}
          playerEmoji={player.avatar}
        />

        {/* Timer */}
        <Timer
          key={timerKey}
          duration={ROUND_TIME}
          onTimeUp={handleTimeUp}
          isRunning={!isAnswering}
        />

        {/* Cards and Operation */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-4">
          <div className="flex items-center gap-4 md:gap-8">
            <StandCard
              value={problem.cardA}
              stand={problem.standA}
              size="lg"
              className="dramatic-enter"
            />
            
            <OperationBadge operation={problem.operation} />
            
            <StandCard
              value={problem.cardB}
              stand={problem.standB}
              size="lg"
              className="dramatic-enter [animation-delay:0.1s]"
            />
          </div>

          {/* Question */}
          <p className="font-bebas text-3xl text-foreground">
            {problem.cardA} {problem.operation} {problem.cardB} = ?
          </p>
        </div>

        {/* Answer buttons */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 pb-4">
          {problem.options.map((option, idx) => (
            <AnswerButton
              key={`${option}-${idx}`}
              value={option}
              onClick={() => handleAnswer(option)}
              disabled={isAnswering}
              state={
                selectedAnswer === option
                  ? answerState
                  : isAnswering && option === problem.answer
                  ? "correct"
                  : "idle"
              }
              index={idx}
            />
          ))}
        </div>

        {/* Feedback message */}
        {isAnswering && (
          <div className={cn(
            "text-center py-2 font-bebas text-2xl dramatic-enter",
            answerState === "correct" ? "text-success" : "text-destructive"
          )}>
            {answerState === "correct" ? (
              <>🎯 CORRECT! GO!GO!GO!</>
            ) : (
              <>💀 WRONG! Diego advances!</>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
