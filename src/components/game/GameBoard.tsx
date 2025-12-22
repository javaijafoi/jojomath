import { useEffect, useState } from "react";
import { Character, MathProblem, correctAnswerQuotes, wrongAnswerQuotes, encouragementQuotes } from "@/data/gameData";
import { StandCard } from "./StandCard";
import { OperationBadge } from "./OperationBadge";
import { AnswerButton } from "./AnswerButton";
import { RaceMap } from "./RaceMap";
import { Timer } from "./Timer";
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
  const [encouragement, setEncouragement] = useState("");

  useEffect(() => {
    setSelectedAnswer(null);
    setAnswerState("idle");
    setTimerKey(prev => prev + 1);
    setFeedbackQuote("");
    // Nova citação de incentivo a cada rodada
    setEncouragement(encouragementQuotes[Math.floor(Math.random() * encouragementQuotes.length)]);
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
    <div className="min-h-screen flex flex-col p-3 md:p-4 relative overflow-hidden">
      {/* Background - mais sutil */}
      <div className="absolute inset-0 speed-lines opacity-5" />

      <div className="relative z-10 flex flex-col h-full max-w-5xl mx-auto w-full gap-3">
        {/* Header compacto */}
        <div className="flex justify-between items-center bg-card/40 rounded-lg p-2 border border-border/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
              <img 
                src={player.avatar} 
                alt={player.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <p className="font-bebas text-sm text-foreground">{player.name}</p>
              <p className="text-[10px]" style={{ color: player.stand.color }}>
                {player.stand.name}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="font-bebas text-lg text-accent">
              RODADA {round}
            </p>
          </div>

          <div className="text-right">
            <p className="font-bebas text-lg">
              <span className="text-success">{correctAnswers}</span>
              <span className="text-muted-foreground/50"> / </span>
              <span className="text-destructive">{wrongAnswers}</span>
            </p>
          </div>
        </div>

        {/* Race Map */}
        <RaceMap
          playerProgress={playerProgress}
          cpuProgress={cpuProgress}
          playerName={player.name}
          playerAvatar={player.avatar}
        />

        {/* Timer compacto */}
        <Timer
          key={timerKey}
          duration={ROUND_TIME}
          onTimeUp={handleTimeUp}
          isRunning={!isAnswering}
        />

        {/* Citação de incentivo */}
        {!isAnswering && (
          <div className="text-center py-1">
            <p className="text-accent font-russo text-sm italic">{encouragement}</p>
          </div>
        )}

        {/* Cards and Operation - FOCO PRINCIPAL */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 py-2">
          <div className="flex items-center gap-3 md:gap-6">
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

          {/* Equation display - clean */}
          <div className="text-center bg-card/50 rounded-xl px-6 py-3 border border-border/50">
            <p className="font-bebas text-4xl md:text-5xl text-foreground">
              <span style={{ color: problem.standA.color }}>{problem.cardA}</span>
              <span className="text-accent mx-4">{problem.operation}</span>
              <span style={{ color: problem.standB.color }}>{problem.cardB}</span>
              <span className="text-primary ml-4">=</span>
              <span className="text-primary ml-2">?</span>
            </p>
          </div>
        </div>

        {/* Answer buttons */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 pb-2">
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
            "text-center py-2 font-bebas text-2xl md:text-3xl dramatic-enter",
            answerState === "correct" ? "text-success" : "text-destructive"
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
