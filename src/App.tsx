// App.jsx
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Schedule from "./pages/Dashboard/Schedule";
import Grades from "./pages/Dashboard/Grades";
import TeacherRoutine from "./pages/Dashboard/TeacherRoutine";
import StudentRoutine from "./pages/Dashboard/StudentRoutine";
import AddParent from "./pages/Dashboard/AddParent";
import AddStudent from "./pages/Dashboard/AddStudent";
import MyGrades from "./pages/Dashboard/MyGrades";    // add to private route
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
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserById } from "./services/userServices";
import AddClass from "./pages/Dashboard/AddClass";
import Add_Teacher_Routine from "./pages/Dashboard/Add_Teacher_Routine";
import Add_Class_Routine from "./pages/Dashboard/Add_Class_Routine";
import AddSubject from "./pages/Dashboard/AddSubject";
import { useAuth } from "./hooks/useAuth";

function App() {
  const dispatch = useDispatch();
  const userId = useAuth();
  // const privateRoutes = [
  //   "/dashboard",
  //   "/grades",
  //   "/schedule",
  //   "/teacher-table",
  //   "/student-table",
  //   "/add-parent",
  //   "/add-student",
  //   "/add-teacher",
  //   "/add-class",
  //   "/add-teacher-routine",
  //   "/add-class-routine",
  //   "/add-subject",
  // ];

  useLayoutEffect(() => {
    if (userId) {
      getUserById(userId, dispatch);
    }
  }, []);

  console.log("app rendered");

  return (
    <>
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
          <Route path="/my-grades" element={<MyGrades />} />
          <Route
            path="/login"
            element={userId ? <Navigate to="/" /> : <Login />}
          />
        </Route>

        {/* <Route path="/class" element={<AddClass />} /> */}

        {/* <Route path="/teach" element={<TeacherRoutine />} /> */}

        {/* Protected routes */}

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
        <Route
          path="/add-class"
          element={<PrivateRoute element={AddClass} />}
        />
        <Route
          path="/add-class-routine"
          element={<PrivateRoute element={Add_Class_Routine} />}
        />
        <Route
          path="/add-teacher-routine"
          element={<PrivateRoute element={Add_Teacher_Routine} />}
        />
        <Route
          path="/add-subject"
          element={<PrivateRoute element={AddSubject} />}
        />
        <Route path="/grad" element={<PrivateRoute element={Grad} />} />
        <Route path="/grad-two" element={<PrivateRoute element={Showgrad} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
