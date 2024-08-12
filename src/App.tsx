// App.jsx
import { Route, Routes, useLocation } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Schedule from "./pages/Dashboard/Schedule";
import Grades from "./pages/Dashboard/Grades";
import TeacherRoutine from "./pages/Dashboard/TeacherRoutine";
import StudentRoutine from "./pages/Dashboard/StudentRoutine";
import AddParent from "./pages/Dashboard/AddParent";
import AddStudent from "./pages/Dashboard/AddStudent";
// import MyGrades from "./pages/Dashboard/MyGrades";    // add to private route
import AddTeacher from "./pages/Dashboard/AddTeacher";
import HomeLanding from "./pages/Landing/HomeLanding";
import About from "./components/about/About";
import Teachers from "./pages/Landing/Teachers";
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import Footer from "./components/about/Footer";
import Login from "./components/Login";
import NotFound from "./components/NotFund";
import Grad from "./components/Grad";
import Showgrad from "./components/Showgrad";
import HomeDashboard from "./pages/Dashboard/HomeDashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserById } from "./services/userServices";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const privateRoutes = [
    "/dashboard",
    "/grades",
    "/schedule",
    "/teacher-table",
    "/student-table",
    "/add-parent",
    "/add-student",
    "/add-teacher",
  ];

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getUserById(userId, dispatch);
    }
  }, []);

  const showNavAndFooter = !privateRoutes.includes(location.pathname);

  return (
    <>
      {showNavAndFooter && <Nav />}
      <Routes>
        <Route path="/" element={<HomeLanding />} />
        <Route path="/about" element={<About />} />
        <Route path="/stuff" element={<Teachers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/teach" element={<TeacherRoutine />} /> */}


        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={HomeDashboard} />}
        />
        <Route path="/grades" element={<PrivateRoute element={Grades} />} />
        <Route path="/schedule" element={<PrivateRoute element={Schedule} />} />
        <Route
          path="/teacher-table"
          element={<PrivateRoute element={TeacherRoutine} />}
        />
        <Route
          path="/student-table"
          element={<PrivateRoute element={StudentRoutine} />}
        />
        <Route
          path="/add-parent"
          element={<PrivateRoute element={AddParent} />}
        />
        <Route
          path="/add-student"
          element={<PrivateRoute element={AddStudent} />}
        />
        <Route
          path="/add-teacher"
          element={<PrivateRoute element={AddTeacher} />}
        />
        <Route path="/grad" element={<PrivateRoute element={Grad} />} />
        <Route path="/grad-two" element={<PrivateRoute element={Showgrad} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showNavAndFooter && <Footer />}
    </>
  );
}

export default App;
