import { useState, useCallback } from "react";
import { 
  Character, 
  characters, 
  generateMathProblem, 
  MathProblem, 
  TOTAL_RACE_DISTANCE 
} from "@/data/gameData";

export type GamePhase = "menu" | "character-select" | "playing" | "victory" | "defeat";

interface GameState {
  phase: GamePhase;
  player: Character | null;
  cpu: Character;
  playerProgress: number;
  cpuProgress: number;
  currentProblem: MathProblem | null;
  round: number;
  correctAnswers: number;
  wrongAnswers: number;
  isAnswering: boolean;
}

const ADVANCE_DISTANCE = 600; // Distance gained per correct answer
const CPU_ADVANCE = 450; // Distance CPU gains when player is wrong or time runs out

export function useGameState() {
  const [state, setState] = useState<GameState>({
    phase: "menu",
    player: null,
    cpu: characters.find(c => c.id === "diego") || characters[0],
    playerProgress: 0,
    cpuProgress: 0,
    currentProblem: null,
    round: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    isAnswering: false,
  });

  const startGame = useCallback(() => {
    setState(prev => ({ ...prev, phase: "character-select" }));
  }, []);

  const selectCharacter = useCallback((character: Character) => {
    setState(prev => ({
      ...prev,
      player: character,
      phase: "playing",
      playerProgress: 0,
      cpuProgress: 0,
      round: 1,
      correctAnswers: 0,
      wrongAnswers: 0,
      currentProblem: generateMathProblem(),
      isAnswering: false,
    }));
  }, []);

  const submitAnswer = useCallback((answer: number) => {
    setState(prev => {
      if (!prev.currentProblem || prev.isAnswering) return prev;

      const isCorrect = answer === prev.currentProblem.answer;
      const newPlayerProgress = isCorrect 
        ? prev.playerProgress + ADVANCE_DISTANCE 
        : prev.playerProgress;
      const newCpuProgress = isCorrect 
        ? prev.cpuProgress 
        : prev.cpuProgress + CPU_ADVANCE;

      // Check win/loss conditions
      if (newPlayerProgress >= TOTAL_RACE_DISTANCE) {
        return {
          ...prev,
          playerProgress: newPlayerProgress,
          correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
          wrongAnswers: prev.wrongAnswers + (isCorrect ? 0 : 1),
          phase: "victory" as GamePhase,
          isAnswering: true,
        };
      }

      if (newCpuProgress >= TOTAL_RACE_DISTANCE) {
        return {
          ...prev,
          cpuProgress: newCpuProgress,
          correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
          wrongAnswers: prev.wrongAnswers + (isCorrect ? 0 : 1),
          phase: "defeat" as GamePhase,
          isAnswering: true,
        };
      }

      return {
        ...prev,
        playerProgress: newPlayerProgress,
        cpuProgress: newCpuProgress,
        correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
        wrongAnswers: prev.wrongAnswers + (isCorrect ? 0 : 1),
        isAnswering: true,
      };
    });
  }, []);

  const nextRound = useCallback(() => {
    setState(prev => ({
      ...prev,
      round: prev.round + 1,
      currentProblem: generateMathProblem(),
      isAnswering: false,
    }));
  }, []);

  const timeUp = useCallback(() => {
    setState(prev => {
      if (prev.isAnswering) return prev;

      const newCpuProgress = prev.cpuProgress + CPU_ADVANCE;

      if (newCpuProgress >= TOTAL_RACE_DISTANCE) {
        return {
          ...prev,
          cpuProgress: newCpuProgress,
          wrongAnswers: prev.wrongAnswers + 1,
          phase: "defeat" as GamePhase,
          isAnswering: true,
        };
      }

      return {
        ...prev,
        cpuProgress: newCpuProgress,
        wrongAnswers: prev.wrongAnswers + 1,
        isAnswering: true,
      };
    });
  }, []);

  const restartGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: "menu",
      player: null,
      playerProgress: 0,
      cpuProgress: 0,
      currentProblem: null,
      round: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      isAnswering: false,
    }));
  }, []);

  return {
    ...state,
    startGame,
    selectCharacter,
    submitAnswer,
    nextRound,
    timeUp,
    restartGame,
  };
}
