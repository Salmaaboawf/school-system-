import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import auth, { db } from "../config/firebase";
import { setUser } from "../Redux/Slices/userSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ParentType, StudentType, TeacherType } from "../utils/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveLoggedUser = async (userId: string, dispatch: any) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      localStorage.setItem(
        "userId",
        JSON.stringify(`${userDocSnap.data().id} ${userDocSnap.data().type}`)
      );
      dispatch(setUser(userDocSnap.data()));
      console.log("Document data:", userDocSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserById = async (userId: string, dispatch: any) => {
  try {
    const userDocRef = doc(
      db,
      "users",
      userId.toString().split(" ")[0].slice(1)
    );
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      dispatch(setUser(userDocSnap.data()));
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

// add  parent
export const addParent = async (value: ParentType) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "parents", user.uid), {
      id: user.uid,
      name: value.name,
      address: value.address,
      gender: value.gender,
      email: value.email,
      phone: value.phoneNumber,
      Children: [" QOossQnTNmUjKuZCov2c "],
    });
  } catch (error) {
    console.log(error);
  }
};

// add teacher

export const addTeacher = async (value: TeacherType) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "teachers", user.uid), {
      teacherId: user.uid,
      name: value.name,
      gender: value.gender,
      email: value.email,
      phone: value.phoneNumber,
      subject: value.subject,
      age: value.age,
    });
  } catch (error) {
    console.log(error);
  }
};

// add sudent
export const addStudent = async (value: StudentType) => {
  const subjectsArr = [
    {
      subjectName: "math",
      grade: "",
      totalGrade: "100",
    },
    {
      subjectName: "arabic",
      grade: "",
      totalGrade: "100",
    },
    {
      subjectName: "english",
      grade: "",
      totalGrade: "100",
    },
  ];

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );
    const user = userCredential.user;

    const studentDoref = doc(
      db,
      `levels/${value.class}/students`,
      `${user.email}`
    );

    const {
      name,
      address,
      age,
      class: studentClass,
      email,
      gender,
      phoneNumber,
      type = "student",
    }: StudentType = value;

    await setDoc(studentDoref, {
      name,
      address,
      age,
      studentClass,
      email,
      gender,
      phoneNumber,
      type,
    });

    const subjectCollecRef = collection(studentDoref, "subjects");

    subjectsArr.forEach(async (item) => {
      await setDoc(doc(subjectCollecRef, item.subjectName), {
        subjectName: item.subjectName,
        grade: "",
        totalGrade: "100",
      });
    });

    console.log("Subjects added successfully! and student aswell");
  } catch (error) {
    console.log(error);
  }
};
