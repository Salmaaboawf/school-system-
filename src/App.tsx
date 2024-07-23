import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Schedule from "./pages/Dashboard/Schedule";
import Header from "./components/Header";
import Grades from "./pages/Dashboard/Grades";
import TeacherRoutine from "./pages/Dashboard/TeacherRoutine";
import StudentRoutine from "./pages/Dashboard/StudentRoutine";
import AddParent from "./pages/Dashboard/AddParent";
import AddStudent from "./pages/Dashboard/AddStudent";
import AddTeacher from "./pages/Dashboard/AddTeacher";
import HomeDashboard from "./pages/Dashboard/HomeDashboard";
function App() {
  return (
    <main className="p-10">
      <div className="container flex gap-x-5  ">
        <div className="flex-[1]">
          <Sidebar />
        </div>
        <div className="flex-[4]">
          {/* Header of the section */}
          <div>
            <Header />
          </div>
          {/* Header of the section */}
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/about" element={<Grades />} />
            <Route path="/contact" element={<Schedule />} />
            <Route path="/teacher-table" element={<TeacherRoutine />} />
            <Route path="/student-table" element={<StudentRoutine />} />
            <Route path="/add-parent" element={<AddParent />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/add-teacher" element={<AddTeacher />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
