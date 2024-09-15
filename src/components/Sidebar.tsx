import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiMenuLine, RiCloseLine, RiCalendarScheduleLine } from "react-icons/ri";
import {
  FaUserPlus,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaChartLine,
  FaBookOpen,
  FaMarker,
} from "react-icons/fa";
import { useAppDispatch } from "../hooks/reduxHooks";
import { resetUser } from "../Redux/Slices/userSlice";
import logo from "../assets/images/Blue_Colorful_Pastel_Retro_Class_Logo__1_-removebg-preview.png"
import { FaUsersGear } from "react-icons/fa6";
import logo from "../assets/images/Blue_Colorful_Pastel_Retro_Class_Logo__1_-removebg-preview.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  function logout() {
    localStorage.removeItem("userId");
    dispatch(resetUser());
  }

  return (
    <div className="relative h-[calc(100vh-2rem)]">
      {/* Toggle Icon for Small Screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-30 text-white bg-[#023059] p-2 rounded-full focus:outline-none transition-transform duration-300 transform hover:scale-110"
      >
        {isOpen ? (
          <RiCloseLine className="text-3xl" />
        ) : (
          <RiMenuLine className="text-3xl" />
        )}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 sm:w-full sm:max-w-[20rem] md:w-auto md:max-w-none bg-[#023059] text-white shadow-xl transition-transform duration-500 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64 z-20`}
      >
        <div className="flex flex-row items-center justify-center text-center">
          <img src={logo} alt="KIDOS SCHOOL Logo" className="w-20" />
          <h1 className="text-white ml-4">KIDOS SCHOOL</h1>
        </div>

        <ul className="list-none">
          <li className="mb-3">
            <NavLink
              to="/add-teacher"
              className={({ isActive }) =>
                `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-[#8fc4d9] rounded-md transition-transform transform hover:translate-x-2 ${
                  isActive ? "bg-[#8fc4d9]" : ""
                }`
              }
            >
              <FaChalkboardTeacher className="text-2xl text-gray-300" />
              <span>Add Teacher</span>
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/add-parent"
              className={({ isActive }) =>
                `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-[#8fc4d9] rounded-md transition-transform transform hover:translate-x-2 ${
                  isActive ? "bg-[#8fc4d9]" : ""
                }`
              }
            >
              <FaUserPlus className="text-2xl text-gray-300" />
              <span>Add Parent</span>
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/add-student"
              className={({ isActive }) =>
                `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-[#8fc4d9] rounded-md transition-transform transform hover:translate-x-2 ${
                  isActive ? "bg-[#8fc4d9]" : ""
                }`
              }
            >
              <FaUserGraduate className="text-2xl text-gray-300" />
              <span>Add Student</span>
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-[#8fc4d9] rounded-md transition-transform transform hover:translate-x-2 ${
                  isActive ? "bg-[#8fc4d9]" : ""
                }`
              }
            >
              <FaUsersGear className="text-2xl text-gray-300" />
              <span>All Users</span>
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/add-class"
              className={({ isActive }) =>
                `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-[#8fc4d9] rounded-md transition-transform transform hover:translate-x-2 ${
                  isActive ? "bg-[#8fc4d9]" : ""
                }`
              }
            >
              <FaChartLine className="text-2xl text-gray-300" />
              <span>Add Levels</span>
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/add-class-routine"
              className={({ isActive }) =>
                `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-[#8fc4d9] rounded-md transition-transform transform hover:translate-x-2 ${
                  isActive ? "bg-[#8fc4d9]" : ""
                }`
              }
            >
              <RiCalendarScheduleLine className="text-2xl text-gray-400" />
              <span>Add Class Routine</span>
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/add-subject"
              className={({ isActive }) =>
                `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-[#8fc4d9] rounded-md transition-transform transform hover:translate-x-2 ${
                  isActive ? "bg-[#8fc4d9]" : ""
                }`
              }
            >
              <FaBookOpen className="text-2xl text-gray-400" />
              <span>Add Subject</span>
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/grad"
              className={({ isActive }) =>
                `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-[#8fc4d9] rounded-md transition-transform transform hover:translate-x-2 ${
                  isActive ? "bg-[#8fc4d9]" : ""
                }`
              }
            >
              <FaMarker className="text-2xl text-gray-400" />
              <span>Add Grades</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Overlay for Small Screens */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden transition-opacity duration-300"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
