import { collection, addDoc, doc, setDoc } from "firebase/firestore";

async function addSchedule(levelId, daysData) {
  try {
    // Add a new schedule document with the level_id
    const scheduleDocRef = await addDoc(collection(db, "schedules"), {
      level_id: levelId,
    });

    // Iterate through each day in daysData
    for (const day of daysData) {
      const { name, subjects } = day;

      // Add each day to the days collection within the schedule document
      const dayDocRef = await addDoc(collection(scheduleDocRef, "days"), {
        name,
      });

      // Iterate through each subject in the subjects array
      for (const subject of subjects) {
        const { subject_id, teacher_id } = subject;

        // Add each subject to the schedules_subjects collection within the day document
        await addDoc(collection(dayDocRef, "schedules_subjects"), {
          subject_id,
          teacher_id,
        });
      }
    }

    console.log("Schedule added successfully!");
  } catch (error) {
    console.error("Error adding schedule: ", error);
  }
}
// data

const daysData = [
  {
    name: "Monday",
    subjects: [
      { subject_id: "math101", teacher_id: "teacherA" },
      { subject_id: "eng202", teacher_id: "teacherB" },
    ],
  },
  {
    name: "Tuesday",
    subjects: [
      { subject_id: "sci303", teacher_id: "teacherC" },
      { subject_id: "hist404", teacher_id: "teacherD" },
    ],
  },
];

addSchedule("level1", daysData);

// impelemt to get the data from a teacher
import { getDocs, query, where, collectionGroup } from "firebase/firestore";

async function getSchedulesForTeacher(teacherId) {
  try {
    // Query the schedules_subjects collection across all schedules and days
    const schedulesSubjectsQuery = query(
      collectionGroup(db, "schedules_subjects"),
      where("teacher_id", "==", teacherId)
    );

    const querySnapshot = await getDocs(schedulesSubjectsQuery);

    const results = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      results.push({
        ...data,
        dayId: doc.ref.parent.parent.id, // Get the day document ID
        scheduleId: doc.ref.parent.parent.parent.parent.id, // Get the schedule document ID
      });
    });

    console.log("Schedules for teacher: ", results);
    return results;
  } catch (error) {
    console.error("Error fetching schedules: ", error);
    return null;
  }
}

getSchedulesForTeacher("teacherA").then((schedules) => {
  if (schedules) {
    schedules.forEach((schedule) => {
      console.log(`Schedule ID: ${schedule.scheduleId}`);
      console.log(`Day ID: ${schedule.dayId}`);
      console.log(`Subject ID: ${schedule.subject_id}`);
      console.log(`Teacher ID: ${schedule.teacher_id}`);
    });
  } else {
    console.log("No schedules found for this teacher.");
  }
});
