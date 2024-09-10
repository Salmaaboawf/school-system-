
import { NavLink } from "react-router-dom";
// import { useState } from "react";
import { useAppSelector } from "../hooks/reduxHooks";



export default function Pagefooter() {
    const userInfo = useAppSelector((state) => state.user.user);
    // const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
   
    <div
    className={`  z-50  md:block md:w-auto`}
    id="navbar-default"
  >
    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-pink-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 px-3 rounded md:bg-transparent md:p-0 ${
              isActive ? "text-pink-500" : ""
            } hover:text-pink-800 transition-all duration-300`
          }
          aria-current="page"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `block py-2 px-3 rounded md:bg-transparent md:p-0 ${
              isActive ? "text-pink-500" : ""
            } hover:text-pink-800 transition-all duration-300`
          }
        >
          About
        </NavLink>
      </li>

      {userInfo.role === "admin" && (
        <li>
          <NavLink
            to="/video"
            className={({ isActive }) =>
              `block py-2 px-3  rounded md:bg-transparent md:p-0 ${
                isActive ? "text-orange-400" : ""
              }`
            }
          >
            Addvideo
          </NavLink>
        </li>
      )}

      <li>
        <NavLink
          to="/stuff"
          className={({ isActive }) =>
            `block py-2 px-3 rounded md:bg-transparent md:p-0 ${
              isActive ? "text-pink-500" : ""
            } hover:text-pink-800 transition-all duration-300`
          }
        >
          Stuff
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/student-subjects"
          className={({ isActive }) =>
            `block py-2 px-3 rounded md:bg-transparent md:p-0 ${
              isActive ? "text-pink-500" : ""
            } hover:text-pink-800 transition-all duration-300`
          }
        >
          subjects
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `block py-2 px-3 rounded md:bg-transparent md:p-0 ${
              isActive ? "text-pink-500" : ""
            } hover:text-pink-800 transition-all duration-300`
          }
        >
          Contact
        </NavLink>
      </li>

      {userInfo.role === "admin" && (
        <li>
          <NavLink
            to="/add-teacher"
            className={({ isActive }) =>
              `block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                isActive ? "text-pink-500" : ""
              } hover:text-pink-800 transition-all duration-300`
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </ul>
  </div>
  )
}