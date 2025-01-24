import { useState, useMemo } from "react";
import Card from "../Card/Card";

export default function GameBoard({ cards, onCardMatch, isStudyMode }) {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const gridSize = useMemo(() => {
    const size = Math.sqrt(cards.length);
    return `grid-cols-${size}`;
  }, [cards.length]);

  const handleCardClick = (index) => {
    if (isStudyMode) {
      setFlippedCards((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
      return;
    }

    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex].id === cards[secondIndex].id) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        onCardMatch();
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  return (
    <div className={`grid gap-4 p-4 ${gridSize}`}>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          isFlipped={
            flippedCards.includes(index) || matchedCards.includes(index)
          }
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
}
