import React from 'react';

interface QuizHeaderProps {
  title: string;
  subtitle?: string;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="quiz-header">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default QuizHeader;