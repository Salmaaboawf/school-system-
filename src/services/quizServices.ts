import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

// Function to get quiz questions in real-time using Firestore onSnapshot
export const getQuizQuestions = (
  subjectId: string,
  callback: (questions: any[]) => void
) => {
  try {
    const questionsRef = collection(db, "subjects", subjectId, "quiz");

    // Listen to real-time updates from Firestore using onSnapshot
    const unsubscribe = onSnapshot(questionsRef, (snapshot) => {
      const questions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Pass the fetched questions to the callback
      callback(questions);
    });

    return unsubscribe; // Return the unsubscribe function to stop listening when needed
  } catch (error) {
    console.error("Error fetching quiz questions: ", error);
  }
};

export const clearQuizQuestions = async (subjectId: string) => {
  try {
    const questionsRef = collection(db, "subjects", subjectId, "quiz");
    const querySnapshot = await getDocs(questionsRef);

    const deletePromises = querySnapshot.docs.map((docSnapshot) =>
      deleteDoc(doc(db, "subjects", subjectId, "quiz", docSnapshot.id))
    );

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    // Reset visitedExam array to [""] in the subject document
    const subjectRef = doc(db, "subjects", subjectId);
    await updateDoc(subjectRef, {
      visitedExam: [""], // Reset the visitedExam array
    });

    console.log("All quiz questions deleted successfully");
  } catch (error) {
    console.error("Error clearing quiz questions: ", error);
  }
};

// Function to mark the quiz as completed for the student
export const markQuizAsCompleted = async (
  subjectId: string,
  studentId: string
) => {
  try {
    const quizDocRef = doc(db, "subjects", subjectId); // Use the correct document ID for the quiz

    // Add student ID to the visitedExam array
    await updateDoc(quizDocRef, {
      visitedExam: arrayUnion(studentId), // Push the studentId to visitedExam array
    });

    console.log("Student marked as completed.");
  } catch (error) {
    console.error("Error marking quiz as completed: ", error);
  }
};

export const checkIfStudentCompletedQuiz = async (
  subjectId: string,
  studentId: string
) => {
  try {
    const quizDocRef = doc(db, "subjects", subjectId); // Replace "quizDocId" with actual quiz document ID
    const quizDoc = await getDoc(quizDocRef);

    if (quizDoc.data().visitedExam.includes(studentId)) {
      console.log("this student visited the exam");
      return true;
    } else {
      console.log("this student not visited the exam");
      return false;
    }
  } catch (error) {
    console.error("Error checking quiz completion status: ", error);
    return false;
  }
};
