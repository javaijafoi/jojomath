import { useGameState } from "@/hooks/useGameState";
import { MainMenu } from "@/components/game/MainMenu";
import { CharacterSelect } from "@/components/game/CharacterSelect";
import { GameBoard } from "@/components/game/GameBoard";
import { GameOverScreen } from "@/components/game/GameOverScreen";

const Index = () => {
  const {
    phase,
    player,
    playerProgress,
    cpuProgress,
    currentProblem,
    round,
    correctAnswers,
    wrongAnswers,
    isAnswering,
    startGame,
    selectCharacter,
    submitAnswer,
    nextRound,
    timeUp,
    restartGame,
  } = useGameState();

  return (
    <div className="min-h-screen bg-background">
      {phase === "menu" && <MainMenu onStart={startGame} />}
      
      {phase === "character-select" && (
        <CharacterSelect onSelect={selectCharacter} />
      )}
      
      {phase === "playing" && player && currentProblem && (
        <GameBoard
          player={player}
          problem={currentProblem}
          playerProgress={playerProgress}
          cpuProgress={cpuProgress}
          round={round}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          isAnswering={isAnswering}
          onSubmitAnswer={submitAnswer}
          onNextRound={nextRound}
          onTimeUp={timeUp}
        />
      )}
      
      {(phase === "victory" || phase === "defeat") && player && (
        <GameOverScreen
          isVictory={phase === "victory"}
          player={player}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          onRestart={restartGame}
        />
      )}
    </div>
  );
};

export default Index;