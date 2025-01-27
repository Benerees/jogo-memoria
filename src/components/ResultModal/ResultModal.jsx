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
        <h2 className="text-2xl font-bold mb-4">Fim de Jogo!</h2>
        <p>
          Dificuldade: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </p>
        <p>Pontuação: {score}</p>
        <p>Tempo: {timeElapsed}s</p>
        <p>Eficiência: {accuracy} points/second</p>
        <p>Total de Pares: {score / 10}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded play-again"
          onClick={onRestart}
        >
          Jogar Novamente
        </button>
      </div>
    </div>
  );
}
