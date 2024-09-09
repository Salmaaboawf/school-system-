import React, { useState } from 'react';
import img from "../assets/images/Blue Playful Space Landscape Blank Page Border.png";

const QuizPage = () => {
  const divStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: 'contain', // لجعل الصورة تظهر بالكامل
    backgroundRepeat: 'no-repeat', // لمنع تكرار الصورة
    backgroundPosition: 'center', // لضبط الصورة في منتصف الـ div
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };

  // باقي الكود كما هو ...

  const questions = [
    {
      id: 1,
      text: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      answer: 'Paris',
    },
    {
      id: 2,
      text: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      answer: 'Mars',
    },
    // Add more questions as needed
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionChange = (e) => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: e.target.value,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setQuizCompleted(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div style={divStyle}>
        <div className="bg-white p-8 rounded-lg  max-w-lg w-full">
          {!quizCompleted ? (
            <>
              <h1 className="text-2xl font-bold mb-4 text-center">{`Quiz: ${currentQuestion.text}`}</h1>

              <div className="mb-4">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`option${index}`}
                      name="quizOption"
                      value={option}
                      checked={answers[currentQuestion.id] === option}
                      onChange={handleOptionChange}
                      className="mr-2"
                    />
                    <label htmlFor={`option${index}`} className="text-lg">{option}</label>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Next
                </button>
              </div>

              <div className="mt-4 text-right">
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-4 text-center">Quiz Completed!</h1>
              <p className="text-lg text-center">Thank you for completing the quiz. Your answers have been recorded.</p>
              {/* Optionally, display results or feedback here */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPage;
