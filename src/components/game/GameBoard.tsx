import { useEffect, useState } from "react";
import { Character, MathProblem, correctAnswerQuotes, wrongAnswerQuotes } from "@/data/gameData";
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

const ROUND_TIME = 15;

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
  const [feedbackQuote, setFeedbackQuote] = useState("");

  useEffect(() => {
    setSelectedAnswer(null);
    setAnswerState("idle");
    setTimerKey(prev => prev + 1);
    setFeedbackQuote("");
  }, [problem, round]);

  const handleAnswer = (answer: number) => {
    if (isAnswering) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === problem.answer;
    setAnswerState(isCorrect ? "correct" : "wrong");
    
    const quotes = isCorrect ? correctAnswerQuotes : wrongAnswerQuotes;
    setFeedbackQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    
    onSubmitAnswer(answer);

    setTimeout(() => {
      onNextRound();
    }, 1500);
  };

  const handleTimeUp = () => {
    if (!isAnswering) {
      setAnswerState("wrong");
      setFeedbackQuote(wrongAnswerQuotes[Math.floor(Math.random() * wrongAnswerQuotes.length)]);
      onTimeUp();
      
      setTimeout(() => {
        onNextRound();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 speed-lines opacity-10" />
      <div className="absolute inset-0 diagonal-lines" />

      <div className="relative z-10 flex flex-col h-full max-w-4xl mx-auto w-full gap-4">
        {/* Header with stats */}
        <div className="flex justify-between items-center bg-card/50 rounded-lg p-3 border border-border backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
              <img 
                src={player.avatar} 
                alt={player.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <p className="font-bebas text-lg text-foreground">{player.name}</p>
              <p className="text-xs text-primary">
                {player.stand.name}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <MenacingText size="sm" className="text-accent">
              RODADA {round}
            </MenacingText>
          </div>

          <div className="text-right">
            <p className="font-bebas text-xl">
              <span className="text-gyro">{correctAnswers}</span>
              <span className="text-muted-foreground"> / </span>
              <span className="text-destructive">{wrongAnswers}</span>
            </p>
            <p className="text-xs text-muted-foreground">Certos / Erros</p>
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
              className="dramatic-enter"
              style={{ animationDelay: "0.1s" }}
            />
          </div>

          {/* Question - more dramatic */}
          <div className="text-center">
            <p className="font-bebas text-4xl md:text-5xl text-foreground">
              <span style={{ color: problem.standA.color }}>{problem.cardA}</span>
              <span className="text-accent mx-3">{problem.operation}</span>
              <span style={{ color: problem.standB.color }}>{problem.cardB}</span>
              <span className="text-primary"> = ?</span>
            </p>
          </div>
        </div>

        {/* Answer buttons */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 pb-4">
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
            "text-center py-3 font-bebas text-2xl md:text-3xl dramatic-enter",
            answerState === "correct" ? "text-gyro" : "text-destructive"
          )}>
            <span className={answerState === "correct" ? "ora-effect inline-block" : ""}>
              {feedbackQuote}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
