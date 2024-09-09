import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
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

    console.log("All quiz questions deleted successfully");
  } catch (error) {
    console.error("Error clearing quiz questions: ", error);
  }
};
