
// import { collection, getDocs } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { db } from "../../config/firebase";
// import Sidebar from "../../components/Sidebar";
// import DashboardHeader from "../../components/Header/DashboardHeader";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { FaCheck } from "react-icons/fa";
// import { FaX } from "react-icons/fa6";

// function ViewAttendance() {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedLevel, setSelectedLevel] = useState(""); // To store selected level

//   const levels = useAppSelector((state) => state.levels.levels);

//   useEffect(() => {
//     const fetchData = async () => {
//       // Fetch students
//       const studentsCollection = collection(db, "students");
//       const studentsSnapshot = await getDocs(studentsCollection);
//       const studentsList = studentsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setStudents(studentsList);

//       // Fetch attendance records
//       const recordsQuery = collection(db, "attendance");
//       const recordsSnapshot = await getDocs(recordsQuery);
//       const recordsList = recordsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setAttendanceRecords(recordsList);
//     };

//     fetchData();
//   }, []);

//   // Get unique dates from attendance records
//   const uniqueDates = Array.from(
//     new Set(
//       attendanceRecords.map(
//         (item) => new Date(item.timestamp).toISOString().split("T")[0]
//       )
//     )
//   ).sort((a, b) => new Date(b) - new Date(a));

//   // Filter students based on search term and selected level
//   const filteredStudents = students.filter((student) => {
//     const matchesSearch = student.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesLevel = selectedLevel
//       ? student.levelId === selectedLevel
//       : true;
//     return matchesSearch && matchesLevel;
//   });

//   return (
//     <>
//       <div className="flex">
//         {/* Sidebar fixed with height and overflow handling */}
//         <div className="fixed xl:w-[20%] lg:w-[25%] md:w-[30%] top-0 left-0 h-full z-50">
//           <Sidebar />
//         </div>

//         {/* Main Content (attendance view) */}
//         <div className="ml-[20%] w-[80%]">
//           <DashboardHeader pageTitle={"View Attendance"} />

//           {/* Filters: Search and Level Filter */}
//           <div className="flex justify-between my-4">
//             <input
//               type="text"
//               placeholder="Search by name"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="border p-2 rounded"
//             />
//             <select
//               value={selectedLevel}
//               onChange={(e) => setSelectedLevel(e.target.value)}
//               className="border p-2 rounded"
//             >
//               <option value="">All Levels</option>
//               {levels.map((level) => (
//                 <option key={level.id} value={level.id}>
//                   {level.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Attendance Records */}
//           <div className="overflow-auto">
//             {uniqueDates.map((date, index) => (
//               <div key={index} className="w-full">
//                 <h3 className="font-bold text-lg bg-deepBlue text-white text-center py-1">
//                   {date}
//                 </h3>
//                 <div className="w-full">
//                   {filteredStudents.map((student) => {
//                     const attendanceRecord = attendanceRecords.find(
//                       (record) =>
//                         record.studentId === student.id &&
//                         new Date(record.timestamp)
//                           .toISOString()
//                           .split("T")[0] === date
//                     );
//                     return (
//                       <div
//                         key={student.id}
//                         className="flex justify-between px-4 border-b py-2"
//                       >
//                         <span>{student.name}</span>
//                         <span
//                         >
//                           {attendanceRecord ?     <FaCheck className='text-green-600 mx-auto' /> : <FaX className='text-red-600 mx-auto' />}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ViewAttendance;

// ------------------------------------------------------------------ 

// import { collection, getDocs, query, where } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { db } from "../../config/firebase";
// import Sidebar from "../../components/Sidebar";
// import DashboardHeader from "../../components/Header/DashboardHeader";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { FaCheck } from "react-icons/fa";
// import { FaX } from "react-icons/fa6";

// function ViewAttendance() {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedLevel, setSelectedLevel] = useState(""); // To store selected level

//   const levels = useAppSelector((state) => state.levels.levels);

//   useEffect(() => {
//     const fetchData = async () => {
//       // Fetch students with or without level filtering
//       const studentsCollection = collection(db, "students");
//       let studentsQuery;

//       if (selectedLevel) {
//         // Query to get students of a specific level
//         studentsQuery = query(studentsCollection, where("class_id", "==", selectedLevel));
//         console.log(studentsQuery)
//       } else {
//         // Get all students if no level is selected
//         studentsQuery = studentsCollection;
//       }

//       const studentsSnapshot = await getDocs(studentsQuery);
//       const studentsList = studentsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setStudents(studentsList);
//       console.log(students)

//       // Fetch attendance records
//       const recordsQuery = collection(db, "attendance");
//       const recordsSnapshot = await getDocs(recordsQuery);
//       const recordsList = recordsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setAttendanceRecords(recordsList);
//     };

//     fetchData();
//   }, [selectedLevel]); // Re-fetch data when selected level changes

//   // Get unique dates from attendance records
//   const uniqueDates = Array.from(
//     new Set(
//       attendanceRecords.map(
//         (item) => new Date(item.timestamp).toISOString().split("T")[0]
//       )
//     )
//   ).sort((a, b) => new Date(b) - new Date(a));

//   // Filter students based on search term
//   const filteredStudents = students.filter((student) => {
//     const matchesSearch = student.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     return matchesSearch;
//   });

//   return (
//     <>
//       <div className="flex">
//         {/* Sidebar fixed with height and overflow handling */}
//         <div className="fixed xl:w-[20%] lg:w-[25%] md:w-[30%] top-0 left-0 h-full z-50">
//           <Sidebar />
//         </div>

//         {/* Main Content (attendance view) */}
//         <div className="ml-[20%] w-[80%]">
//           <DashboardHeader pageTitle={"View Attendance"} />

//           {/* Filters: Search and Level Filter */}
//           <div className="flex justify-between my-4">
//             <input
//               type="text"
//               placeholder="Search by name"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="border p-2 rounded"
//             />
//             <select
//               value={selectedLevel}
//               onChange={(e) => setSelectedLevel(e.target.value)}
//               className="border p-2 rounded"
//             >
//               <option value="">All Levels</option>
//               {levels.map((level) => (
//                 <option key={level.id} value={level.id}>
//                   {level.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Attendance Records */}
//           <div className="overflow-auto">
//             {uniqueDates.map((date, index) => (
//               <div key={index} className="w-full">
//                 <h3 className="font-bold text-lg bg-deepBlue text-white text-center py-1">
//                   {date}
//                 </h3>
//                 <div className="w-full">
//                   {filteredStudents.map((student) => {
//                     const attendanceRecord = attendanceRecords.find(
//                       (record) =>
//                         record.studentId === student.id &&
//                         new Date(record.timestamp)
//                           .toISOString()
//                           .split("T")[0] === date
//                     );
//                     return (
//                       <div
//                         key={student.id}
//                         className="flex justify-between px-4 border-b py-2"
//                       >
//                         <span>{student.name}</span>
//                         <span>
//                           {attendanceRecord ? (
//                             <FaCheck className="text-green-600 mx-auto" />
//                           ) : (
//                             <FaX className="text-red-600 mx-auto" />
//                           )}
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ViewAttendance;

import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/Header/DashboardHeader";
import { useAppSelector } from "../../hooks/reduxHooks";
import { FaCheck } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

function ViewAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(""); // To store selected level
  const [selectedAttendanceStatus, setSelectedAttendanceStatus] = useState(""); // To store attendance status filter

  const levels = useAppSelector((state) => state.levels.levels);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch students with or without level filtering
      const studentsCollection = collection(db, "students");
      let studentsQuery;

      if (selectedLevel) {
        // Query to get students of a specific level
        studentsQuery = query(studentsCollection, where("class_id", "==", selectedLevel));
      } else {
        // Get all students if no level is selected
        studentsQuery = studentsCollection;
      }

      const studentsSnapshot = await getDocs(studentsQuery);
      const studentsList = studentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsList);

      // Fetch attendance records
      const recordsQuery = collection(db, "attendance");
      const recordsSnapshot = await getDocs(recordsQuery);
      const recordsList = recordsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAttendanceRecords(recordsList);
    };

    fetchData();
  }, [selectedLevel]);

  // Get unique dates from attendance records
  const uniqueDates = Array.from(
    new Set(
      attendanceRecords.map(
        (item) => new Date(item.timestamp).toISOString().split("T")[0]
      )
    )
  ).sort((a, b) => new Date(b) - new Date(a));

  // Filter students based on search term and attendance status
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  // Filter students based on attendance status (Present / Absent)
  const filterByAttendance = (attendanceRecord) => {
    if (selectedAttendanceStatus === "Present") {
      return !!attendanceRecord; // Show students with an attendance record
    } else if (selectedAttendanceStatus === "Absent") {
      return !attendanceRecord; // Show students without an attendance record
    }
    return true; // Show all students if no filter is selected
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar fixed with height and overflow handling */}
        <div className="fixed xl:w-[20%] lg:w-[25%] md:w-[30%] top-0 left-0 h-full z-50">
          <Sidebar />
        </div>

        {/* Main Content (attendance view) */}
        <div className="ml-[20%] w-[80%]">
          <DashboardHeader pageTitle={"View Attendance"} />

          {/* Filters: Search, Level, and Attendance Status */}
          <div className="flex justify-between my-4">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded"
            />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">All Levels</option>
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
            <select
              value={selectedAttendanceStatus}
              onChange={(e) => setSelectedAttendanceStatus(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">All Attendance</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          {/* Attendance Records */}
          <div className="overflow-auto">
            {uniqueDates.map((date, index) => (
              <div key={index} className="w-full">
                <h3 className="font-bold text-lg bg-deepBlue text-white text-center py-1">
                  {date}
                </h3>
                <div className="w-full">
                  {filteredStudents.map((student) => {
                    const attendanceRecord = attendanceRecords.find(
                      (record) =>
                        record.studentId === student.id &&
                        new Date(record.timestamp)
                          .toISOString()
                          .split("T")[0] === date
                    );

                    // Apply attendance filter
                    if (!filterByAttendance(attendanceRecord)) {
                      return null;
                    }

                    return (
                      <div
                        key={student.id}
                        className="flex justify-between px-4 border-b py-2"
                      >
                        <span>{student.name}</span>
                        <span>
                          {attendanceRecord ? (
                            <FaCheck className="text-green-600 mx-auto" />
                          ) : (
                            <FaX className="text-red-600 mx-auto" />
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewAttendance;

