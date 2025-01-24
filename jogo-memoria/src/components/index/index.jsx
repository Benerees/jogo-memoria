import { useState, useEffect } from "react";
import GameBoard from "../GameBoard/GameBoard";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ResultModal from "../ResultModal/ResultModal";
import { shuffleArray } from "../../utils/helpers";

const cardsData = [
  {
    id: "cache",
    concept: "Cache Memory",
    definition:
      "A small, fast memory area that stores copies of data from frequently used main memory locations.",
  },
  {
    id: "hierarchy",
    concept: "Memory Hierarchy",
    definition:
      "Organizes memory components based on their access and response times, from registers down to tertiary storage.",
  },
  {
    id: "internal",
    concept: "Internal Memory",
    definition:
      "Memory directly accessible by the processor, such as main memory (RAM) and cache.",
  },
  {
    id: "external",
    concept: "External Memory",
    definition:
      "Peripheral storage, including HDD, SSD, optical disks, slower and larger but not directly accessed by the CPU.",
  },
  {
    id: "registers",
    concept: "CPU Registers",
    definition:
      "Small, fastest memory locations directly inside the CPU to hold temporary data and instructions.",
  },
  {
    id: "l1cache",
    concept: "L1 Cache",
    definition:
      "The smallest and fastest cache level, typically on the CPU chip.",
  },
  {
    id: "ram",
    concept: "Main Memory (RAM)",
    definition:
      "Primary storage that holds data and instructions currently used by the CPU; slower but larger than cache.",
  },
  {
    id: "ssd",
    concept: "Solid-State Drive (SSD)",
    definition:
      "Secondary storage device with faster access times than HDDs, but slower than RAM.",
  },
  {
    id: "dram",
    concept: "DRAM",
    definition:
      "Dynamic RAM, commonly used for main memory; less expensive but slower compared to SRAM.",
  },
  {
    id: "bus",
    concept: "System Bus",
    definition:
      "Transfers data between CPU, main memory, and peripheral devices.",
  },
];

export default function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [difficulty, setDifficulty] = useState("medium");

  useEffect(() => {
    initGame();
  }, [difficulty]);

  useEffect(() => {
    let timer;
    if (!isGameOver && !isStudyMode) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameOver, isStudyMode]);

  const initGame = () => {
    const shuffled = shuffleArray([...cardsData]);
    let selectedCards;
    switch (difficulty) {
      case "easy":
        selectedCards = shuffled.slice(0, 8); // 4x4 grid
        break;
      case "medium":
        selectedCards = shuffled.slice(0, 18); // 6x6 grid
        break;
      case "hard":
        selectedCards = shuffled; // 8x8 grid (all 20 cards)
        break;
      default:
        selectedCards = shuffled.slice(0, 18); // Default to medium
    }
    const gameCards = shuffleArray([...selectedCards, ...selectedCards]);
    setCards(gameCards);
    setScore(0);
    setTimeElapsed(0);
    setIsGameOver(false);
  };

  const handleCardMatch = () => {
    setScore((prevScore) => prevScore + 10);
    if (score + 10 === (cards.length / 2) * 10) {
      setIsGameOver(true);
    }
  };

  const toggleStudyMode = () => {
    setIsStudyMode((prevMode) => !prevMode);
    if (!isStudyMode) {
      setIsGameOver(false);
      setTimeElapsed(0);
    }
  };

  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        isStudyMode={isStudyMode}
        toggleStudyMode={toggleStudyMode}
        difficulty={difficulty}
        changeDifficulty={changeDifficulty}
      />
      <main className="flex-grow">
        <GameBoard
          cards={cards}
          onCardMatch={handleCardMatch}
          isStudyMode={isStudyMode}
        />
      </main>
      <Footer score={score} timeElapsed={timeElapsed} />
      {isGameOver && (
        <ResultModal
          score={score}
          timeElapsed={timeElapsed}
          onRestart={initGame}
        />
      )}
    </div>
  );
}
