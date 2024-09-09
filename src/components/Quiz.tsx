import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../config/firebase';
import img from "../assets/images/Blue Playful Space Landscape Blank Page Border.png";

const QuizPage = () => {
  // const { subjectId } = useParams(); // جلب معرف المادة من URL
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);



  const { subjectId } = useParams();
useEffect(() => {
  console.log("Subject ID from URL:", subjectId); // للتحقق من أن الـ subjectId يتم جلبه بشكل صحيح من URL
  fetchQuestions();
}, [subjectId]);

  const divStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      
      console.log("Subject ID:", subjectId); // تحقق من وجود subjectId
      if (!subjectId) {
        setError("Subject ID is missing.");
        return;
      }
  
      // جلب الأسئلة من الـ subcollection "Quiz" بناءً على subjectId
      const quizCollectionRef = collection(db, "subjects", subjectId, "quiz");
      const quizSnapshot = await getDocs(quizCollectionRef);
      
      if (quizSnapshot.empty) {
        setError("No quiz questions found for this subject.");
        return;
      }
      
      const quizData = quizSnapshot.docs.map(doc => doc.data());
      setQuestions(quizData);
      console.log("Fetched Questions:", quizData); // تحقق من البيانات المسترجعة
      
    } catch (error) {
      setError("Failed to fetch quiz questions.");
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchQuestions();
  }, [subjectId]);
  

  const handleOptionChange = (e) => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex]?.id]: e.target.value,
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
    <div style={divStyle}>
      <div className="bg-white p-8 rounded-lg max-w-lg w-full">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : !quizCompleted ? (
          <>
            <h1 className="text-2xl font-bold mb-4 text-center">{`Quiz: ${currentQuestion?.question}`}</h1>

            <div className="mb-4">
              {currentQuestion?.options?.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`option${index}`}
                    name="quizOption"
                    value={option}
                    checked={answers[currentQuestion?.id] === option}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
