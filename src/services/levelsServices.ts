import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { Dispatch } from "@reduxjs/toolkit";
import { setLevels } from "../Redux/Slices/levelsSlice";

export const addClass = async () => {
  try {
    const levelsDoref = doc(db, "levels", "Five");
    await setDoc(levelsDoref, { name: "Five" });
    const studentDoref = doc(db, "levels/Five/students", `initial@mm.com`);

    await setDoc(studentDoref, { name: "momen" });

    const subjectCollecRef = collection(studentDoref, "subjects");
    await setDoc(doc(subjectCollecRef, "initailSubject"), {
      subjectName: "initailSubject",
      grade: "",
      totalGrade: "100",
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchLevels = async (dispatch: Dispatch) => {
  try {
    // Reference to the levels collection
    const levelsCollection = collection(db, "levels");

    // Fetch all documents from the collection
    const levelsSnapshot = await getDocs(levelsCollection);

    // Extract the data from each document
    const levelsList = levelsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Update state with the fetched levels
    dispatch(setLevels([...levelsList]));
  } catch (error) {
    console.error("Error fetching levels: ", error);
  }
};
