'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface MCQQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const sampleQuestions: MCQQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    explanation: "Paris is the capital and largest city of France.",
    category: "Geography"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    explanation: "Mars is called the Red Planet because of its reddish appearance caused by iron oxide on its surface.",
    category: "Science"
  },
  {
    id: 3,
    question: "What is 2 + 2 × 3?",
    options: ["12", "8", "10", "6"],
    correctAnswer: 1,
    explanation: "Following the order of operations (PEMDAS), multiplication comes before addition: 2 + (2 × 3) = 2 + 6 = 8",
    category: "Mathematics"
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
    explanation: "William Shakespeare wrote the tragedy 'Romeo and Juliet' in the 1590s.",
    category: "Literature"
  },
  {
    id: 5,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    explanation: "The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 63 million square miles.",
    category: "Geography"
  },
  {
    id: 6,
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correctAnswer: 0,
    explanation: "The speed of light in vacuum is approximately 299,792,458 meters per second, commonly rounded to 300,000 km/s.",
    category: "Science"
  },
  {
    id: 7,
    question: "Which programming language is known for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    correctAnswer: 1,
    explanation: "JavaScript is the primary programming language for web development, running in all modern browsers.",
    category: "Technology"
  },
  {
    id: 8,
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
    explanation: "2 is the smallest prime number and the only even prime number.",
    category: "Mathematics"
  },
];

export default function MCQModule({ onComplete }: { onComplete: (data: any) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleSubmit();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, showResult]);

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer(-1);
    }

    setShowResult(true);
    setIsActive(false);

    const isCorrect = selectedAnswer === sampleQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, isCorrect]);
    onComplete({ correct: isCorrect });
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setIsActive(true);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setIsActive(true);
    setQuizComplete(false);
    setAnswers([]);
  };

  if (quizComplete) {
    const percentage = Math.round((score / sampleQuestions.length) * 100);

    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className={`inline-flex p-6 rounded-full mb-6 ${
            percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            {percentage >= 70 ? (
              <CheckCircle className="h-16 w-16 text-green-600" />
            ) : (
              <XCircle className="h-16 w-16 text-red-600" />
            )}
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>

          <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {percentage}%
          </div>

          <p className="text-xl text-gray-600 mb-8">
            You scored {score} out of {sampleQuestions.length}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">{sampleQuestions.length - score}</div>
              <div className="text-sm text-gray-600">Incorrect</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{sampleQuestions.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  const question = sampleQuestions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span className="font-semibold text-lg">{timeLeft}s</span>
            </div>
            <div className="text-sm font-medium">
              Question {currentQuestion + 1} of {sampleQuestions.length}
            </div>
          </div>

          <div className="w-full bg-white/30 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-8">
          <div className="mb-6">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {question.category}
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{question.question}</h3>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-50'
                      : showIncorrect
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{option}</span>
                    {showCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {showIncorrect && <XCircle className="h-5 w-5 text-red-600" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`p-4 rounded-lg mb-6 ${
              selectedAnswer === question.correctAnswer ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <h4 className="font-semibold mb-2 text-gray-900">Explanation:</h4>
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <div className="text-lg font-semibold text-gray-700">
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </div>

            {!showResult ? (
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'View Results'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
