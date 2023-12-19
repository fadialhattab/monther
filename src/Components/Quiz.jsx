import React, { useState, useEffect } from 'react';
import '../App.css'; // Import your CSS file

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [timeLeft, setTimeLeft] = useState(60); // Time limit in seconds (300 seconds = 5 minutes)
  const [selectedCategory, setSelectedCategory] = useState('General'); // Default category

  const categories = ['General', 'Science', 'History', 'Geography']; // Example categories

  const questions = {
    'General': [
      {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
      },
      {
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
        correctAnswer: 'Leonardo da Vinci',
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
        correctAnswer: 'Mars',
      },
      {
        question: 'What is the largest mammal in the world?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctAnswer: 'Blue Whale',
      },
      {
        question: 'Who wrote the play "Romeo and Juliet"?',
        options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain'],
        correctAnswer: 'William Shakespeare',
      },
      // Add more general questions...
    ],
    'Science': [
      {
        question: 'Who developed the theory of relativity?',
        options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Stephen Hawking'],
        correctAnswer: 'Albert Einstein',
      },
      {
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
        correctAnswer: 'Leonardo da Vinci',
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
        correctAnswer: 'Mars',
      },
      {
        question: 'What is the largest mammal in the world?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctAnswer: 'Blue Whale',
      },
      {
        question: 'Who wrote the play "Romeo and Juliet"?',
        options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain'],
        correctAnswer: 'William Shakespeare',
      },
      // Add more science questions...
    ],
    'History': [
      {
        question: 'In which year did World War I begin?',
        options: ['1914', '1929', '1939', '1918'],
        correctAnswer: '1914',
      },
      {
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
        correctAnswer: 'Leonardo da Vinci',
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
        correctAnswer: 'Mars',
      },
      {
        question: 'What is the largest mammal in the world?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctAnswer: 'Blue Whale',
      },
      {
        question: 'Who wrote the play "Romeo and Juliet"?',
        options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain'],
        correctAnswer: 'William Shakespeare',
      },
      // Add more history questions...
    ],
    'Geography': [
      {
        question: 'What is the longest river in the world?',
        options: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
        correctAnswer: 'Nile',
      },
      {
        question: 'Who painted the Mona Lisa?',
        options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
        correctAnswer: 'Leonardo da Vinci',
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Jupiter', 'Mercury'],
        correctAnswer: 'Mars',
      },
      {
        question: 'What is the largest mammal in the world?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        correctAnswer: 'Blue Whale',
      },
      {
        question: 'Who wrote the play "Romeo and Juliet"?',
        options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Mark Twain'],
        correctAnswer: 'William Shakespeare',
      },
      // Add more geography questions...
    ],
    // Add more categories and their respective questions...
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setQuizEnded(false); // Reset quiz status when category changes
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(300); // Reset timer to default time (300 seconds = 5 minutes)
    setAnsweredQuestions({});
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0 || quizEnded) {
          clearInterval(timer);
          setQuizEnded(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizEnded]);

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[selectedCategory][currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions[selectedCategory].length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setQuizEnded(true);
    }
  };

  const handleBackClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="app-container">
      <div className="category-selector">
        <h2>Select a Category:</h2>
        <div className="categories">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              className={category === selectedCategory ? 'selected' : ''}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-container">
        <h1>Quiz App - {selectedCategory}</h1>
        {!quizEnded && (
          <div className="question-container">
            <h2>Question {currentQuestion + 1}</h2>
            <p>{questions[selectedCategory][currentQuestion].question}</p>
            <div className="options-container">
              {questions[selectedCategory][currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  className="option-button"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {quizEnded && (
          <div className="result-container">
            <h2>Quiz ended!</h2>
            <p>Your score is: {score} out of {questions[selectedCategory].length}</p>
            {/* Additional content after the quiz ends */}
          </div>
        )}
      </div>

      <div className="timer-container">
        <p className="timer">Time Left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</p>
      </div>

      <div className="back-button-container">
        <button className="back-button" onClick={handleBackClick}>Back</button>
      </div>
    </div>
  );
};

export default Quiz;
