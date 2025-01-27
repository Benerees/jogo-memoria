import { useState, useEffect } from "react";
import GameBoard from "../GameBoard/GameBoard";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ResultModal from "../ResultModal/ResultModal";
import { shuffleArray } from "../../utils/helpers";
import "./index.css";

const cardsData = [
    {
        id: "cache",
        concept: "",
        definition:
            "Uma pequena, porém rápida área de memória que armazena cópias de dados de locais de memória principal frequentemente utilizados.",
    },
    {
        id: "hierarchy",
        concept: "",
        definition:
            "Organiza componentes de memória com base em seus tempos de acesso e resposta, desde registradores até armazenamento terciário.",
    },
    {
        id: "internal",
        concept: "",
        definition:
            "Memória diretamente acessível pelo processador, como a memória principal (RAM) e a cache.",
    },
    {
        id: "external",
        concept: "",
        definition:
            "Armazenamento periférico, incluindo HDD, SSD, discos ópticos, mais lento e maior, mas não acessado diretamente pela CPU.",
    },
    {
        id: "registers",
        concept: "",
        definition:
            "Locais de memória pequenos e mais rápidos diretamente dentro da CPU para armazenar dados e instruções temporárias.",
    },
    {
        id: "l1cache",
        concept: "",
        definition:
            "O menor e mais rápido nível de cache, normalmente no chip da CPU.",
    },
    {
        id: "ram",
        concept: "",
        definition:
            "Armazenamento primário que contém dados e instruções atualmente usados pela CPU; mais lento, mas maior que o cache.",
    },
    {
        id: "ssd",
        concept: "",
        definition:
            "Dispositivo de armazenamento secundário com tempos de acesso mais rápidos do que HDDs, mas mais lento do que RAM.",
    },
    {
        id: "dram",
        concept: "",
        definition:
            "RAM dinâmica, comumente usada para memória principal; menos caro, mas mais lento em comparação com a SRAM.",
    },
    {
        id: "bus",
        concept: "",
        definition:
            "Transfere dados entre CPU, memória principal e dispositivos periféricos.",
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
            default:
                selectedCards = shuffled.slice(0, 8); // Default to medium
                break;
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
        <div className="">
            <Header
                isStudyMode={isStudyMode}
                toggleStudyMode={toggleStudyMode}
                difficulty={difficulty}
                changeDifficulty={changeDifficulty}
            />
            <main className="container grid-4x4 container-index">
                <GameBoard
                    cards={cards}
                    onCardMatch={handleCardMatch}
                    isStudyMode={isStudyMode}
                    isGameOver={isGameOver}
                />
            </main>
            <div className="score">
                <Footer score={score} timeElapsed={timeElapsed} />
                {isGameOver && (
                    <ResultModal
                        score={score}
                        timeElapsed={timeElapsed}
                        difficulty={difficulty}
                        onRestart={initGame}
                    />
                )}
            </div>
        </div>
    );
}