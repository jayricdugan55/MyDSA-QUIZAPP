import { useState } from 'react';

export type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

export type AnswerStatus = 'correct' | 'wrong' | null;

type Page = 'home' | 'quiz' | 'result';

const questions: Question[] = [
  {
    id: 1,
    question: "Which data structure follows First-In, First-Out (FIFO)?",
    options: ["A. Stack", "B. Tree", "C. Array", "D. Queue"],
    answer: "D. Queue"
  },
  {
    id: 2,
    question: "Which search checks every element from start to finish?",
    options: ["A. Quick Search", "B. Linear Search", "C. Binary Search", "D. Fast Search"],
    answer: "B. Linear Search"
  },
  {
    id: 3,
    question: "What does sorting mean?",
    options: ["A. Create data", "B. Arrange in order", "C. Copy data", "D. Delete data"],
    answer: "B. Arrange in order"
  },
  {
    id: 4,
    question: "Which data structure uses LIFO (Last-In, First-Out)?",
    options: ["A. Queue", "B. Stack", "C. Array", "D. Linked List"],
    answer: "B. Stack"
  },
  {
    id: 5,
    question: "What is the time complexity of Linear Search in the worst case?",
    options: ["A. O(1)", "B. O(log n)", "C. O(n)", "D. O(n²)"],
    answer: "C. O(n)"
  },
  {
    id: 6,
    question: "Binary search works efficiently on which type of list?",
    options: ["A. Unsorted", "B. Sorted", "C. Random", "D. Empty"],
    answer: "B. Sorted"
  },
  {
    id: 7,
    question: "Which data structure stores elements in contiguous memory locations?",
    options: ["A. Linked List", "B. Stack", "C. Array", "D. Queue"],
    answer: "C. Array"
  },
  {
    id: 8,
    question: "A tree with no more than 2 children per node is called:",
    options: ["A. General Tree", "B. Binary Tree", "C. Tertiary Tree", "D. Forest"],
    answer: "B. Binary Tree"
  },
  {
    id: 9,
    question: "Which traversal visits root first, then left, then right?",
    options: ["A. In-order", "B. Post-order", "C. Pre-order", "D. Level-order"],
    answer: "C. Pre-order"
  },
  {
    id: 10,
    question: "What is a collection of related data items called?",
    options: ["A. Function", "B. Data Structure", "C. Variable", "D. Loop"],
    answer: "B. Data Structure"
  }
];

function App() {
  const [page, setPage] = useState<Page>('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredStatus, setAnsweredStatus] = useState<AnswerStatus[]>(Array(questions.length).fill(null));
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const shuffleArray = (array: Question[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  const startQuiz = () => {
    const shuffled = shuffleArray(questions);
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredStatus(Array(questions.length).fill(null));
    setSelectedIndex(null);
    setPage('quiz');
  };

  const handleSelect = (index: number) => {
    // Kung may status na, hindi na pwedeng baguhin
    if (answeredStatus[currentQuestion] !== null) return;
    setSelectedIndex(index);
  };

  const nextQuestion = () => {
    if (selectedIndex === null) return;

    // I-check kung tama o mali, at ilagay sa status
    const selectedOption = shuffledQuestions[currentQuestion].options[selectedIndex];
    const isCorrect = selectedOption === shuffledQuestions[currentQuestion].answer;
    
    const newStatus = [...answeredStatus];
    newStatus[currentQuestion] = isCorrect ? 'correct' : 'wrong';
    setAnsweredStatus(newStatus);
    
    if (isCorrect) setScore(prev => prev + 1);

    // Pumunta sa susunod o Result page
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedIndex(null);
    } else {
      setPage('result');
    }
  };

  const goHome = () => {
    setPage('home');
  };

  return (
    <div className="app-container">
      {page === 'home' && (
        <div className="quiz-card home-card">
          <h1>📖 Data Structures & Algorithms Quiz</h1>
          <p>Let's test your knowledge!</p>
          <button className="start-btn" onClick={startQuiz}>Start Quiz 🚀</button>
        </div>
      )}

      {page === 'quiz' && shuffledQuestions.length > 0 && (
        <div className="quiz-card">
          <button className="home-btn" onClick={goHome}>🏠 Home</button>

          <h2 className="quiz-title">DSA Quiz</h2>
          <p className="quiz-subtitle">Choose the best answer</p>

          {/* Status Numbers with Lines - Makikita lang pag tapos na sa item */}
          <div className="status-icons">
            {answeredStatus.map((status, index) => (
              <div key={index} className="status-item">
                <span className={`status-number ${status} ${index === currentQuestion ? 'current' : ''}`}>
                  {status === null ? index + 1 : (status === 'correct' ? '✓' : '✗')}
                </span>
                <div className={`status-line ${status}`}></div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill"
              style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
            ></div>
          </div>

          <p className="question-count">Question {currentQuestion + 1} of {shuffledQuestions.length}</p>

          <p className="question-text">{shuffledQuestions[currentQuestion].question}</p>

          <div className="choices-container">
            {shuffledQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`choice-btn 
                  ${selectedIndex === index ? 'selected' : ''}
                  ${answeredStatus[currentQuestion] !== null ? 'locked' : ''}`}
                onClick={() => handleSelect(index)}
                disabled={answeredStatus[currentQuestion] !== null}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="feedback-section">
            <button 
              className="next-btn" 
              onClick={nextQuestion}
              disabled={selectedIndex === null}
            >
              {currentQuestion < shuffledQuestions.length - 1 ? 'Next Question →' : 'Finish Quiz ✓'}
            </button>
          </div>
        </div>
      )}

      {page === 'result' && (
        <div className="quiz-card result-card">
          <h2>{score >= 7 ? '🎉 Great Job!' : '📚 Try Again!'}</h2>
          <p className="final-score">{score}/{questions.length}</p>
          <p className="score-text">You scored {score * 10}%</p>
          
          <div className="result-buttons">
            {score < 7 && (
              <button className="retake-btn" onClick={startQuiz}>Retake Quiz</button>
            )}
            <button className="home-btn-result" onClick={goHome}>🏠 Go Home</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

