export default function Header({
  isStudyMode,
  toggleStudyMode,
  difficulty,
  changeDifficulty,
}) {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl font-bold mb-2">
        Computer Architecture Memory Game
      </h1>
      <div className="flex justify-between items-center">
        <button
          className={`px-4 py-2 rounded ${
            isStudyMode ? "bg-yellow-500" : "bg-blue-700"
          }`}
          onClick={toggleStudyMode}
        >
          {isStudyMode ? "Exit Study Mode" : "Enter Study Mode"}
        </button>
        <select
          className="bg-blue-700 px-4 py-2 rounded"
          value={difficulty}
          onChange={(e) => changeDifficulty(e.target.value)}
        >
          <option value="easy">Easy (4x4)</option>
          <option value="medium">Medium (6x6)</option>
          <option value="hard">Hard (8x8)</option>
        </select>
      </div>
    </header>
  );
}
