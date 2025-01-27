import "./card.css";

export default function Card({ card, isFlipped, onClick }) {
    return (
        <div
            className={`block relative aspect-square cursor-pointer ${
                isFlipped ? "block-flipped bg-blue-200" : "bg-gray-300"
            }`}
            onClick={onClick}
        >
            <div
                className={`absolute inset-0 flex items-center justify-center p-2 transition-transform duration-300 ${
                    isFlipped ? "rotate-y-180" : ""
                }`}
            >
                {isFlipped ? (
                    <p className="flip text-xs sm:text-sm md:text-base text-center">
                        {card.definition}
                    </p>
                ) : (
                    <p className="flip text-sm sm:text-base md:text-lg font-bold">
                        {card.concept}
                    </p>
                )}
            </div>
        </div>
    );
}