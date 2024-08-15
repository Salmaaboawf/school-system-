import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

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
