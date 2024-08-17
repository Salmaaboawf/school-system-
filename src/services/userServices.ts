import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
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

export const fetchParents = async (
  setParents: (parentsList: ParentType[]) => void
) => {
  try {
    // Reference to the levels collection
    const parentsCollection = collection(db, "parents");

    const unsubscribe = onSnapshot(parentsCollection, (studentsSnapshot) => {
      const parentsList = studentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as ParentType),
      }));

      setParents([...parentsList]);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  } catch (error) {
    console.error("Error fetching levels: ", error);
  }
};

export const addParent = async (value: ParentType) => {
  try {
    const childerenIds = value.children?.map((item) => item.id);
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
      Children: childerenIds,
    });

    childerenIds?.forEach(async (id) => {
      try {
        // Reference to the specific document inside the collection
        const docRef = doc(db, "students", `${id}`);

        // Update the specific field with the new value
        await updateDoc(docRef, {
          parent: user.uid,
        });
      } catch (error) {
        console.log(error);
      }
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

export const fetchStudents = (
  setStudents: (studentsList: StudentType[]) => void
) => {
  try {
    const studentsCollection = collection(db, "students");
    const q = query(studentsCollection, where("parent", "==", ""));

    // Use onSnapshot to listen for real-time updates
    const unsubscribe = onSnapshot(q, (studentsSnapshot) => {
      const studentsList = studentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as StudentType),
      }));

      setStudents([...studentsList]);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  } catch (error) {
    console.error("Error fetching levels: ", error);
  }
};

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
    if (parent.length > 0) {
      addChildToParent(parent, user.uid);
    }
  } catch (error) {
    console.log(error);
  }
};

const addChildToParent = async (parent: string, userId: string) => {
  const docRef = doc(db, "parents", parent);

  // Fetch the document
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Get the current array from the document
    const data = docSnap.data();
    const currentArray = data.Children || [];

    // Check if the string already exists in the array
    if (currentArray.includes(userId)) {
      console.log("The string already exists in the array.");
      return; // Exit if the string is already present
    }

    // Update the document with the new string
    await updateDoc(docRef, {
      Children: arrayUnion(userId), // arrayUnion ensures no duplicates
    });

    console.log("Document updated successfully");

    console.log("Subjects added successfully! and student aswell");
  } else {
    console.log("No such document!");
  }
};
