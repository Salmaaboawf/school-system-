import { createUserWithEmailAndPassword } from "firebase/auth";
import auth, { db, storage } from "../config/firebase";
import { Schedule, SubjectType, TeacherType } from "../utils/types";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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

export const getTeacherNameById = async (teacherId: string) => {
  try {
    // Reference to the specific document in the 'teachers' collection
    const teacherRef = doc(db, "teachers", teacherId);

    // Fetch the document
    const teacherSnap = await getDoc(teacherRef);

    // Check if the document exists and return the data
    if (teacherSnap.exists()) {
      return teacherSnap.data(); // Returns the teacher data
    } else {
      console.log("No such teacher!");
      return null; // If the document does not exist
    }
  } catch (error) {
    console.error("Error getting teacher:", error);
    return null; // If there's an error, return null
  }
};

// ======================

const fetchSubjectName = async (subjectId: string): Promise<string | null> => {
  try {
    const subjectRef = doc(db, "subjects", subjectId);
    const subjectDoc = await getDoc(subjectRef);
    if (subjectDoc.exists()) {
      const subjectData = subjectDoc.data();
      return subjectData?.name || null;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching subject name for ID ${subjectId}: `, error);
    return null;
  }
};

const fetchLevelName = async (levelId: string): Promise<string | null> => {
  try {
    const levelRef = doc(db, "levels", levelId);
    const levelDoc = await getDoc(levelRef);
    if (levelDoc.exists()) {
      const levelData = levelDoc.data();
      return levelData?.name || null;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching level name for ID ${levelId}: `, error);
    return null;
  }
};

export const getTeacherSchedule = async (
  teacherId: string
): Promise<Schedule[]> => {
  // Fetch all schedules
  const schedulesRef = collection(db, "schedules");
  const scheduleSnapshot = await getDocs(schedulesRef);

  const schedules: Schedule[] = [];

  // Iterate through each schedule document
  for (const scheduleDoc of scheduleSnapshot.docs) {
    const scheduleData = scheduleDoc.data() as Schedule;
    const levelId = scheduleData.level_id;

    // Fetch level name using the helper function
    const levelName = await fetchLevelName(levelId);

    const daysCollectionRef = collection(scheduleDoc.ref, "days");
    const daysSnapshot = await getDocs(daysCollectionRef);

    const filteredDays: Day[] = [];

    // Iterate through each day document
    for (const dayDoc of daysSnapshot.docs) {
      const dayName = dayDoc.id; // Assuming the document ID is the day name
      const subjectsCollectionRef = collection(dayDoc.ref, "schedule_subjects");
      const subjectsSnapshot = await getDocs(subjectsCollectionRef);

      const subjects: SubjectType[] = [];

      // Iterate through each subject document
      for (const subjectDoc of subjectsSnapshot.docs) {
        const subjectData = subjectDoc.data() as SubjectType;

        // Check if the teacher_id matches
        if (subjectData.teacher_id === teacherId) {
          // Fetch subject name
          const subjectName = await fetchSubjectName(subjectData.subject_id);

          subjects.push({
            ...subjectData,
            subject_name: subjectName,
            teacher_name: "Teacher Name", // Fetch from 'teachers' collection if needed
          });
        }
      }

      // Add to filteredDays if subjects found
      if (subjects.length > 0) {
        filteredDays.push({
          dayName,
          subjects,
        });
      }
    }

    // Add to schedules if there are filtered days
    if (filteredDays.length > 0) {
      schedules.push({
        level_id: levelId,
        level_name: levelName,
        days: filteredDays,
      });
    }
  }

  return schedules;
};
