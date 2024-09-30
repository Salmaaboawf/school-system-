import { useState, useEffect } from "react";
import Nav from "../../components/Nav";
import { getTeacherSchedule } from "../../services/teacherServices";
import { Schedule, Day, SubjectType } from "../../utils/types";
import { useAppSelector } from "../../hooks/reduxHooks";
import Loading from "../../components/Loading";
import Header from "../../components/Header/Header";
import { MdLunchDining } from "react-icons/md";
import ParticlesComponent from "../../components/Tsparticles";
import '../../assets/stars.css'
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
    3: "1:00-3:00",
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

  // console.log(dayMap);

  return (
    <div className="container">

      <div className="particles-container">
        <ParticlesComponent id="particles" />
      </div>

      {/* <div>
        <Nav />
      </div> */}

      <div className="mt-10">
        <Header />
      </div>

      <div className="my-5">
        <div className="inline-block min-w-full py-2 text-Orange rounded-md ">
          <div className="overflow-hidden min-w-full">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b text-lg text-white bg-deepBlue xs:scroll-auto">
                <tr>
                  <th scope="col" className="px-6 py-4 rounded-l-md">
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
                  <th scope="col" className="px-6 py-4 rounded-r-md">
                    1:00-3:00
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(dayMap).map((dayName, index) => (
                  <tr key={index} className="border-b dark:border-neutral-500 bg-slate-50 hover:bg-lightBlue hover:text-white">
                    <td className="whitespace-nowrap px-2 py-4 font-medium text-lg bg-deepBlue text-white">
                      {dayName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-xl">
                      {dayMap[dayName]
                        .filter((item) =>
                          item.subjects.some((s) => parseInt(s.order) === 0)
                        )
                        .map((item) =>
                          getSubjectsForTimeSlot(item.subjects, 0, item)
                        )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-xl">
                      {dayMap[dayName]
                        .filter((item) =>
                          item.subjects.some((s) => parseInt(s.order) === 1)
                        )
                        .map((item) =>
                          getSubjectsForTimeSlot(item.subjects, 1, item)
                        )}
                    </td>
                    {/* <td>
                    <MdLunchDining />
                    </td> */}
                    <td className="whitespace-nowrap px-6 py-4 text-xl">
                      {dayMap[dayName]
                        .filter((item) =>
                          item.subjects.some((s) => parseInt(s.order) === 2)
                        )
                        .map((item) =>
                          getSubjectsForTimeSlot(item.subjects, 2, item)
                        )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-xl">
                      {dayMap[dayName]
                        .filter((item) =>
                          item.subjects.some((s) => parseInt(s.order) === 3)
                        )
                        .map((item) =>
                          getSubjectsForTimeSlot(item.subjects, 3, item)
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
