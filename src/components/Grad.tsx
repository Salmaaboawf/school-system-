import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import Header from "./Header/Header";
import Sidebar from "./Sidebar";
import { db } from "../config/firebase";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchLevels } from "../services/levelsServices";
import { SubjectType } from "../utils/types";
import DashboardHeader from "./Header/DashboardHeader";
import { toast } from "react-toastify";
function Gard() {
  const levels = useAppSelector((state) => state.levels.levels);
  const dispatch = useAppDispatch();
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [students, setStudents] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [grades, setGrades] = useState({}); // To store grades entered for each student

  // Fetch levels from Firestore when the component mounts
  useEffect(() => {
    if (!levels.length) {
      fetchLevels(dispatch);
    }
  }, []);

  // Fetch subjects when a level is selected
  useEffect(() => {
    const fetchSubjects = async () => {
      if (selectedLevel) {
        const subjectsCollection = collection(db, "subjects");
        const subjectsQuery = query(
          subjectsCollection,
          where("level_id", "==", selectedLevel)
        );
        const subjectSnapshot = await getDocs(subjectsQuery);
        const subjectList = subjectSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubjects(subjectList);
      }
    };
    fetchSubjects();
  }, [selectedLevel]);

  // Fetch students when the VIEW button is clicked
  const fetchStudents = async (e) => {
    e.preventDefault();
    if (selectedLevel) {
      const studentsCollection = collection(db, "students");
      const studentsQuery = query(
        studentsCollection,
        where("class_id", "==", selectedLevel)
      );
      const studentSnapshot = await getDocs(studentsQuery);
      const studentList = studentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
    }
  };

  // Handle grade input change
  const handleGradeChange = (studentId, grade) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [studentId]: grade,
    }));
  };

  // Save or update grades in Firestore
  const saveGrades = async () => {
    for (const studentId in grades) {
      if (grades[studentId] !== "") {
        const gradesCollection = collection(db, "grades");
        const gradeQuery = query(
          gradesCollection,
          where("student_id", "==", studentId),
          where("subject_id", "==", selectedSubject),
          where("level_id", "==", selectedLevel)
        );
        const gradeSnapshot = await getDocs(gradeQuery);

        if (!gradeSnapshot.empty) {
          // If a grade exists, update it
          const gradeDoc = gradeSnapshot.docs[0];
          const gradeRef = doc(db, "grades", gradeDoc.id);
          await updateDoc(gradeRef, {
            grade: grades[studentId],
          });
        } else {
          // If no grade exists, add a new document
          await addDoc(collection(db, "grades"), {
            grade: grades[studentId],
            level_id: selectedLevel,
            student_id: studentId,
            subject_id: selectedSubject,
          });
        }
        toast.success("Grades saved successfully!")
      }
    }
    setGrades({}); // Reset grades after saving
  };

  return (
    <div className="flex">
    <div className="fixed xl:w-[20%] lg:w-[25%] md:w-[30%] top-0 left-0 h-full z-50">
      <Sidebar />
    </div>

    <section className=" text-[#002749] xl:w-[80%] xl:ml-[20%] lg:w-[75%] lg:ml-[25%] md:w-[70%] md:ml-[30%] sm:m-auto w-full">

      <DashboardHeader pageTitle={'Add Grades'} />
        <div>
          <div className="forms p-6 rounded-lg ">
            <div className="form max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Marks </h2>
              <form
                onSubmit={fetchStudents}
                className="flex items-center space-x-4"
              >
                <div className="flex flex-grow flex-wrap gap-4">
                  <select
                    name="Section"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg flex-shrink min-w-[150px] h-12"
                  >
                    <option value="">Level</option>
                    {levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="Subject"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg flex-shrink min-w-[150px] h-12"
                  >
                    <option value="">Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="submit"
                    className="bg-[#002749] text-white px-6 py-3 rounded-lg h-12 hover:bg-[#577ce0]"
                  >
                    VIEW
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Display students and allow grade input */}
          <div className="overflow-hidden min-w-full ">
            <table className="min-w-full text-center text-sm font-light ">
              <thead className="border-b text-white border-[#002749] bg-[#002749]">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    {" "}
                    #{" "}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {" "}
                    Student{" "}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {" "}
                    Lab1{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id} className="border-b border-[#00274991]">
                    <td className="whitespace-nowrap px-6 font-medium text-2xl text-[#002749]">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap py-3 text-lg">
                      <p>{student.name}</p>
                    </td>
                    <td className="whitespace-nowrap py-3 text-lg">
                      <input
                        type="number"
                        value={grades[student.id] || ""}
                        onChange={(e) =>
                          handleGradeChange(student.id, e.target.value)
                        }
                        className="p-1 border text-[#002749] border-[#00274957] rounded block m-auto w-40"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {students.length > 0 && (
              <div className="text-center mt-6">
                <button
            className="formButton xl:w-[27rem] lg:w-80 md:w-full mx-auto"
            type="submit"
            onClick={saveGrades}
          >
            Save Grades
          </button>
              </div>
            )}
          </div>
        </div>
        </section>
      </div>

  );
}

export default Gard;
