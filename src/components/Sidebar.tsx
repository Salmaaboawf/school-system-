import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import imgProfile from "../assets/images/profileImg.png";
import { RiLogoutBoxRLine, RiMenuLine, RiCloseLine } from "react-icons/ri";
import {
  FaEdit,
  FaUserPlus,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaChartLine,
} from "react-icons/fa";
import { useAppDispatch } from "../hooks/reduxHooks";
import { resetUser } from "../Redux/Slices/userSlice";

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
    <div className="relative h-[calc(100vh-2rem)] w-full max-w-[20rem]">
      {/* Toggle Icon for Small Screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-30 text-white bg-gray-800 p-2 rounded-full focus:outline-none"
      >
        {isOpen ? (
          <RiCloseLine className="text-3xl" />
        ) : (
          <RiMenuLine className="text-3xl" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 h-[100vh] w-full max-w-[20rem] bg-gray-800 text-white shadow-xl transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64 z-20`}
      >
        <div className="mb-4 p-4 flex flex-col items-center">
          <div className="w-[60px] h-[60px] bg-black rounded-full overflow-hidden border-4 border-green-500">
            <img
              src={imgProfile}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="font-bold text-lg mt-4">Ahmed Mohamed</h2>
          <div className="flex mt-2 space-x-4">
            <Link
              to="/"
              className="text-xl text-gray-400 hover:text-white transition"
              onClick={logout}
            >
              <RiLogoutBoxRLine />
            </Link>
            <Link
              to="#"
              className="text-xl text-gray-400 hover:text-white transition"
            >
              <FaEdit />
            </Link>
          </div>
        </div>
        <ul className="list-none">
          <li className="mb-3">
            <NavLink
              to="/add-teacher"
              className={({ isActive }) => {
                return `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-gray-700 rounded-md transition ${
                  isActive ? "bg-gray-700" : ""
                }`;
              }}
            >
              <FaChalkboardTeacher className="text-2xl text-gray-400" />
              <span>Add Teacher</span>
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/add-parent"
              className={({ isActive }) => {
                return `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-gray-700 rounded-md transition ${
                  isActive ? "bg-gray-700" : ""
                }`;
              }}
            >
              <FaUserPlus className="text-2xl text-gray-400" />
              <span>Add Parent</span>
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/add-student"
              className={({ isActive }) => {
                return `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-gray-700 rounded-md transition ${
                  isActive ? "bg-gray-700" : ""
                }`;
              }}
            >
              <FaUserGraduate className="text-2xl text-gray-400" />
              <span>Add Student</span>
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/add-class"
              className={({ isActive }) => {
                return `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-gray-700 rounded-md transition ${
                  isActive ? "bg-gray-700" : ""
                }`;
              }}
            >
              <FaChartLine className="text-2xl text-gray-400" />
              <span>Add Levels </span>
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/add-class-routine"
              className={({ isActive }) => {
                return `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-gray-700 rounded-md transition ${
                  isActive ? "bg-gray-700" : ""
                }`;
              }}
            >
              <FaChartLine className="text-2xl text-gray-400" />
              <span>Add Class routine</span>
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/add-subject"
              className={({ isActive }) => {
                return `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-gray-700 rounded-md transition ${
                  isActive ? "bg-gray-700" : ""
                }`;
              }}
            >
              <FaChartLine className="text-2xl text-gray-400" />
              <span>Add Subject</span>
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to="/grad"
              className={({ isActive }) => {
                return `flex items-center space-x-3 text-lg font-semibold px-4 py-3 w-full hover:bg-gray-700 rounded-md transition ${
                  isActive ? "bg-gray-700" : ""
                }`;
              }}
            >
              <FaChartLine className="text-2xl text-gray-400" />
              <span>Add Grades</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Overlay for Small Screens */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
