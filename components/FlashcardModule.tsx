'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, RotateCcw } from 'lucide-react';

interface Flashcard {
  id: number;
  front: string;
  back: string;
  category: string;
}

const sampleFlashcards: Flashcard[] = [
  {
    id: 1,
    front: "What is Photosynthesis?",
    back: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. It generally involves the green pigment chlorophyll and generates oxygen as a byproduct.",
    category: "Biology"
  },
  {
    id: 2,
    front: "Define Newton's First Law",
    back: "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. Also known as the Law of Inertia.",
    category: "Physics"
  },
  {
    id: 3,
    front: "What is the Pythagorean Theorem?",
    back: "In a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of squares of the lengths of the other two sides: a² + b² = c²",
    category: "Mathematics"
  },
  {
    id: 4,
    front: "What is a Variable in Programming?",
    back: "A variable is a named storage location in memory that holds a value which can be changed during program execution. Variables have a name, a data type, and a value.",
    category: "Computer Science"
  },
  {
    id: 5,
    front: "What is the Water Cycle?",
    back: "The water cycle is the continuous movement of water on, above, and below the surface of the Earth. It includes evaporation, condensation, precipitation, and collection.",
    category: "Earth Science"
  },
  {
    id: 6,
    front: "What is DNA?",
    back: "DNA (Deoxyribonucleic Acid) is a molecule that carries genetic instructions for the development, functioning, growth, and reproduction of all known organisms and many viruses. It consists of two strands forming a double helix.",
    category: "Biology"
  },
  {
    id: 7,
    front: "What is Supply and Demand?",
    back: "Supply and demand is an economic model that determines the price of goods in a market. Supply is the amount of a product available, while demand is how much consumers want it. Price adjusts to balance supply and demand.",
    category: "Economics"
  },
  {
    id: 8,
    front: "What is the Scientific Method?",
    back: "The scientific method is a systematic approach to research involving: 1) Making observations, 2) Forming a hypothesis, 3) Conducting experiments, 4) Analyzing data, 5) Drawing conclusions, 6) Communicating results.",
    category: "Science"
  },
  {
    id: 9,
    front: "What is Democracy?",
    back: "Democracy is a system of government where power is vested in the people, who rule either directly or through freely elected representatives. Key principles include free elections, rule of law, and protection of human rights.",
    category: "Political Science"
  },
  {
    id: 10,
    front: "What is Osmosis?",
    back: "Osmosis is the spontaneous movement of water molecules through a semi-permeable membrane from a region of lower solute concentration to a region of higher solute concentration, equalizing the concentrations on both sides.",
    category: "Biology"
  },
];

export default function FlashcardModule({ onReview }: { onReview: () => void }) {
  const [cards, setCards] = useState(sampleFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCards, setReviewedCards] = useState(0);

  const handleFlip = () => {
    if (!isFlipped) {
      onReview();
      setReviewedCards(reviewedCards + 1);
    }
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleReset = () => {
    setCards(sampleFlashcards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setReviewedCards(0);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Flashcards</h2>
            <p className="text-gray-600 mt-1">
              Card {currentIndex + 1} of {cards.length} • {reviewedCards} reviewed
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleShuffle}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-medium"
            >
              <Shuffle className="h-5 w-5" />
              <span>Shuffle</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
            >
              <RotateCcw className="h-5 w-5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative">
        <div
          className={`flip-card ${isFlipped ? 'flipped' : ''} cursor-pointer`}
          onClick={handleFlip}
        >
          <div className="flip-card-inner relative">
            {/* Front */}
            <div className="flip-card-front absolute w-full">
              <div className="bg-white rounded-2xl shadow-2xl p-12 min-h-[400px] flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                    {currentCard.category}
                  </span>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {currentCard.front}
                  </h3>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Click to reveal answer</p>
                  <div className="mt-4 flex justify-center">
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="flip-card-back absolute w-full">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-2xl p-12 min-h-[400px] flex flex-col justify-between text-white">
                <div>
                  <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
                    {currentCard.category}
                  </span>
                  <p className="text-xl leading-relaxed">
                    {currentCard.back}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-white/80 text-sm">Click to see question</p>
                  <div className="mt-4 flex justify-center">
                    <div className="w-16 h-1 bg-white/50 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 shadow-lg'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Previous</span>
          </button>

          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {currentIndex + 1}
            </div>
            <div className="text-sm text-gray-600 mt-1">of {cards.length}</div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              currentIndex === cards.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Study Tips:</h3>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• Try to answer before flipping the card</li>
          <li>• Review cards multiple times for better retention</li>
          <li>• Use the shuffle feature to test your knowledge randomly</li>
          <li>• Focus on understanding, not just memorization</li>
        </ul>
      </div>
    </div>
  );
}
