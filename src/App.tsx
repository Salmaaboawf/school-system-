import { Route, Routes } from "react-router-dom";
import Schedule from "./pages/Dashboard/Schedule";
import Grades from "./pages/Dashboard/Grades";
import TeacherRoutine from "./pages/Dashboard/TeacherRoutine";
import StudentRoutine from "./pages/Dashboard/StudentRoutine";
import AddParent from "./pages/Dashboard/AddParent";
import AddStudent from "./pages/Dashboard/AddStudent";
import AddTeacher from "./pages/Dashboard/AddTeacher";
import HomeLanding from "./pages/Landing/HomeLanding";
function App() {
  return (
    <>
      {/* Header of the section */}
      <Routes>
        <Route path="/" element={<HomeLanding />} />
        <Route path="/about" element={<Grades />} />
        <Route path="/contact" element={<Schedule />} />
        <Route path="/teacher-table" element={<TeacherRoutine />} />
        <Route path="/student-table" element={<StudentRoutine />} />
        <Route path="/add-parent" element={<AddParent />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-teacher" element={<AddTeacher />} />
      </Routes>
    </>
  );
}

export default App;
