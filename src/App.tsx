import { Route, Routes } from "react-router-dom";
import Schedule from "./pages/Dashboard/Schedule";
import Grades from "./pages/Dashboard/Grades";
import TeacherRoutine from "./pages/Dashboard/TeacherRoutine";
import StudentRoutine from "./pages/Dashboard/StudentRoutine";
import AddParent from "./pages/Dashboard/AddParent";
import AddStudent from "./pages/Dashboard/AddStudent";
import AddTeacher from "./pages/Dashboard/AddTeacher";
import HomeLanding from "./pages/Landing/HomeLanding";
import "flowbite/dist/flowbite.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import About from "../src/components/about/About.jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Teachers from "./pages/Landing/Teachers.jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Nav from "./components/Nav.jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Contact from "./components/Contact.jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Footer from "./components/about/Footer.jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Login from "./components/Login.jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import NotFound from "./components/NotFund.jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Grad from "./components/Grad.jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Showgrad from "./components/Showgrad.jsx";
import HomeDashboard from "./pages/Dashboard/HomeDashboard";

function App() {
  return (
    <>
      {/* Header of the section */}
      <Nav />
      <Routes>
        <Route path="/" element={<HomeLanding />} />
        <Route path="/about" element={<About />} />
        <Route path="/stuff" element={<Teachers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/grad" element={<Grad />} />
        <Route path="/grad-two" element={<Showgrad />} />
        <Route path="/dashboard" element={<HomeDashboard />} />

        <Route path="/grades" element={<Grades />} />
        <Route path="/contact" element={<Schedule />} />
        <Route path="/teacher-table" element={<TeacherRoutine />} />
        <Route path="/student-table" element={<StudentRoutine />} />
        <Route path="/add-parent" element={<AddParent />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-teacher" element={<AddTeacher />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
