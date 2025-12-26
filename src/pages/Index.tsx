import { useGameState } from "@/hooks/useGameState";
import { useBattleState } from "@/hooks/useBattleState";
import { MainMenu } from "@/components/game/MainMenu";
import { ModeSelect } from "@/components/game/ModeSelect";
import { CharacterSelect } from "@/components/game/CharacterSelect";
import { FighterSelect } from "@/components/game/FighterSelect";
import { GameBoard } from "@/components/game/GameBoard";
import { BattleBoard } from "@/components/game/BattleBoard";
import { GameOverScreen } from "@/components/game/GameOverScreen";
import { BattleOverScreen } from "@/components/game/BattleOverScreen";
import { BattleClashOverlay } from "@/components/game/BattleClashOverlay";

const Index = () => {
  // Race mode state
  const raceState = useGameState();
  
  // Battle mode state
  const battleState = useBattleState();

  // Determine which state to use based on game mode
  const currentPhase = battleState.phase;
  const gameMode = battleState.gameMode;

  // Handle main menu start
  const handleStart = () => {
    battleState.goToModeSelect();
  };

  // Handle mode selection
  const handleModeSelect = (mode: "race" | "battle" | null) => {
    battleState.selectGameMode(mode);
    if (mode === "race") {
      raceState.startGame();
    }
  };

  // Handle restart
  const handleRestart = () => {
    battleState.restartBattle();
    raceState.restartGame();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Menu */}
      {currentPhase === "menu" && (
        <MainMenu onStart={handleStart} />
      )}

      {/* Mode Selection */}
      {currentPhase === "mode-select" && (
        <ModeSelect onSelectMode={handleModeSelect} />
      )}

      {/* Character/Fighter Selection */}
      {currentPhase === "character-select" && gameMode === "race" && (
        <CharacterSelect onSelect={(char) => {
          raceState.selectCharacter(char);
          battleState.selectGameMode("race"); // Keep sync
        }} />
      )}

      {currentPhase === "character-select" && gameMode === "battle" && (
        <FighterSelect onSelect={battleState.selectFighter} />
      )}

      {/* Race Mode Gameplay */}
      {raceState.phase === "playing" && gameMode === "race" && raceState.player && raceState.currentProblem && (
        <GameBoard
          player={raceState.player}
          problem={raceState.currentProblem}
          playerProgress={raceState.playerProgress}
          cpuProgress={raceState.cpuProgress}
          round={raceState.round}
          correctAnswers={raceState.correctAnswers}
          wrongAnswers={raceState.wrongAnswers}
          isAnswering={raceState.isAnswering}
          onSubmitAnswer={raceState.submitAnswer}
          onNextRound={raceState.nextRound}
          onTimeUp={raceState.timeUp}
        />
      )}

      {/* Battle Mode Gameplay */}
      {battleState.phase === "fighting" && gameMode === "battle" && battleState.player && battleState.cpu && battleState.currentProblem && (
        <BattleBoard
          player={battleState.player}
          cpu={battleState.cpu}
          playerHp={battleState.playerHp}
          cpuHp={battleState.cpuHp}
          playerMaxHp={battleState.playerMaxHp}
          cpuMaxHp={battleState.cpuMaxHp}
          problem={battleState.currentProblem}
          round={battleState.round}
          combo={battleState.combo}
          specialMeter={battleState.specialMeter}
          isSpecialReady={battleState.isSpecialReady}
          isAnswering={battleState.isAnswering}
          lastAction={battleState.lastAction}
          onSubmitAnswer={battleState.submitBattleAnswer}
          onNextRound={battleState.nextBattleRound}
          onTimeUp={battleState.battleTimeUp}
        />
      )}

      {/* Race Mode End Screens */}
      {(raceState.phase === "victory" || raceState.phase === "defeat") && gameMode === "race" && raceState.player && (
        <GameOverScreen
          isVictory={raceState.phase === "victory"}
          player={raceState.player}
          correctAnswers={raceState.correctAnswers}
          wrongAnswers={raceState.wrongAnswers}
          onRestart={handleRestart}
        />
      )}

      {/* Battle Mode End Screens */}
      {(battleState.phase === "victory" || battleState.phase === "defeat") && gameMode === "battle" && battleState.player && battleState.cpu && (
        <BattleOverScreen
          isVictory={battleState.phase === "victory"}
          player={battleState.player}
          cpu={battleState.cpu}
          correctAnswers={battleState.correctAnswers}
          wrongAnswers={battleState.wrongAnswers}
          onRestart={handleRestart}
        />
      )}

      {/* Battle impact overlay */}
      <BattleClashOverlay
        showKO={battleState.showKO && gameMode === "battle"}
        lastAction={gameMode === "battle" ? battleState.lastAction : "idle"}
        onResetKO={battleState.acknowledgeKO}
      />
    </div>
  );
};

export default Index;
