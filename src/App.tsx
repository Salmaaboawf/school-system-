// App.jsx
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserById } from "./services/userServices";
import AddClass from "./pages/Dashboard/AddLevels";
import Add_Teacher_Routine from "./pages/Dashboard/Add_Teacher_Routine";
import Add_Class_Routine from "./pages/Dashboard/Add_Class_Routine";
import AddSubject from "./pages/Dashboard/AddSubject";
import { useAuth } from "./hooks/useAuth";
import ScrollToTop from "./components/ScrollToTop";
function App() {
  const dispatch = useDispatch();
  const userId = useAuth();

  useEffect(() => {
    if (userId) {
      getUserById(userId, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          element={
            <>
              <Nav />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route path="/" element={<HomeLanding />} />
          <Route path="/about" element={<About />} />
          <Route path="/stuff" element={<Teachers />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/my-grades" element={<MyGrades />} /> */}
          <Route
            path="/login"
            element={userId ? <Navigate to="/" /> : <Login />}
          />
        </Route>

        {/* <Route path="/class" element={<AddClass />} /> */}

        {/* <Route path="/teach" element={<TeacherRoutine />} /> */}

        {/* Protected routes */}

        <Route
          path="/grades"
          element={<PrivateRoute element={Grades} role="admin" />}
        />
        <Route
          path="/schedule"
          element={<PrivateRoute element={Schedule} role="admin" />}
        />
        <Route
          path="/teacher-table"
          element={<PrivateRoute element={TeacherRoutine} role="admin" />}
        />
        <Route
          path="/student-table"
          element={<PrivateRoute element={StudentRoutine} role="student" />}
        />
        <Route
          path="/add-parent"
          element={<PrivateRoute element={AddParent} role="admin" />}
        />
        <Route
          path="/add-student"
          element={<PrivateRoute element={AddStudent} role="admin" />}
        />
        <Route
          path="/add-teacher"
          element={<PrivateRoute element={AddTeacher} role="admin" />}
        />
        <Route
          path="/add-class"
          element={<PrivateRoute element={AddClass} role="admin" />}
        />
        <Route
          path="/add-class-routine"
          element={<PrivateRoute element={Add_Class_Routine} role="admin" />}
        />
        <Route
          path="/add-teacher-routine"
          element={<PrivateRoute element={Add_Teacher_Routine} role="admin" />}
        />
        <Route
          path="/add-subject"
          element={<PrivateRoute element={AddSubject} role="admin" />}
        />
        <Route
          path="/grad"
          element={<PrivateRoute element={Grad} role="admin" />}
        />
        <Route
          path="/grad-two"
          element={<PrivateRoute element={Showgrad} role="admin" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
