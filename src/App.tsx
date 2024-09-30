// App.jsx
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import TeacherRoutine from "./pages/Dashboard/TeacherRoutine";
import StudentRoutine from "./pages/Dashboard/StudentRoutine";
import AddParent from "./pages/Dashboard/AddParent";
import AddStudent from "./pages/Dashboard/AddStudent";
import MyGrades from "./pages/Dashboard/MyGrades"; // add to private route
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
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserById } from "./services/userServices";
import AddClass from "./pages/Dashboard/AddLevels";
import Add_Class_Routine from "./pages/Dashboard/Add_Class_Routine";
import AddSubject from "./pages/Dashboard/AddSubject";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";

import Showgrad from "./components/Showgrad";
import KidsSchedule from "./pages/UsersPages/KidsSchedule";
import KidsGrades from "./pages/UsersPages/KidsGrades";
// import MyGrades from "./pages/Dashboard/MyGrades";
import { useAppSelector } from "./hooks/reduxHooks";
import AddVideo from "./pages/Dashboard/Addvideo";
import Subjects from "./components/Subjects";
import Quiz from "./components/Quiz";
import AddQuiz from "./pages/Dashboard/AddQuiz";
// import subjectDetails from "./components/SubjectDetails";

import ShowVideo from "./pages/Dashboard/ShowVideo";
import SubjectDetails from "./components/SubjectDetails";
import AllUsers from "./components/AllUsers";
import ShowContact from "./pages/Dashboard/ShowContact";
import MyCalendar from "./pages/Static/Calendar";
// import auth from "./config/firebase";
// import SplashScreen from "./pages/Static/SplashScreen";
import AddEvent from "./pages/Dashboard/AddEvent";
import AttendanceQRCode from "./pages/UsersPages/TakeAttendance";
import ViewAttendance from "./pages/Dashboard/ViewAttendance";
import KidsAttendance from "./pages/UsersPages/KidsAttendance";
import Navbar2 from "./components/Navbar2";

// import Loading from "./components/Loading";
function App() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const userInfo = useAppSelector((state) => state.user.user);
  const location = useLocation();
  // const [loading, setLoading] = useState(true);
  // console.log(!!userInfo.id);
  // console.log(userId);

  useLayoutEffect(() => {
    if (userId) {
      getUserById(userId, dispatch);
    }
  }, [userId]);


  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       setLoading(false); 
  //     } 
  //   });
  //   return () => unsubscribe();  // gpt method
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       setLoading(false); 
  //     } 
  //   });
  //   return () => unsubscribe();  // gpt method

  //   setTimeout(() => {
  //     setLoading(false); stackoverflow method
  //   }, 3000);
  // }, []);

  // if (loading) {
  //   return <SplashScreen />;
  // }
  const adminRoutes = [
    "/add-parent",
    "/add-student",
    "/add-event",
    "/add-teacher",
    "/add-class",
    "/users",
    "/add-class-routine",
    "/add-subject",
    "/grad",
    "/show-contact",
    "/show-attendance"
  ];

  // Check if the current route is an admin dashboard route and if the user is an admin
  const hideNavbar = userInfo.role === "admin" && adminRoutes.includes(location.pathname);
  return (
    <>
      <ScrollToTop />
      {/* <Nav /> */}
      {!hideNavbar && <Navbar2 />}
      <Routes>
        <Route
          element={
            <>
              {/* <Nav /> */}
              <Outlet />
              <div>
                <Footer />
              </div>
            </>
          }
        >
          <Route path="/" element={<HomeLanding />} />
          <Route path="/about" element={<About />} />
          <Route path="/stuff" element={<Teachers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calendar" element={<MyCalendar />} />
          <Route path="/my-grades" element={<MyGrades />} />
          <Route path="/video" element={<AddVideo />} />
          <Route path="/ShowVideo" element={<ShowVideo/>} />

          <Route path="/AddQuiz" element={<AddQuiz />} />
          <Route path="/subjectDetails" element={<SubjectDetails />} />

          <Route
            path="/login"
            element={userInfo.id ? <Navigate to="/" /> : <Login />}
          />
        </Route>

        {/* <Route path="/class" element={<AddClass />} /> */}

        {/* <Route path="/teach" element={<TeacherRoutine />} /> */}

        {/* Protected routes */}

        <Route
          path="/grades"
          element={<PrivateRoute element={MyGrades} role="student" />}
        />

        <Route
          path="/quiz"
          element={<PrivateRoute element={Quiz} role="student" />}
        />
        {/* <Route
          path="/schedule"
          element={<PrivateRoute element={Schedule} role="admin" />}
        /> */}
        <Route
          path="/teacher-table"
          element={<PrivateRoute element={TeacherRoutine} role="teacher" />}
        />
        <Route
          path="/AddQuiz"
          element={<PrivateRoute element={AddQuiz} role="teacher" />}
        />

        <Route
          path="/student-table"
          element={<PrivateRoute element={StudentRoutine} role="student" />}
        />
        <Route
          path="/Subjects"
          element={<PrivateRoute element={Subjects} role="student" />}
        />
        <Route
          path="/children-table"
          element={<PrivateRoute element={StudentRoutine} role="parent" />}
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
          path="/add-event"
          element={<PrivateRoute element={AddEvent} role="admin" />}
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
          path="/users"
          element={<PrivateRoute element={AllUsers} role="admin" />}
        />
        <Route
          path="/add-video"
          element={<PrivateRoute element={AddVideo} role="teacher" />}
        />
        {/* <Route
          path="/generate-qr"
          element={<PrivateRoute element={QRCodeGenerator} role="teacher" />}
        /> */}
        {/* <Route
          path="/show-video"
          element={<PrivateRoute element={ShowVideo} role="student" />}
        />  */}
        <Route
         path="/ShowVideo/:subjectId" 
         element={<PrivateRoute element={ShowVideo} role="student" />}
         />

        <Route
          path="/add-class-routine"
          element={<PrivateRoute element={Add_Class_Routine} role="admin" />}
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
          path="/show-contact"
          element={<PrivateRoute element={ShowContact} role="admin" />}
        />
        <Route
          path="/show-attendance"
          element={<PrivateRoute element={ViewAttendance} role="admin" />}
        />

        <Route
          path="/add-video"
          element={<PrivateRoute element={AddVideo} role="teacher" />}
        />
        <Route
          path="/generate-qr"
          element={<PrivateRoute element={AttendanceQRCode} role="teacher" />}
        />
        <Route
          path="/show-video"
          element={<PrivateRoute element={ShowVideo} role="student" />}
        />
     
        <Route
          path="/grad-two"
          element={<PrivateRoute element={Showgrad} role="student" />}
        />
        <Route
          path="/kids-schedule"
          element={<PrivateRoute element={KidsSchedule} role="parent" />}
        />
        <Route
          path="/kids-grades"
          element={<PrivateRoute element={KidsGrades} role="parent" />}
        />
        <Route
          path="/kids-attendance"
          element={<PrivateRoute element={KidsAttendance} role="parent" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
// export default withSplashScreen(App);
