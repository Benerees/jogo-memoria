export default function Footer({ score, timeElapsed }) {
  return (
    <footer className="bg-gray-200 p-4 flex justify-between">
      <div>Pontuação: {score}</div>
      <div>Tempo: {timeElapsed}s</div>
    </footer>
  );
}
