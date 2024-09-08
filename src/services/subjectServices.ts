import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  getDoc,
  doc,
  arrayUnion,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Dispatch } from "@reduxjs/toolkit";
import { setSubject } from "../Redux/Slices/subjectSlice";
import { SubjectType } from "../utils/types";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Function to upload image to Firebase Storage
export const uploadImageToStorage = async (file: File) => {
  const storage = getStorage();
  const storageRef = ref(storage, `subjects/${file.name}`);

  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};

export const addSubject = async (subjectData: {
  name: string;
  teacher: string; // The selected teacher's ID
  description: string;
  level_id: string;
  total_grade: number;
  photoURL: string;
}) => {
  try {
    console.log(subjectData);
    const { description, level_id, name, photoURL, teacher, total_grade } =
      subjectData;
    // 1. Add a new document to the "subjects" collection
    const subCollectionRef = collection(db, "subjects");
    const docRef = await addDoc(subCollectionRef, {
      description,
      level_id,
      name,
      photoURL,
      teacher,
      total_grade,
    });

    // 2. Get the document ID for the subject
    const docId = docRef.id;

    // 3. Update the document with the ID field
    await updateDoc(docRef, { id: docId });

    // 4. Update the selected teacher's document with the new subject
    const teacherRef = doc(db, "teachers", subjectData.teacher);
    await updateDoc(teacherRef, {
      subjects: arrayUnion(docId), // Add the new subject ID to the teacher's subjects array using arrayUnion
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

export const fetchSubjectsByLevel = async (levelId: string) => {
  try {
    const subjectCollection = collection(db, "subjects");

    const q = query(subjectCollection, where("level_id", "==", levelId));

    const subjectSnapshot = await getDocs(q);

    const subjectList = subjectSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(subjectList);
    return subjectList;
    // dispatch(setSubject([...subjectList]));
  } catch (error) {
    console.error("Error fetching subjects: ", error);
  }
};
export const fetchSubjectsByteacher_id = async (teacherId: string) => {
  try {
    console.log(teacherId)
    const subjectCollection = collection(db, "subjects");

    const q = query(subjectCollection, where("teacher", "==", teacherId));

    const subjectSnapshot = await getDocs(q);
console.log(subjectSnapshot)
    const subjectList = subjectSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(subjectList);
    return subjectList;
    // dispatch(setSubject([...subjectList]));
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
