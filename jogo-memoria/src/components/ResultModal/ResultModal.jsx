import "./result-modal.css";

export default function ResultModal({
  score,
  timeElapsed,
  onRestart,
  difficulty,
}) {
  const accuracy = (score / (timeElapsed || 1)).toFixed(2);

  return (
    <div className="result-modal">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
        <p>
          Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </p>
        <p>Score: {score}</p>
        <p>Time: {timeElapsed}s</p>
        <p>Efficiency: {accuracy} points/second</p>
        <p>Total Pairs: {score / 10}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded play-again"
          onClick={onRestart}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
