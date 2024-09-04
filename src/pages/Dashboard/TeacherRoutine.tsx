import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import { getTeacherSchedule } from "../../services/teacherServices";
import { Schedule } from "../../utils/types";
import { useAppSelector } from "../../hooks/reduxHooks";

const TeacherRoutine = () => {
  const teacherInfo = useAppSelector((state) => state.user.user);
  const [schedules, setSchedules] = useState<Schedule[] | null>(null);

  console.log(schedules);

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
  }, [teacherInfo]);

  if (!schedules) {
    return <div>Loading...</div>;
  }

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
                {schedules.flatMap((schedule) =>
                  schedule.days.map((day, dayIndex) => (
                    <tr
                      key={dayIndex}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
                        {day.dayName}
                      </td>
                      {day.subjects.map((subject, subjectIndex) => (
                        <td
                          key={subjectIndex}
                          className="whitespace-nowrap px-6 py-4 text-2xl"
                        >
                          {subject.subject_name} <br />
                          {schedule["level_name"]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherRoutine;
