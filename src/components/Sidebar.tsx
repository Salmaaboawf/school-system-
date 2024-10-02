import { useState } from "react";
import {  NavLink } from "react-router-dom";
import { RiMenuLine, RiCloseLine, RiCalendarScheduleLine } from "react-icons/ri";
import {
  FaUserPlus,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaChartLine,
  FaBookOpen,
  FaMarker,
} from "react-icons/fa";
// import { resetUser } from "../Redux/Slices/userSlice";
import logo from "../assets/splashLogo.png"
import { FaUsersGear } from "react-icons/fa6";
import { PiPhoneList } from "react-icons/pi";
import { BiBusSchool } from "react-icons/bi";
import { MdEvent } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-[100vh]">
      {/* Hide scrollbar styles */}
      <style>
        {`
          .hide-scrollbar {
            scrollbar-width: none; /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* WebKit */
          }
        `}
      </style>
      {/* Toggle Icon for Small Screens */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-30 text-white bg-deepBlue p-2 rounded-full focus:outline-none transition-transform duration-300 transform hover:scale-105"
      >
        {isOpen ? (
          <RiCloseLine className="text-2xl bg-rustOrange rounded-full w-8 h-8" />
        ) : (
          <RiMenuLine className="text-2xl" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed h-dvh inset-y-0 left-0 sm:w-full sm:max-w-[20rem] md:w-auto md:max-w-none bg-deepBlue text-white shadow-xl transition-transform duration-500 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64 z-20`}
      >
        <div className="flex flex-row items-center justify-center text-center">
          <img src={logo} alt="" className="w-20 pt-3" />
          <h1 className="text-white ml-4">SCHOOLARSWAY School</h1>
        </div>
        <div className="overflow-y-scroll max-h-[calc(100vh-100px)] hide-scrollbar">
          <ul className="list-none">
            <li className="mb-3">
              <NavLink
                to="/add-teacher"
                className={({ isActive }) => {
                  return `sidebarButton ${
                    isActive ? "sidebarButtonActive" : ""
                  }`;
                }}
              >
                <FaChalkboardTeacher className="text-2xl text-gray-300 sidebarIcon" />
                <span>Add Teacher </span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/add-parent"
                className={({ isActive }) => {
                  return `sidebarButton ${
                    isActive ? "sidebarButtonActive" : ""
                  }`;
                }}
              >
                <FaUserPlus className="text-2xl text-gray-300 sidebarIcon" />
                <span>Add Parent</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/add-student"
                className={({ isActive }) => {
                  return `sidebarButton ${
                    isActive ? "sidebarButtonActive" : ""
                  }`;
                }}
              >
                <FaUserGraduate className="text-2xl text-gray-300 sidebarIcon" />
                <span>Add Student</span>
              </NavLink>
            </li>

            <li className="mb-3">
              <NavLink
                to="/add-class"
                className={({ isActive }) => {
                  return `sidebarButton ${
                    isActive ? "sidebarButtonActive" : ""
                  }`;
                }}
              >
                <FaChartLine className="text-2xl text-gray-300 sidebarIcon" />
                <span>Add Class</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/add-class-routine"
                className={({ isActive }) => {
                  return `sidebarButton  ${
                    isActive ? "sidebarButtonActive" : ""
                  }`;
                }}
              >
                <RiCalendarScheduleLine className="text-2xl text-gray-400 sidebarIcon" />
                <span>Add Class routine</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/add-subject"
                className={({ isActive }) => {
                  return `sidebarButton ${
                    isActive ? "sidebarButtonActive" : ""
                  }`;
                }}
              >
                <FaBookOpen className="text-2xl text-gray-400 sidebarIcon" />

                <span>Add Subject</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/grad"
                className={({ isActive }) => {
                  return `sidebarButton ${
                    isActive ? "sidebarButtonActive" : ""
                  }`;
                }}
              >
                <FaMarker className="text-2xl text-gray-400 sidebarIcon" />

                <span>Add Grades</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/add-event"
                className={({ isActive }) => {
                  return `sidebarButton ${
                    isActive ? "sidebarButtonActive" : ""
                  }`;
                }}
              >
                <MdEvent className="text-2xl text-gray-400 sidebarIcon" />

                <span>Add Event</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/users"
                className={({ isActive }) => {
                  return `sidebarButton ${
                    isActive ? "sidebarButtonActive" : ""
                  }`;
                }}
              >
                <FaUsersGear className="text-2xl text-gray-300 sidebarIcon" />
                <span>View Users</span>
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/show-contact"
                className={({ isActive }) => {
                  return `sidebarButton ${
                    isActive ? "sidebarButtonActive" : ""
                  }`;
                }}
              >
                <PiPhoneList className="text-2xl text-gray-400 sidebarIcon" />

                <span>View Contact</span>
              </NavLink>
            </li>

            <li className="mb-3">
              <NavLink
                to="/show-attendance"
                className={({ isActive }) => {
                  return `sidebarButton ${
                    isActive ? "sidebarButtonActive" : ""
                  }`;
                }}
              >
                <BiBusSchool className="text-2xl text-gray-400 sidebarIcon" />

                <span>View Attendance</span>
              </NavLink>
            </li>
          </ul>
        </div>
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
