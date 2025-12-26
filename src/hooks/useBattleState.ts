import { useState, useCallback } from "react";
import {
  Fighter,
  fighters,
  getRandomFighters,
  getRandomCpuOpponent,
  generateMathProblem,
  MathProblem,
  COMBO_BONUS,
  SPECIAL_MULTIPLIER,
  WRONG_ANSWER_DAMAGE,
  TIMEOUT_DAMAGE,
  MAX_COMBO_FOR_SPECIAL,
  HARD_OPERATION_TYPES,
  GYRO_HARD_OPERATION_BONUS,
  JOHNNY_QUICK_ANSWER_WINDOW,
  JOHNNY_QUICK_DAMAGE_BONUS,
  JOHNNY_QUICK_METER_BONUS,
  VALENTINE_DAMAGE_REDUCTION,
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
  questionStartTime: number;
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
    questionStartTime: Date.now(),
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
      questionStartTime: Date.now(),
    }));
  }, []);

  const submitBattleAnswer = useCallback((answer: number) => {
    setState(prev => {
      if (!prev.currentProblem || prev.isAnswering || !prev.player || !prev.cpu) return prev;

      const timeTaken = (Date.now() - prev.questionStartTime) / 1000;

      const isCorrect = answer === prev.currentProblem.answer;
      
      if (isCorrect) {
        // Calculate damage
        const newCombo = prev.combo + 1;
        const comboBonus = newCombo * COMBO_BONUS;
        const isSpecialAttack = prev.isSpecialReady;
        let baseDamage = prev.player.attackPower + comboBonus;

        if (prev.player.id === "gyro" && HARD_OPERATION_TYPES.includes(prev.currentProblem.operation)) {
          baseDamage *= (1 + GYRO_HARD_OPERATION_BONUS);
        }

        if (prev.player.id === "johnny" && timeTaken <= JOHNNY_QUICK_ANSWER_WINDOW) {
          baseDamage += JOHNNY_QUICK_DAMAGE_BONUS;
        }

        let finalDamage = isSpecialAttack ? baseDamage * SPECIAL_MULTIPLIER : baseDamage;

        if (prev.cpu.id === "valentine") {
          finalDamage *= (1 - VALENTINE_DAMAGE_REDUCTION);
        }

        finalDamage = Math.max(1, Math.round(finalDamage));
        
        const newCpuHp = Math.max(0, prev.cpuHp - finalDamage);
        const quickMeterBonus = prev.player.id === "johnny" && timeTaken <= JOHNNY_QUICK_ANSWER_WINDOW ? JOHNNY_QUICK_METER_BONUS : 0;
        const meterGain = isSpecialAttack ? 0 : 1 + quickMeterBonus;
        const newSpecialMeter = isSpecialAttack ? 0 : Math.min(prev.specialMeter + meterGain, MAX_COMBO_FOR_SPECIAL);
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
        let incomingDamage = WRONG_ANSWER_DAMAGE;

        if (prev.player.id === "valentine") {
          incomingDamage *= (1 - VALENTINE_DAMAGE_REDUCTION);
        }

        const newPlayerHp = Math.max(0, prev.playerHp - Math.max(1, Math.round(incomingDamage)));

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
      questionStartTime: Date.now(),
    }));
  }, []);

  const battleTimeUp = useCallback(() => {
    setState(prev => {
      if (prev.isAnswering || !prev.player) return prev;

      const newPlayerHp = Math.max(0, prev.playerHp - TIMEOUT_DAMAGE);
      const adjustedPlayerHp = prev.player?.id === "valentine"
        ? Math.max(0, prev.playerHp - Math.max(1, Math.round(TIMEOUT_DAMAGE * (1 - VALENTINE_DAMAGE_REDUCTION))))
        : newPlayerHp;

      if (adjustedPlayerHp <= 0) {
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
        playerHp: adjustedPlayerHp,
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
      questionStartTime: Date.now(),
    });
  }, []);

  const acknowledgeKO = useCallback(() => {
    setState(prev => prev.showKO ? { ...prev, showKO: false } : prev);
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
    acknowledgeKO,
    getAvailableFighters,
  };
}
