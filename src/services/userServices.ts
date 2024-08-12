import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { setUser } from "../Redux/Slices/userSlice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveLoggedUser = async (userId: string, dispatch: any) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      localStorage.setItem("userId", JSON.stringify(userDocSnap.data().id));
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
    const userDocRef = doc(db, "users", userId);
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
