import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  getDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Dispatch } from "@reduxjs/toolkit";
import { setSubject } from "../Redux/Slices/subjectSlice";
import { SubjectType } from "../utils/types";

export const addSubject = async (subjectData: {
  name: string;
  teacher: string; // The selected teacher's ID
  description: string;
  level_id: string;
  total_grade: number;
}) => {
  try {
    // 1. Add a new document to the "subjects" collection
    const subCollectionRef = collection(db, "subjects");
    const docRef = await addDoc(subCollectionRef, subjectData);

    // 2. Get the document ID for the subject
    const subjectId = docRef.id;

    // 3. Update the subject document with its ID
    await updateDoc(docRef, { id: subjectId });

    // 4. Update the selected teacher's document with the new subject
    const teacherRef = doc(db, "teachers", subjectData.teacher);
    await updateDoc(teacherRef, {
      subjects: arrayUnion(subjectId), // Add the new subject ID to the teacher's subjects array using arrayUnion
    });

    console.log("Subject added and teacher updated with the new subject");
  } catch (error) {
    console.error("Error adding subject: ", error);
  }
};

export const fetchSubjects = async (dispatch: Dispatch) => {
  try {
    // Reference to the subjects collection
    const subjectCollection = collection(db, "subjects");

    // Fetch all documents from the collection
    const subjectSnapshot = await getDocs(subjectCollection);

    // Extract the data from each document
    const subjectList = subjectSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Update state with the fetched subjects
    dispatch(setSubject([...subjectList]));
  } catch (error) {
    console.error("Error fetching subjects: ", error);
  }
};

export const getSubjectNameById = async (
  subjectId: string
): Promise<string> => {
  const subjectRef = doc(db, "subjects", subjectId);
  const subjectSnap = await getDoc(subjectRef);
  if (subjectSnap.exists()) {
    const subjectData = subjectSnap.data() as SubjectType;
    return subjectData.name;
  }
  return "Unknown Subject";
};
