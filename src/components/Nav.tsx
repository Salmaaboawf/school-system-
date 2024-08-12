import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  age: number;
  type: string;
};

function Nav() {
  const user = useAppSelector((state) => state.user.user);
  const userId = localStorage.getItem("userId");

  return (
    <div>
      <nav className="bg-white border-gray-800">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-3 bg-orange-700 rounded md:bg-transparent md:p-0 ${
                      isActive ? "text-orange-400" : ""
                    }`
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
                    `block py-2 px-3 bg-orange-700 rounded md:bg-transparent md:p-0 ${
                      isActive ? "text-orange-400" : ""
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/stuff"
                  className={({ isActive }) =>
                    `block py-2 px-3 bg-orange-700 rounded md:bg-transparent md:p-0 ${
                      isActive ? "text-orange-400" : ""
                    }`
                  }
                >
                  Stuff
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-2 px-3 bg-orange-700 rounded md:bg-transparent md:p-0 ${
                      isActive ? "text-orange-400" : ""
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
              {!userId && (
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `block py-2 px-3 bg-orange-700 rounded md:bg-transparent md:p-0 ${
                        isActive ? "text-orange-400" : ""
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </li>
              )}
              {user.type == "admin" && (
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `block py-2 px-3 bg-orange-700 rounded md:bg-transparent md:p-0 ${
                        isActive ? "text-orange-400" : ""
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
