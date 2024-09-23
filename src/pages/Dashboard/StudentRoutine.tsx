import { CSSProperties, useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/about/Footer";
import { useAppSelector } from "../../hooks/reduxHooks";
import { fetchSchedule } from "../../services/scheduleServices";
import { Schedule } from "../../utils/types";
import { getLevelNameById } from "../../services/levelsServices";
import { getSubjectNameById } from "../../services/subjectServices";
import { getTeacherNameById } from "../../services/teacherServices";
import HashLoader from "react-spinners/HashLoader";
import ParticlesComponent from "../../components/Tsparticles";
import Header from "../../components/Header/Header";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#ff4e31",
};

const StudentRoutine = () => {
  const [scheduleTable, setScheduleTable] = useState<Schedule | null>(null);
  const [levelName, setLevelName] = useState<string>("");

  const userInfo = useAppSelector((state) => state.user.user);

  const getSchedule = async () => {
    try {
      const schedule = await fetchSchedule(userInfo.class_id);
      const levelName = await getLevelNameById(schedule.level_id);
      setLevelName(levelName);

      const updatedDays = await Promise.all(
        schedule.days.map(async (day) => {
          const updatedSubjects = await Promise.all(
            day.subjects.map(
              async (subject: { subject_id: string; teacher_id: string }) => {
                const subjectName = await getSubjectNameById(
                  subject.subject_id
                );
                const teacherName = await getTeacherNameById(
                  subject.teacher_id
                );

                return {
                  ...subject,
                  subject_name: subjectName,
                  teacher_name: teacherName,
                };
              }
            )
          );
          return {
            ...day,
            subjects: updatedSubjects,
          };
        })  
      );

      setScheduleTable({
        ...schedule,
        days: updatedDays,
      });
      console.log(scheduleTable);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!scheduleTable) {
    return (
      <HashLoader
        cssOverride={override}
        color="#ff4e31"
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }

  return (
    <div className="container">

    <div className="particles-container">
      <ParticlesComponent id="particles" />
    </div>

    <div>
      <Nav />
    </div>

    <div className="mt-20">
      <Header />
    </div>
      {/* <span className="text-2xl">{levelName}</span> */}
      <div className="overflow-hidden min-w-full mt-5 rounded-md">
        <table className="min-w-full text-center text-sm font-light ">
          <thead className="border-b bg-deepBlue font-medium text-white text-lg">
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
            {scheduleTable.days.map((day, dayIndex) => (
              <tr key={dayIndex} className="border-b dark:border-neutral-500 bg-slate-50  text-Orange hover:bg-lightBlue hover:text-white">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-lg bg-deepBlue text-white">
                  {day.dayName}
                </td>
                {day.subjects.map((subject, subjectIndex) => (
                  <td
                    key={subjectIndex}
                    className="whitespace-nowrap px-6 py-4 text-xl"
                  >
                    {subject.subject_name} {console.log(subject.subject_name)}
                    <br></br>
                    {subject.teacherName}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default StudentRoutine;
