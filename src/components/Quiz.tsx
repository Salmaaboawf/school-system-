// import { useEffect, useState } from "react";
// import img from "../assets/images/Blue Playful Space Landscape Blank Page Border.png";
// import { useAppSelector } from "../hooks/reduxHooks";
// import {
//   addGradeToStudent,
//   checkIfStudentCompletedQuiz,
//   getQuizQuestions,
//   markQuizAsCompleted,
// } from "../services/quizServices";
// import { useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const QuizPage = () => {
//   const divStyle = {
//     backgroundImage: `url(${img})`,
//     backgroundSize: "contain",
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "center",
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "20px",
//   };

//   const userInfo = useAppSelector((state) => state.user.user);
//   const [score, setScore] = useState(0);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [quizQuestions, setQuizQuestions] = useState([]);
//   const [answer, setAnswer] = useState("");
//   const [subject, setSubject] = useState(null); // Initialize with null
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { subjectId } = location.state || {};

//   // Ensure subjectId is properly assigned and is not undefined
//   useEffect(() => {
//     if (subjectId) {
//       setSubject(subjectId); // Set subjectId once it's available
//     }
//   }, [subjectId]);

//   // Check if student has already taken the quiz
//   const isVisitedQuizBefore = async (subject: string) => {
//     try {
//       const isVisited = await checkIfStudentCompletedQuiz(subject, userInfo.id);
//       if (isVisited) {
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "You can't take the same quiz two times",
//         }).then((res) => {
//           if (res.isConfirmed) {
//             navigate("/");
//           }
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Fetch quiz questions and handle quiz state
//   useEffect(() => {
//     if (subject) {
//       getQuizQuestions(subject, (questions) => {
//         setQuizQuestions([...questions]);
//         if (questions.length < 20) {
//           Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Exam not ready yet.",
//           }).then((res) => {
//             if (res.isConfirmed) {
//               navigate("/");
//             }
//           });
//         }
//       });

//       isVisitedQuizBefore(subject);
//     }
//   }, [subject]);

//   const currentQuestion = quizQuestions[currentQuestionIndex];

//   // Handle next question
//   const handleNextQuestion = () => {
//     if (answer) {
//       if (currentQuestionIndex < quizQuestions.length) {
//         if (
//           currentQuestion.options.indexOf(answer) ===
//           currentQuestion.correctAnswer
//         ) {
//           setScore((prev) => prev + 1);
//         }

//         if (currentQuestionIndex === quizQuestions.length - 1) {
//           setQuizCompleted(true);
//           markQuizAsCompleted(subject, userInfo.id);
//           addGradeToStudent({
//             studentId: userInfo.id,
//             subjectId: subject,
//             level_id: userInfo.class_id,
//             score: (score + 1).toString(),
//           });
//         } else {
//           setCurrentQuestionIndex((prev) => prev + 1);
//         }
//         setAnswer("");
//       }
//     }
//   };

//   const handleOptionChange = (e) => {
//     setAnswer(e.target.value);
//   };

//   return (
//     <>
//       <div style={divStyle}>
//         <div className="bg-white p-8 rounded-lg  max-w-lg w-full">
//           {!quizCompleted ? (
//             <>
//               <h1 className="text-2xl font-bold mb-4 text-center">{`Quiz: ${currentQuestion?.question}`}</h1>

//               <div className="mb-4">
//                 {currentQuestion?.options.map((option, index) => (
//                   <div key={index} className="flex items-center mb-2">
//                     <input
//                       type="radio"
//                       id={`option${index}`}
//                       name="quizOption"
//                       value={option}
//                       onChange={handleOptionChange}
//                       className="mr-2"
//                     />
//                     <label htmlFor={`option${index}`} className="text-lg">
//                       {option}
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-between mt-4">
//                 <button
//                   onClick={handleNextQuestion}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                 >
//                   Next
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div>
//               <h1 className="text-2xl font-bold mb-4 text-center">
//                 Quiz Completed!
//               </h1>
//               <h1 className="text-2xl font-bold mb-4 text-center">
//                 Your Score is {score} from {quizQuestions.length}
//               </h1>
//               <p className="text-lg text-center">
//                 Thank you for completing the quiz. Your answers have been
//                 recorded.
//               </p>
//               <div className="flex justify-center mt-4">
//                 <button
//                   onClick={() => {
//                     navigate("/");
//                   }}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                 >
//                   Go Home
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default QuizPage;
//-----------------
import { useEffect, useState, useRef } from "react";
import img from "../assets/images/Blue Playful Space Landscape Blank Page Border.png";
import { useAppSelector } from "../hooks/reduxHooks";
import {
  addGradeToStudent,
  checkIfStudentCompletedQuiz,
  getQuizQuestions,
  markQuizAsCompleted,
} from "../services/quizServices";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const QuizPage = () => {
  const divStyle = {
    backgroundImage: `url(${img})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  const userInfo = useAppSelector((state) => state.user.user);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [subject, setSubject] = useState(null); // Initialize with null
  const navigate = useNavigate();
  const location = useLocation();
  const { subjectId } = location.state || {};

  // Ref for the video element
  const videoRef = useRef(null);

  // Ensure subjectId is properly assigned and is not undefined
  useEffect(() => {
    if (subjectId) {
      setSubject(subjectId); // Set subjectId once it's available
    }
  }, [subjectId]);

  console.log(quizQuestions, currentQuestionIndex);

  // Check if student has already taken the quiz
  const isVisitedQuizBefore = async (subject: string) => {
    try {
      const isVisited = await checkIfStudentCompletedQuiz(subject, userInfo.id);
      if (isVisited) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You can't take the same quiz two times",
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

  // Fetch quiz questions and handle quiz state
  useEffect(() => {
    if (subject) {
      getQuizQuestions(subject, (questions) => {
        setQuizQuestions([...questions]);
        if (questions.length <20) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Exam not ready yet.",
          }).then((res) => {
            if (res.isConfirmed) {
              navigate("/");
            }
          });
        }
      });

      isVisitedQuizBefore(subject);
    }
  }, [subject]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Handle next question
  const handleNextQuestion = () => {
    if (answer) {
      if (currentQuestionIndex < quizQuestions.length) {
        if (
          currentQuestion.options.indexOf(answer) ===
          currentQuestion.correctAnswer
        ) {
          setScore((prev) => prev + 1);
        }

        if (currentQuestionIndex === quizQuestions.length - 1) {
          setQuizCompleted(true);
          markQuizAsCompleted(subject, userInfo.id);
          addGradeToStudent({
            studentId: userInfo.id,
            subjectId: subject,
            level_id: userInfo.class_id,
            score: (score + 1).toString(),
          });
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
        setAnswer("");
      }
    }
  };

  const handleOptionChange = (e) => {
    setAnswer(e.target.value);
  };

  return (
    <>
      <div style={divStyle}>
        <div className="bg-white p-8 rounded-lg max-w-lg w-full">
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
            </div>
          )}
        </div>
        {/* Add the video element for camera feed */}
        <video
          ref={videoRef}
          id="cameraFeed"
          autoPlay
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "320px",
            height: "240px",
            border: "2px solid #ccc",
            borderRadius: "8px",
          }}
        ></video>
      </div>
    </>
  );
};

export default QuizPage;
