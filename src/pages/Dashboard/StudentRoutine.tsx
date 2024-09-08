/* eslint-disable @typescript-eslint/no-explicit-any */
// // import {Button} from "flowbite-react";
// import Nav from "../../components/Nav";
// import Footer from "../../components/about/Footer";
// const StudentRoutine = () => {
//   return (
//     <div className="inline-block min-w-90 w-full py-2 sm:px-6 lg:px-8 text-[#002749] ">
//       <Nav/>
//       <hr></hr>
//       <h1 className="text-3xl">classs routine</h1>
//       <span className="text-2xl">A-1</span>
//       <div className="overflow-hidden min-w-full ">
//         <table className="min-w-full text-center text-sm font-light ">
//           <thead className="border-b bg-[#002749] border-[#002749] font-medium text-white ">
//             <tr>

//               <th scope="col" className="px-6 py-4">
//                 day
//               </th>
//               <th scope="col" className="px-6 py-4">
//                 7:00-9:00
//               </th>
//               <th scope="col" className="px-6 py-4">
//                 9:00-11:00
//               </th>
//               <th scope="col" className="px-6 py-4">
//                 11:00-1:00
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b dark:border-neutral-500">
//               <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
//                 sun
//               </td>
//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 math<h6 className="text-sm">Ahmed ali</h6>
//               </td>

//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 arabic <h6 className="text-sm">Mona ahmed</h6>
//               </td>
//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 chemistry <h6 className="text-sm">Salma ahmed</h6>
//               </td>
//             </tr>
//             <tr className="border-b dark:border-neutral-500">
//               <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
//                 mon
//               </td>
//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 english <h6 className="text-sm">Ali ahmed</h6>
//               </td>
//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 arabic <h6 className="text-sm">Mona ahmed</h6>
//               </td>
//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 physics <h6 className="text-sm">Salma ahmed</h6>
//               </td>
//             </tr>
//             <tr className="border-b dark:border-neutral-500">
//               <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
//                 Tue
//               </td>
//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 math <h6 className="text-sm">Ahmed ali</h6>
//               </td>
//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 arabic <h6 className="text-sm">Mona ahmed</h6>
//               </td>
//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 art <h6 className="text-sm">Salma ahmed</h6>
//               </td>
//             </tr>
//             <tr className="border-b dark:border-neutral-500">
//               <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
//                 Wed
//               </td>
//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 chemistry <h6 className="text-sm">Salma ahmed</h6>
//               </td>

//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 english <h6 className="text-sm">Salma ahmed</h6>
//               </td>
//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 arabic <h6 className="text-sm">Mona ahmed</h6>
//               </td>
//             </tr>
//             <tr className="border-b dark:border-neutral-500">
//               <td className="whitespace-nowrap px-6 py-4 font-medium text-2xl">
//                 Thr
//               </td>
//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 math <h6 className="text-sm">Ahmed ali</h6>
//               </td>
//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 arabic <h6 className="text-sm">Mona ahmed</h6>
//               </td>

//               <td className="whitespace-nowrap px-6 py-4 text-2xl">
//                 physics <h6 className="text-sm">Salma ahmed</h6>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default StudentRoutine;
//---------------
import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/about/Footer";
import { db } from "../../config/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

const StudentRoutine = () => {
  const [schedule, setSchedule] = useState<any>(null);
  const studentLevelId = "YSwrhmSU3K27Un0xmsGj"; // Replace with dynamic level id from auth or props

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const scheduleRef = doc(db, "schedules", studentLevelId);
        const scheduleSnap = await getDoc(scheduleRef);

        if (scheduleSnap.exists()) {
          const scheduleData = scheduleSnap.data();

          // Fetching subcollection "days"
          const daysCollectionRef = collection(scheduleRef, "days");
          const daysSnapshot = await getDocs(daysCollectionRef);

          const daysData = await Promise.all(
            daysSnapshot.docs.map(async (dayDoc) => {
              const dayData = dayDoc.data();

              // Fetching the schedule_subjects subcollection for each day
              const subjectsCollectionRef = collection(
                dayDoc.ref,
                "schedule_subjects"
              );
              const subjectsSnapshot = await getDocs(subjectsCollectionRef);
              const subjectsData = subjectsSnapshot.docs.map((subjectDoc) => ({
                ...subjectDoc.data(),
              }));

              return {
                ...dayData,
                name: dayDoc.id,
                schedule_subjects: subjectsData,
              };
              console.log(subjectsData);
            })
          );

          setSchedule({ ...scheduleData, days: daysData });
          console.log(scheduleData);
          console.log(daysData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, [studentLevelId]);

  return (
    <div className="inline-block min-w-90 w-full py-2 sm:px-6 lg:px-8 text-[#002749] ">
      <Nav />
      <hr />
      <h1 className="text-3xl">Class Routine</h1>
      <span className="text-2xl">A-1</span>
      <div className="overflow-hidden min-w-full ">
        <table className="min-w-full text-center text-sm font-light ">
          <thead className="border-b bg-[#002749] border-[#002749] font-medium text-white ">
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
            {schedule &&
              schedule.days.map((day: any) => (
                <tr key={day.name} className="border-b border-[#00274991]">
                  <td className="whitespace-nowrap px-6 font-medium text-2xl text-[#002749]">
                    {day.name}
                  </td>
                  {day.schedule_subjects.map((subject: any, index: number) => (
                    <td key={index} className="whitespace-nowrap py-3 text-lg">
                      {subject.subject_name || "No subject"}
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
