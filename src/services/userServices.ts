import { doc, getDoc, setDoc } from "firebase/firestore";
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
        JSON.stringify(
          `${userDocSnap.data().id.toString().trim()} ${
            userDocSnap.data().role
          }`
        )
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

export const addTeacher = async (teacherInfo : TeacherType) => {
  try{

    const userCredential = await createUserWithEmailAndPassword(auth,teacherInfo.email , teacherInfo.password);
    console.log(`esraa ${userCredential}`)
    const user =  userCredential.user;
    console.log(`esraa ${user}`)

    const teacherRef = doc(db,'teachers',`${user.uid}`)

    const {
      name,
      email,
      gender,
      phoneNumber,
      age,
      subject = 'subjectID',
      role = 'teacher',
      levels = ['one','two'],
    }: TeacherType = teacherInfo

    await setDoc(teacherRef,{
      name,
      email,
      gender,
      phoneNumber,
      age,
      subject,
      role,
      levels,
    })
    console.log('Teacher added successfully!');
  }

  catch(error){
    console.log(error)
  }

}

// add sudent
export const addStudent = async (value: StudentType) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      value.email,
      value.password
    );
    const user = userCredential.user;

    const studentDoref = doc(db, `students`, `${user.uid}`);

    const {
      name,
      address,
      age,
      class: class_id,
      email,
      gender,
      phoneNumber,
      parent,
      role = "student",
    }: StudentType = value;

    await setDoc(studentDoref, {
      id: user.uid,
      name,
      address,
      age,
      class_id,
      email,
      gender,
      phoneNumber,
      role,
      parent,
    });

    console.log("Subjects added successfully! and student aswell");
  } catch (error) {
    console.log(error);
  }
};
