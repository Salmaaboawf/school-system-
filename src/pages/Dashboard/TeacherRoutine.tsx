import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import { getTeacherSchedule } from "../../services/teacherServices";
import { Schedule, Day, SubjectType } from "../../utils/types";
import { useAppSelector } from "../../hooks/reduxHooks";
import Loading from "../../components/Loading";

const TeacherRoutine = () => {
  const teacherInfo = useAppSelector((state) => state.user.user);
  const [schedules, setSchedules] = useState<Schedule[] | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const fetchedSchedules = await getTeacherSchedule(teacherInfo.id);
        setSchedules(fetchedSchedules);
      } catch (error) {
        console.error("Error fetching schedules: ", error);
      }
    };

    fetchSchedules();
  }, [teacherInfo.id]);

  if (!schedules) {
    return <div>
      <Loading />
    </div>;
  }

  // دالة مساعدة للحصول على الدروس في وقت معين
  const getSubjectsForTimeSlot = (
    daySubjects: SubjectType[],
    timeSlotOrder: number,
    item
  ) => {
    return daySubjects
      .filter((subject) => parseInt(subject.order) === timeSlotOrder)
      .map((subject) => (
        <div key={subject.subject_id}>
          {subject.subject_name} <br />
          {item.level}
        </div>
      ));
  };

  // تعيين مواعيد الأوقات
  const timeSlotMapping = {
    0: "7:00-9:00",
    1: "9:00-11:00",
    2: "11:00-1:00",
  };

  // إنشاء خريطة لتخزين الأيام الفريدة ودروسها
  const dayMap: {
    [key: string]: { subjects: SubjectType[]; level: string }[];
  } = {};

  schedules.forEach((schedule) =>
    schedule.days.forEach((day) => {
      if (!dayMap[day.dayName]) {
        dayMap[day.dayName] = [];
      }

      dayMap[day.dayName].push({
        subjects: day.subjects,
        level: schedule.level_name,
      });
    })
  );

  console.log(dayMap);

  return (
    <div className="container">
      <div>
        <Nav />
      </div>

      <div className="my-5">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 text-[#002749]">
          <h1 className="text-3xl">Class Routine</h1>
          <span className="text-2xl">{teacherInfo.name}</span>
          <div className="overflow-hidden min-w-full">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b font-medium text-white bg-[#002749] border-[#002749]">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Day
                  </th>
                  <th scope="col" className="px-6 py-4">
                    7:00-9:00
                  </th>
                  <th scope="col" className="px-6 py-4">
                    9:00-11:00
                  </th>
                  <th scope="col" className="px-6 py-4">
                    11:00-1:00
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(dayMap).map((dayName, index) => (
                  <tr key={index} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                      {dayName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-2xl">
                      {dayMap[dayName]
                        .filter((item) =>
                          item.subjects.some((s) => parseInt(s.order) === 0)
                        )
                        .map((item) =>
                          getSubjectsForTimeSlot(item.subjects, 0, item)
                        )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-2xl">
                      {dayMap[dayName]
                        .filter((item) =>
                          item.subjects.some((s) => parseInt(s.order) === 1)
                        )
                        .map((item) =>
                          getSubjectsForTimeSlot(item.subjects, 1, item)
                        )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-2xl">
                      {dayMap[dayName]
                        .filter((item) =>
                          item.subjects.some((s) => parseInt(s.order) === 2)
                        )
                        .map((item) =>
                          getSubjectsForTimeSlot(item.subjects, 2, item)
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRoutine;
