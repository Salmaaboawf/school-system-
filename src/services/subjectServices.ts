import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Dispatch } from "@reduxjs/toolkit";
import { setSubject } from "../Redux/Slices/subjectSlice";
export const addSubject = async (subjectData: { name: string, teacher: string, description: string,level_id:string,total_grade:number }) => {
  try {
    const subCollectionRef = collection(db, "subjects");
    await addDoc(subCollectionRef, subjectData);
    console.log("Subject added to Firestore");
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
