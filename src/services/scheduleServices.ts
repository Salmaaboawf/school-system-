import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const fetchSchedule = async (levelId: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scheduleData: { level_id: string; days: any[] } = {
    level_id: "",
    days: [],
  };

  try {
    // Fetch the main schedule document
    const scheduleDocRef = doc(db, "schedules", levelId);
    const scheduleDocSnap = await getDoc(scheduleDocRef);

    if (scheduleDocSnap.exists()) {
      scheduleData.level_id = scheduleDocSnap.id;
      scheduleData.days = [];

      // Fetch each day subcollection
      const days = ["sunday", "monday", "tuesday", "wednesday", "thursday"];
      for (const day of days) {
        const dayRef = collection(
          db,
          "schedules",
          levelId,
          "days",
          day,
          "schedule_subjects"
        );
        const daySnapshot = await getDocs(dayRef);

        const subjects: { id: string }[] = [];
        daySnapshot.forEach((doc) => {
          subjects.push({ id: doc.id, ...doc.data() });
        });

        scheduleData.days.push({
          dayName: day,
          subjects: subjects,
        });
      }
    }
  } catch (error) {
    console.error("Error fetching schedule: ", error);
  }

  return scheduleData;
};
