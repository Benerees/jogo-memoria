export default function Footer({ score, timeElapsed }) {
  return (
    <footer className="bg-gray-200 p-4 flex justify-between">
      <div>Score: {score}</div>
      <div>Time: {timeElapsed}s</div>
    </footer>
  );
}
