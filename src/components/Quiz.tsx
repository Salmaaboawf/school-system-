import { useEffect, useState } from "react";
import img from "../assets/images/Blue Playful Space Landscape Blank Page Border.png";
import { useAppSelector } from "../hooks/reduxHooks";
import {
  checkIfStudentCompletedQuiz,
  getQuizQuestions,
  markQuizAsCompleted,
} from "../services/quizServices";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const QuizPage = () => {
  const divStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: "contain", // لجعل الصورة تظهر بالكامل
    backgroundRepeat: "no-repeat", // لمنع تكرار الصورة
    backgroundPosition: "center", // لضبط الصورة في منتصف الـ div
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  // console.log(); test updates

  const userInfo = useAppSelector((state) => state.user.user);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [asnswer, setAnswer] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { subjectId } = location.state || {};
  console.log(subjectId);

  const isVisitedQuizBefore = async () => {
    try {
      const isVisited = await checkIfStudentCompletedQuiz(
        subjectId,
        userInfo.id
      );
      if (isVisited) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You can't take same quiz two times",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/");
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuizQuestions(subjectId, (questions) => {
      setQuizQuestions([...questions]);
      console.log(quizQuestions);
    });

    if (quizQuestions.length < 20) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Exam not ready yet.",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/");
        }
      });
      return;
    }

    isVisitedQuizBefore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (asnswer) {
      if (currentQuestionIndex <= quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        if (
          currentQuestion.options.indexOf(asnswer) ==
          currentQuestion.correctAnswer
        ) {
          setScore((prev) => prev + 1);
        }
        setAnswer("");
        if (currentQuestionIndex == quizQuestions.length - 1) {
          setQuizCompleted(true);
          markQuizAsCompleted(subjectId, userInfo.id);
        }
      }
    }
  };

  const handleOptionChange = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <>
      <div style={divStyle}>
        <div className="bg-white p-8 rounded-lg  max-w-lg w-full">
          {!quizCompleted ? (
            <>
              <h1 className="text-2xl font-bold mb-4 text-center">{`Quiz: ${currentQuestion?.question}`}</h1>

              <div className="mb-4">
                {currentQuestion?.options.map((option, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`option${index}`}
                      name="quizOption"
                      value={option}
                      onChange={handleOptionChange}
                      className="mr-2"
                    />
                    <label htmlFor={`option${index}`} className="text-lg">
                      {option}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleNextQuestion}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-4 text-center">
                Quiz Completed!
              </h1>
              <h1 className="text-2xl font-bold mb-4 text-center">
                Your Score is {score} from {quizQuestions.length}
              </h1>
              <p className="text-lg text-center">
                Thank you for completing the quiz. Your answers have been
                recorded.
              </p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Go Home
                </button>
              </div>
              {/* Optionally, display results or feedback here */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizPage;
