import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const NotificationList = () => {
  const [quizSubjects, setQuizSubjects] = useState([]);
  const studentInfo = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizNotifications = async () => {
      try {
        const subjectsRef = collection(db, "subjects");
        const subjectsSnapshot = await getDocs(subjectsRef);

        const notificationSubjects = [];

        for (const subjectDoc of subjectsSnapshot.docs) {
          const subjectData = subjectDoc.data();
          const { visitedExam = [], name } = subjectData;

          if (visitedExam.includes(studentInfo.id)) {
            continue;
          }

          const quizRef = collection(db, "subjects", subjectDoc.id, "quiz");
          const quizSnapshot = await getDocs(quizRef);

          if (quizSnapshot.size >=5) {
            notificationSubjects.push({
              id: subjectDoc.id,
              name: name || "Unnamed Subject",
              totalQuizzes: quizSnapshot.size,
            });
          }
        }

        setQuizSubjects([...notificationSubjects]);
      } catch (error) {
        console.error("Error fetching quiz notifications: ", error);
      }
    };

    fetchQuizNotifications();
  }, [studentInfo.id]);

  return (
    <ul
      className="py-2 flex flex-col items-start gap-y-4 px-4 bg-white rounded-lg shadow-lg max-h-[300px] overflow-y-auto"
      aria-labelledby="user-menu-button"
    >
      {quizSubjects.length > 0 ? (
        quizSubjects.map((subject) => (
          <li key={subject.id} className="w-full">
            <button
              className="text-lg font-semibold w-full text-left py-2 px-3 hover:bg-[#f0f0f0] transition duration-200 rounded-md"
              onClick={() => {
                navigate("/quiz", { state: { subjectId: subject.id } });
              }}
            >
              Subject: {subject.name} - Quizzes Available: {subject.totalQuizzes}
            </button>
          </li>
        ))
      ) : (
        <li className="text-gray-500 text-center py-2">No notifications</li>
      )}
    </ul>
  );
};

export default NotificationList;
