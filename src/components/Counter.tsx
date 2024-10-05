import { useEffect, useState } from "react";
import CounterPlus from "./CounterPlus";
import CountUp from "react-countup";
import { TfiPencilAlt2 } from "react-icons/tfi";
import { IoPersonAddSharp } from "react-icons/io5";
import { SiLevelsdotfyi } from "react-icons/si";
import ScrollTrigger from "react-scroll-trigger";
import { fetchTeachers } from "../services/teacherServices";
import {  fetchStudentss } from "../services/userServices";
import { fetchSubjects } from "../services/subjectServices";
import { PiStudentDuotone } from "react-icons/pi";
import {  fetchLevelss } from "../services/levelsServices";

export default function Counter() {
  const [counterOn, setCounterOn] = useState(false);
  const [teachersCount, setTeachersCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [subjectsCount, setSubjectCount] = useState(0);
  const [levels, setLevels] = useState(0);

  const getTeachers = async () => {
    const teachers = await fetchTeachers();
    setTeachersCount(teachers.length);
  };

  const getStudents = () => {
    fetchStudentss((studentsList) => {
      setStudentsCount(studentsList.length);
    });
  };
  const getSubjects = async () => {
    const subjectsList = await fetchSubjects();
    setSubjectCount(subjectsList.length);
  };
const getLevels = async () => {
  const levelsList = await fetchLevelss();
  setLevels(levelsList.length);
};

  useEffect(() => {
    getTeachers();
    getStudents();
    getSubjects();
    getLevels();
  }, []);
  return (
    <div className=" ">
      <ScrollTrigger
        onProgress={() => {}}
        onEnter={() => setCounterOn(true)}
        onExit={() => setCounterOn(false)}
      >
        {counterOn && (
          <div className="grid grid-cols-1 items-center justify-center text-center pt-7 lg:grid-cols-4  md:grid-cols-2   gap-[1rem]  py-[1rem] mx-auto   ">
            <CounterPlus title="Loving Teachers">
              <IoPersonAddSharp style={{ color: "white", fontSize: "4em" }} />
              <CountUp
                className=" text-[5rem] text-white"
                start={0}
                end={teachersCount}
                duration={4}
                delay={0}
              />
            </CounterPlus>
            <CounterPlus title="subjects">
              <TfiPencilAlt2 style={{ color: "white", fontSize: "4em" }} />
              <CountUp
                className=" text-[5rem] text-white"
                start={0}
                end={subjectsCount}
                duration={4}
                delay={0}
              />
            </CounterPlus>
            <CounterPlus title="Students">
              <PiStudentDuotone style={{ color: "white", fontSize: "4em" }} />
              <CountUp
                className=" text-[5rem] text-white"
                start={0}
                end={studentsCount}
                duration={4}
                delay={0}
              />
            </CounterPlus>
            <CounterPlus title="our Classes ">
              <SiLevelsdotfyi style={{ color: "white", fontSize: "4em" }} />
              <CountUp
                className=" text-[5rem] text-white"
                start={0}
                end={levels}
                duration={4}
                suffix=""
                delay={0}
              />
            </CounterPlus>
          </div>
        )}
      </ScrollTrigger>
    </div>
  );
}
