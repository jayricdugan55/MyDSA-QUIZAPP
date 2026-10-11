import React from 'react';

interface Question {
  id: number;
  question: string;
  choices: string[];
  correctAnswer: number;
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  currentNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  currentNumber,
  totalQuestions
}) => {
  return (
    <div>
      <p className="progress-text">Question {currentNumber} of {totalQuestions}</p>
      <h2 className="question-text">{question.question}</h2>
      <div className="choices-container">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            className={`choice-btn ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => onSelectAnswer(index)}
          >
            {String.fromCharCode(65 + index)}. {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
