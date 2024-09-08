import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { resetUser } from "../Redux/Slices/userSlice";
import { signOut } from "firebase/auth";
import auth from "../config/firebase";

function Nav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userInfo = useAppSelector((state) => state.user.user);

  // Toggle function for dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      console.log("logout fun");
      localStorage.removeItem("userId");
      dispatch(resetUser());

      // Sign out from Firebase
      await signOut(auth);

      // Navigate to the login page or another page
      navigate("/", { replace: true });

      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="">
      <nav className="border-2 rounded-lg p-4 m-4 bg-white border-gray-800 relative">
        <div className="max-w-screen-xl flex flex-row-reverse md:flex md:flex-row items-center justify-between mx-auto p-4">
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {userInfo.id ? (
              <>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded={isDropdownOpen}
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={userInfo.photoURL}
                    alt="user photo"
                  />
                </button>
                <div
                  className={`absolute right-12 top-10 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${
                    isDropdownOpen ? "block" : "hidden"
                  }`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {userInfo.firstName} {userInfo.lastName}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {userInfo.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    {userInfo.role === "teacher" && (
                      <li>
                        <NavLink
                          to="/teacher-table"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          MY Schedule (Teacher)
                        </NavLink>
                      </li>
                    )}

                    {(userInfo.role === "student" ||
                      userInfo.role === "parent") && (
                      <>
                        
                       
                        <li>
                          <NavLink
                            to="/my-subjects"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            My Grad
                          </NavLink>
                        </li>
                      </>
                    )}

                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `block py-2 px-3  rounded md:bg-transparent md:p-0 ${
                    isActive ? "text-orange-400" : ""
                  }`
                }
              >
                Login
              </NavLink>
            )}
          </div>
          <div className="max-w-screen-xl mx-auto px-4 py-2.5 relative">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              <div
                className={`absolute top-10 md:top-0  right-0 z-50  ${
                  isMenuOpen ? "block" : "hidden"
                }   md:block md:w-auto`}
                id="navbar-default"
              >
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `block py-2 px-3  rounded md:bg-transparent md:p-0 ${
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
                        `block py-2 px-3  rounded md:bg-transparent md:p-0 ${
                          isActive ? "text-orange-400" : ""
                        }`
                      }
                    >
                      About
                    </NavLink>
                  </li>
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
                  <li>
                    <NavLink
                      to="/stuff"
                      className={({ isActive }) =>
                        `block py-2 px-3  rounded md:bg-transparent md:p-0 ${
                          isActive ? "text-orange-400" : ""
                        }`
                      }
                    >
                      Stuff
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/student-subjects"
                      className={({ isActive }) =>
                        `block py-2 px-3  rounded md:bg-transparent md:p-0 ${
                          isActive ? "text-orange-400" : ""
                        }`
                      }
                    >
                      subjects
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/quiz"
                      className={({ isActive }) =>
                        `block py-2 px-3  rounded md:bg-transparent md:p-0 ${
                          isActive ? "text-orange-400" : ""
                        }`
                      }
                    >
                    quiz
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        `block py-2 px-3  rounded md:bg-transparent md:p-0 ${
                          isActive ? "text-orange-400" : ""
                        }`
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
                          `block py-2 px-3  rounded md:bg-transparent md:p-0 ${
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
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
