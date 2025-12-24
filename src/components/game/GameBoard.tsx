import { useEffect, useState, useRef, useCallback } from "react";
import { Character, MathProblem, correctAnswerQuotes, wrongAnswerQuotes, encouragementQuotes } from "@/data/gameData";
import { StandCard } from "./StandCard";
import { OperationBadge } from "./OperationBadge";
import { AnswerButton } from "./AnswerButton";
import { RaceMap } from "./RaceMap";
import { Timer } from "./Timer";
import { FeedbackOverlay } from "./FeedbackOverlay";
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
const FEEDBACK_DURATION = 1200;

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
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Refs para controle de timeouts e estado
  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasAnsweredRef = useRef(false);

  // Cleanup do timeout ao desmontar ou resetar
  const clearFeedbackTimeout = useCallback(() => {
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = null;
    }
  }, []);

  // Reset estado quando muda o problema/rodada
  useEffect(() => {
    clearFeedbackTimeout();
    setSelectedAnswer(null);
    setAnswerState("idle");
    setTimerKey(prev => prev + 1);
    setFeedbackQuote("");
    setShowFeedback(false);
    hasAnsweredRef.current = false;
    setEncouragement(encouragementQuotes[Math.floor(Math.random() * encouragementQuotes.length)]);
    
    return () => clearFeedbackTimeout();
  }, [problem, round, clearFeedbackTimeout]);

  // Função para mostrar feedback e avançar
  const showFeedbackAndAdvance = useCallback((isCorrect: boolean, onComplete: () => void) => {
    const quotes = isCorrect ? correctAnswerQuotes : wrongAnswerQuotes;
    setFeedbackQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setAnswerState(isCorrect ? "correct" : "wrong");
    setShowFeedback(true);
    
    clearFeedbackTimeout();
    feedbackTimeoutRef.current = setTimeout(() => {
      setShowFeedback(false);
      onComplete();
    }, FEEDBACK_DURATION);
  }, [clearFeedbackTimeout]);

  const handleAnswer = useCallback((answer: number) => {
    // Previne múltiplas respostas
    if (isAnswering || hasAnsweredRef.current) return;
    hasAnsweredRef.current = true;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === problem.answer;
    
    onSubmitAnswer(answer);
    showFeedbackAndAdvance(isCorrect, onNextRound);
  }, [isAnswering, problem.answer, onSubmitAnswer, onNextRound, showFeedbackAndAdvance]);

  const handleTimeUp = useCallback(() => {
    // Previne chamadas duplicadas
    if (isAnswering || hasAnsweredRef.current) return;
    hasAnsweredRef.current = true;
    
    onTimeUp();
    showFeedbackAndAdvance(false, onNextRound);
  }, [isAnswering, onTimeUp, onNextRound, showFeedbackAndAdvance]);

  return (
    <div className="h-screen flex flex-col p-2 md:p-3 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 speed-lines opacity-5" />

      {/* Feedback Overlay */}
      {showFeedback && answerState !== "idle" && (
        <FeedbackOverlay state={answerState} quote={feedbackQuote} />
      )}

      <div className="relative z-10 flex flex-col h-full max-w-4xl mx-auto w-full gap-2">
        {/* Header compacto */}
        <div className="flex justify-between items-center bg-card/40 rounded-lg px-2 py-1.5 border border-border/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
              <img 
                src={player.avatar} 
                alt={player.name}
                loading="lazy"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-bebas text-sm text-foreground leading-none">{player.name}</p>
              <p className="text-[9px] leading-none" style={{ color: player.stand.color }}>
                {player.stand.name}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="font-bebas text-base md:text-lg text-accent">
              RODADA {round}
            </p>
          </div>

          <div className="text-right">
            <p className="font-bebas text-base md:text-lg">
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
          isRunning={!isAnswering && !hasAnsweredRef.current}
        />

        {/* Citação de incentivo - apenas quando não respondendo */}
        {!isAnswering && !showFeedback && (
          <div className="text-center">
            <p className="text-accent font-russo text-xs md:text-sm italic">{encouragement}</p>
          </div>
        )}

        {/* Cards and Operation - ÁREA PRINCIPAL */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 md:gap-3 min-h-0">
          <div className="flex items-center gap-2 md:gap-4">
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

          {/* Equation display */}
          <div className="text-center bg-card/40 rounded-lg px-4 py-2 border border-border/50">
            <p className="font-bebas text-2xl md:text-3xl text-foreground">
              <span style={{ color: problem.standA.color }}>{problem.cardA}</span>
              <span className="text-accent mx-2 md:mx-3">{problem.operation}</span>
              <span style={{ color: problem.standB.color }}>{problem.cardB}</span>
              <span className="text-primary ml-2 md:ml-3">=</span>
              <span className="text-primary ml-1">?</span>
            </p>
          </div>
        </div>

        {/* Answer buttons - grid compacto */}
        <div className="grid grid-cols-2 gap-2 pb-1">
          {problem.options.map((option, idx) => (
            <AnswerButton
              key={`${option}-${idx}`}
              value={option}
              onClick={() => handleAnswer(option)}
              disabled={isAnswering || showFeedback}
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
      </div>
    </div>
  );
}
