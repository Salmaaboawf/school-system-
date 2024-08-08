import { Link, NavLink } from "react-router-dom";
import imgProfile from "../assets/images/profileImg.png";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4 flex flex-col md:flex-row gap-x-2 items-center">
        <div className="w-[50px] h-[50px]  bg-black rounded-full overflow-hidden border-[3px] border-green-600">
          <img src={imgProfile} alt="profile" className="w-full h-full" />
        </div>
        {/*  */}
        <div className="flex-1">
          <h2 className="font-bold text-base my-2 md:my-0">Ahmed Mohamed</h2>
          <div className="flex">
            <Link to="#" className="mr-4">
              <RiLogoutBoxRLine />
            </Link>
            <Link to="#">
              <FaEdit />
            </Link>
          </div>
        </div>
      </div>
      <ul className="list-none ">
        <li className="flex items-center">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => {
              return `font-bold px-3 py-3 w-full transition-all ${
                isActive ? "bg-slate-200" : ""
              }`;
            }}
          >
            Home
          </NavLink>
        </li>
        <li className="flex items-center">
          <NavLink
            to="/schedule"
            className={({ isActive }) => {
              return `font-bold px-3 py-3 w-full transition-all ${
                isActive ? "bg-slate-200" : ""
              }`;
            }}
          >
            My Schedule
          </NavLink>
        </li>
        <li className="flex items-center">
          <NavLink
            to="/student-table"
            className={({ isActive }) => {
              return `font-bold px-3 py-3 w-full transition-all ${
                isActive ? "bg-slate-200" : ""
              }`;
            }}
          >
            My exams
          </NavLink>
        </li>
        <li className="flex items-center">
          <NavLink
            to="/dash-classes"
            className={({ isActive }) => {
              return `font-bold px-3 py-3 w-full transition-all ${
                isActive ? "bg-slate-200" : ""
              }`;
            }}
          >
            My classes
          </NavLink>
        </li>
        <li>
          <p className="text-center font-bold my-3">ADD ACCOUNTS</p>
          <ul className="ml-3">
            <li className="my-3">
              <NavLink
                to="/teacher-table"
                className={({ isActive }) => {
                  return `font-bold px-3 py-3 w-full transition-all ${
                    isActive ? "bg-slate-200" : ""
                  }`;
                }}
              >
                Teacher
              </NavLink>
            </li>
            <li className="my-3">
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return `font-bold px-3 py-3 w-full transition-all ${
                    isActive ? "bg-slate-200" : ""
                  }`;
                }}
              >
                Parent
              </NavLink>
            </li>
            <li className="my-3">
              <NavLink
                to="/"
                className={({ isActive }) => {
                  return `font-bold px-3 py-3 w-full transition-all ${
                    isActive ? "bg-slate-200" : ""
                  }`;
                }}
              >
                Student
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
