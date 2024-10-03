import { useEffect, useState } from "react";
import CounterPlus from "./CounterPlus";
import CountUp from "react-countup";
// import ScrollTrigger from "react-scroll-trigger";
import { IoAmericanFootballOutline } from "react-icons/io5";
import { TfiPencilAlt2 } from "react-icons/tfi";
import { IoPersonAddSharp } from "react-icons/io5";
import { GiSoapExperiment } from "react-icons/gi";
import ScrollTrigger from "react-scroll-trigger";
import { fetchSubjects, getSubjectById } from "../services/subjectServices";
import { useAppSelector } from "../hooks/reduxHooks";
import { fetchTeachers } from "../services/teacherServices";

export default function Counter() {
  const [counterOn, setCounterOn] = useState(false);
  const subjects = useAppSelector((state) => state.subject.subject);
  const [teachersCount, setTeachersCount] = useState(0);

  const getTeachers = async () => {
    const teachers = await fetchTeachers();
    console.log(teachers.length);
    setTeachersCount(teachers.length);
  };

  useEffect(() => {
    getTeachers();
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
            <CounterPlus title="English Lessons">
              <TfiPencilAlt2 style={{ color: "white", fontSize: "4em" }} />
              <CountUp
                className=" text-[5rem] text-white"
                start={0}
                end={subjects.length}
                duration={4}
                delay={0}
              />
            </CounterPlus>
            <CounterPlus title="Outdoor Activities">
              <IoAmericanFootballOutline
                style={{ color: "white", fontSize: "4em" }}
              />
              <CountUp
                className=" text-[5rem] text-white"
                start={0}
                end={332}
                duration={4}
                delay={0}
              />
            </CounterPlus>
            <CounterPlus title="Fun Experiments ">
              <GiSoapExperiment style={{ color: "white", fontSize: "4em" }} />

              <CountUp
                className=" text-[5rem] text-white"
                start={0}
                end={278}
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
