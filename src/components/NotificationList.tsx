import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const NotificationList = () => {
  const [quizSubjects, setQuizSubjects] = useState([]);
  const studentInfo = useAppSelector((state) => state.user.user); // Assuming student ID is here
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizNotifications = async () => {
      try {
        // Fetch all subjects
        const subjectsRef = collection(db, "subjects");
        const subjectsSnapshot = await getDocs(subjectsRef);

        const notificationSubjects = [];

        // Loop through each subject
        for (const subjectDoc of subjectsSnapshot.docs) {
          const subjectData = subjectDoc.data();

          // Check the visitedExam array
          const { visitedExam = [], name } = subjectData;

          // Skip subjects where the student has already taken the exam
          if (visitedExam.includes(studentInfo.id)) {
            continue; // Skip this subject if the student ID is present in visitedExam
          }

          // Reference to the quiz subcollection
          const quizRef = collection(db, "subjects", subjectDoc.id, "quiz");
          const quizSnapshot = await getDocs(quizRef);

          // Check if the quiz collection has 20 or more documents
          if (quizSnapshot.size >= 1) {
            notificationSubjects.push({
              id: subjectDoc.id,
              name: name || "Unnamed Subject",
              totalQuizzes: quizSnapshot.size,
            });
          }
        }

        // Set the subjects that meet the criteria
        setQuizSubjects(notificationSubjects);
      } catch (error) {
        console.error("Error fetching quiz notifications: ", error);
      }
    };

    fetchQuizNotifications();
  }, [studentInfo.id]);

  return (
    <ul
      className="py-2 flex flex-col items-start gap-y-4 px-4"
      aria-labelledby="user-menu-button"
    >
      {quizSubjects.length > 0 ? (
        quizSubjects.map((subject) => (
          <button
            key={subject.id}
            className="text-lg font-semibold "
            onClick={() => {
              navigate("/quiz", { state: { subjectId: subject.id } });
            }}
          >
            Subject: {subject.name} - Quizzes Available: {subject.totalQuizzes}
          </button>
        ))
      ) : (
        <li>notification is empty</li>
      )}
    </ul>
  );
};

export default NotificationList;
