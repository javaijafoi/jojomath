import { useState, useCallback } from "react";
import {
  Fighter,
  fighters,
  getRandomFighters,
  getRandomCpuOpponent,
  generateMathProblem,
  MathProblem,
  BASE_DAMAGE,
  COMBO_BONUS,
  SPECIAL_MULTIPLIER,
  WRONG_ANSWER_DAMAGE,
  TIMEOUT_DAMAGE,
  MAX_COMBO_FOR_SPECIAL,
} from "@/data/battleData";

export type BattlePhase = "menu" | "mode-select" | "character-select" | "fighting" | "victory" | "defeat";
export type GameMode = "race" | "battle" | null;

interface BattleState {
  phase: BattlePhase;
  gameMode: GameMode;
  player: Fighter | null;
  cpu: Fighter | null;
  playerHp: number;
  cpuHp: number;
  playerMaxHp: number;
  cpuMaxHp: number;
  combo: number;
  specialMeter: number;
  isSpecialReady: boolean;
  currentProblem: MathProblem | null;
  round: number;
  correctAnswers: number;
  wrongAnswers: number;
  isAnswering: boolean;
  lastAction: "attack" | "damage" | "special" | "idle";
  showKO: boolean;
}

export function useBattleState() {
  const [state, setState] = useState<BattleState>({
    phase: "menu",
    gameMode: null,
    player: null,
    cpu: null,
    playerHp: 100,
    cpuHp: 100,
    playerMaxHp: 100,
    cpuMaxHp: 100,
    combo: 0,
    specialMeter: 0,
    isSpecialReady: false,
    currentProblem: null,
    round: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    isAnswering: false,
    lastAction: "idle",
    showKO: false,
  });

  const goToModeSelect = useCallback(() => {
    setState(prev => ({ ...prev, phase: "mode-select" }));
  }, []);

  const selectGameMode = useCallback((mode: GameMode) => {
    setState(prev => ({
      ...prev,
      gameMode: mode,
      phase: "character-select",
    }));
  }, []);

  const selectFighter = useCallback((fighter: Fighter) => {
    const cpu = getRandomCpuOpponent(fighter.id);
    setState(prev => ({
      ...prev,
      player: fighter,
      cpu,
      playerHp: fighter.maxHp,
      cpuHp: cpu.maxHp,
      playerMaxHp: fighter.maxHp,
      cpuMaxHp: cpu.maxHp,
      phase: "fighting",
      combo: 0,
      specialMeter: 0,
      isSpecialReady: false,
      round: 1,
      correctAnswers: 0,
      wrongAnswers: 0,
      currentProblem: generateMathProblem(),
      isAnswering: false,
      lastAction: "idle",
      showKO: false,
    }));
  }, []);

  const submitBattleAnswer = useCallback((answer: number) => {
    setState(prev => {
      if (!prev.currentProblem || prev.isAnswering || !prev.player) return prev;

      const isCorrect = answer === prev.currentProblem.answer;
      
      if (isCorrect) {
        // Calculate damage
        const newCombo = prev.combo + 1;
        const comboBonus = newCombo * COMBO_BONUS;
        const isSpecialAttack = prev.isSpecialReady;
        const baseDamage = prev.player.attackPower + comboBonus;
        const finalDamage = isSpecialAttack ? baseDamage * SPECIAL_MULTIPLIER : baseDamage;
        
        const newCpuHp = Math.max(0, prev.cpuHp - finalDamage);
        const newSpecialMeter = isSpecialAttack ? 0 : Math.min(prev.specialMeter + 1, MAX_COMBO_FOR_SPECIAL);
        const isSpecialReady = newSpecialMeter >= MAX_COMBO_FOR_SPECIAL;

        // Check win condition
        if (newCpuHp <= 0) {
          return {
            ...prev,
            cpuHp: 0,
            combo: newCombo,
            correctAnswers: prev.correctAnswers + 1,
            phase: "victory" as BattlePhase,
            isAnswering: true,
            lastAction: isSpecialAttack ? "special" : "attack",
            showKO: true,
          };
        }

        return {
          ...prev,
          cpuHp: newCpuHp,
          combo: newCombo,
          specialMeter: newSpecialMeter,
          isSpecialReady,
          correctAnswers: prev.correctAnswers + 1,
          isAnswering: true,
          lastAction: isSpecialAttack ? "special" : "attack",
        };
      } else {
        // Wrong answer - player takes damage
        const newPlayerHp = Math.max(0, prev.playerHp - WRONG_ANSWER_DAMAGE);

        // Check lose condition
        if (newPlayerHp <= 0) {
          return {
            ...prev,
            playerHp: 0,
            combo: 0,
            wrongAnswers: prev.wrongAnswers + 1,
            phase: "defeat" as BattlePhase,
            isAnswering: true,
            lastAction: "damage",
            showKO: true,
          };
        }

        return {
          ...prev,
          playerHp: newPlayerHp,
          combo: 0, // Reset combo on wrong answer
          wrongAnswers: prev.wrongAnswers + 1,
          isAnswering: true,
          lastAction: "damage",
        };
      }
    });
  }, []);

  const nextBattleRound = useCallback(() => {
    setState(prev => ({
      ...prev,
      round: prev.round + 1,
      currentProblem: generateMathProblem(),
      isAnswering: false,
      lastAction: "idle",
    }));
  }, []);

  const battleTimeUp = useCallback(() => {
    setState(prev => {
      if (prev.isAnswering) return prev;

      const newPlayerHp = Math.max(0, prev.playerHp - TIMEOUT_DAMAGE);

      if (newPlayerHp <= 0) {
        return {
          ...prev,
          playerHp: 0,
          combo: 0,
          wrongAnswers: prev.wrongAnswers + 1,
          phase: "defeat" as BattlePhase,
          isAnswering: true,
          lastAction: "damage",
          showKO: true,
        };
      }

      return {
        ...prev,
        playerHp: newPlayerHp,
        combo: 0,
        wrongAnswers: prev.wrongAnswers + 1,
        isAnswering: true,
        lastAction: "damage",
      };
    });
  }, []);

  const restartBattle = useCallback(() => {
    setState({
      phase: "menu",
      gameMode: null,
      player: null,
      cpu: null,
      playerHp: 100,
      cpuHp: 100,
      playerMaxHp: 100,
      cpuMaxHp: 100,
      combo: 0,
      specialMeter: 0,
      isSpecialReady: false,
      currentProblem: null,
      round: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      isAnswering: false,
      lastAction: "idle",
      showKO: false,
    });
  }, []);

  const getAvailableFighters = useCallback(() => {
    return getRandomFighters(6);
  }, []);

  return {
    ...state,
    goToModeSelect,
    selectGameMode,
    selectFighter,
    submitBattleAnswer,
    nextBattleRound,
    battleTimeUp,
    restartBattle,
    getAvailableFighters,
  };
}
