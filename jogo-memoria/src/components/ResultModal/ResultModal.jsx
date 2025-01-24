export default function ResultModal({
  score,
  timeElapsed,
  onRestart,
  difficulty,
}) {
  const accuracy = (score / (timeElapsed || 1)).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={onRestart}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
