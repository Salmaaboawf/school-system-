import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Header from "./components/Header/Header";
import Grades from "./pages/Grades";
import TeacherRoutine from "./pages/TeacherRoutine";
import StudentRoutine from "./pages/StudentRoutine";
import AddParent from "./pages/AddParent";
import AddStudent from "./pages/AddStudent";
import AddTeacher from "./pages/AddTeacher";
import { Button } from "flowbite-react";

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
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Grades />} />
            <Route path="/contact" element={<Schedule />} />
            <Route path="/teacher-table" element={<TeacherRoutine />} />
            <Route path="/student-table" element={<StudentRoutine />} />
            <Route path="/add-parent" element={<AddParent />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/add-teacher" element={<AddTeacher />} />
          </Routes>
          <Button>Click me</Button>
        </div>
      </div>
    </main>
=======
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
>>>>>>> 350d68f941eb07e448829a4386df5c53575fbb82
  );
}

export default App;
