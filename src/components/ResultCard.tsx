import React from 'react';

interface ResultCardProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  const passed = score >= 7;

  return (
    <div className="result-card">
      <h2>{passed ? '🎉 Great Job!' : '📚 Try Again!'}</h2>
      <div className="score-display">{score}/{total}</div>
      <p className="score-text">You scored {percentage}%</p>
      <p className={passed ? 'pass-text' : 'fail-text'}>
        {passed ? 'You passed! ✅' : 'Below 7 — Retake to try again! 💪'}
      </p>
      <div className="button-group">
        <button className="btn-primary" onClick={onRestart}>
          {passed ? 'Start New Quiz' : 'Retake Quiz'}
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
