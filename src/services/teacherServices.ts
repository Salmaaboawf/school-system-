import { createUserWithEmailAndPassword } from "firebase/auth";
import auth, { db , storage } from "../config/firebase";
import { SubjectType, TeacherType } from "../utils/types";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const addTeacher = async (teacherInfo: TeacherType, photo?: File) => {
    try {

        let photoURL = "";
        if (photo) {
          const storageRef = ref(storage, `images/${photo.name}`);
          await uploadBytes(storageRef, photo);
          photoURL = await getDownloadURL(storageRef);
        }

      const teacherLevelsIds = teacherInfo.levels.map((item) => item.id);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        teacherInfo.email,
        teacherInfo.password
      );
      console.log(`esraa ${userCredential}`);
      const user = userCredential.user;
      console.log(`esraa ${user}`);
  
      const teacherRef = doc(db, "teachers", `${user.uid}`);
  
      const {
        name,
        email,
        gender,
        phoneNumber,
        age,
        subject,
        description,
        role = "teacher",
      }: TeacherType = teacherInfo;
  
      await setDoc(teacherRef, {
        id: user.uid,
        name,
        email,
        gender,
        phoneNumber,
        age,
        subject,
        role,
        description,
        levels_Ids: teacherLevelsIds,
        photoURL,
        // photo,
      });
      console.log("Teacher added successfully!");
    } catch (error) {
      console.log(error);
    }
  };


  // export const fetchTeachers = async () => {
  //   try {
  //     const teachersCollection = collection(db, "teachers");
  //     const teachersSnapshot = await getDocs(teachersCollection);
  //     const teachersList = teachersSnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...(doc.data() as TeacherType),
  //     }));
  
  //     console.log("Teachers List:", teachersList);
  //     return teachersList;
  //   } catch (error) {
  //     console.error("Error fetching levels: ", error);
  //   }
  // };

  export const fetchTeachers = async () => {
    try {
      const teachersCollection = collection(db, "teachers");
      const teachersSnapshot = await getDocs(teachersCollection);
      
      // Fetch all subjects at once
      const subjectsCollection = collection(db, "subjects");
      const subjectsSnapshot = await getDocs(subjectsCollection);
      const subjectsList = subjectsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      // Create a map for quick lookup of subject names by ID
      const subjectMap = subjectsList.reduce((map, subject) => {
        map[subject.id] = subject;
        return map;
      }, {} as SubjectType);
  
      // Process teachers and add subject names
      const teachersList = teachersSnapshot.docs.map((doc) => {
        const teacherData = doc.data() as TeacherType;
        const subject = subjectMap[teacherData.subject]; // Get the subject details
        return {
          id: doc.id,
          ...teacherData,
          subjectName: subject ? subject.name : "Unknown", // Add subject name or fallback
        };
      });
  
      console.log("Teachers List:", teachersList);
      return teachersList;
    } catch (error) {
      console.error("Error fetching teachers: ", error);
    }
  };