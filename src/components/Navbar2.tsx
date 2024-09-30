import React, { useState } from 'react'
import { useAppSelector } from '../hooks/reduxHooks';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import mylogo from '../assets/splashLogo.png';
import { resetUser } from '../Redux/Slices/userSlice';
import auth from '../config/firebase';
import { FaRegBell } from 'react-icons/fa';
import NotificationList from './NotificationList';
import { RiCalendarScheduleLine, RiLogoutCircleRLine } from 'react-icons/ri';
import { PiBooksLight, PiExam } from 'react-icons/pi';
import { MdMenu, MdOndemandVideo, MdOutlinePeopleAlt } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { IoMdHome } from 'react-icons/io';
import unknownUser from "../assets/images/unknown user.jpg";
function Navbar2() {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationsDropdown, setNotificationsDropdown] = useState(false);
  const userInfo = useAppSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("userId");
      dispatch(resetUser());
      await signOut(auth);
      navigate("/", { replace: true });
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };


  return (
    <nav className='bg-[#f5f4f4] w-full h-14 relative'>
      <div className='container flex justify-between items-center  py-2 px-4'>

        {/* logo section appears on all screens*/}
        <div className='mylogo w-[2.8rem]'>
          <img src={mylogo} alt="Logo" className="w-full" />
          <NavLink
            to="/"
            aria-current="page"
          >
          </NavLink>
        </div>

        {/* pages section on large screens hidden on small screens*/}
        <div className='pages md:flex gap-x-9 sm:hidden xs:hidden'>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navPage ${isActive ? "text-Orange border-b border-Orange" : "text-deepBlue"}`
            }
            aria-current="page"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `navPage ${isActive ? "text-Orange border-b border-Orange" : "text-deepBlue"}`
            }
            aria-current="page"
          >
            About
          </NavLink>
          <NavLink
            to="/stuff"
            className={({ isActive }) =>
              `navPage ${isActive ? "text-Orange border-b border-Orange" : "text-deepBlue"}`
            }
            aria-current="page"
          >
            Teachers
          </NavLink>
          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              `navPage ${isActive ? "text-Orange border-b border-Orange" : "text-deepBlue"}`
            }
            aria-current="page"
          >
            Calendar
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `navPage ${isActive ? "text-Orange border-b border-Orange" : "text-deepBlue"}`
            }
            aria-current="page"
          >
            Contact
          </NavLink>
        </div>

        {/* profile section on large screens hidden on small screens*/}
        <div className='profile-section flex '>
          {userInfo.id ? (
            <>
              {userInfo.role == "student" && (
                <button
                  className="flex items-center mx-4 hover:text-Orange text-deepBlue transition duration-200"
                  onClick={() =>
                    setNotificationsDropdown(!notificationsDropdown)
                  }
                >
                  <FaRegBell size={20} />
                </button>
              )}
              <div
                className={`absolute right-12 top-10 min-h-[100px] min-w-[300px] z-50 my-4 text-base list-none bg-slate-200 divide-y divide-pink-100 rounded-lg shadow ${notificationsDropdown ? "block" : "hidden"}`}
                id="user-dropdown"
              >
                <NotificationList />
              </div>
              <button
                type="button"
                className="flex rounded-full md:me-0 focus:ring-2 focus:ring-Orange hover:ring-2 transition duration-200"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >
                <div
                  className={`profileMen absolute right-8 top-12 mt-4 text-base list-none bg-[#f4f4f4] divide-y divide-pink-100 rounded-lg  shadow ${isDropdownOpen ? "block" : "hidden"
                    }`}
                  style={{ zIndex: 1000 }}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-Orange truncate">
                      {userInfo.email}
                    </span>
                  </div>
                  <ul aria-labelledby="user-menu-button">
                    {userInfo.role === "teacher" && (
                      <li>
                        <NavLink
                          to="/teacher-table"
                          className="profileLink"
                        >
                          <RiCalendarScheduleLine className="profileLinkIcon" />
                          Teacher Schedule
                        </NavLink>
                      </li>
                    )}

                    {userInfo.role === "student" && (
                      <>
                        <li>
                          <NavLink
                            to="/grades"
                            className="profileLink"
                          >
                            <PiExam className="profileLinkIcon" />
                            {/* <PiExamFill className="mr-2 text-lg"/> */}
                            My Grades
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/student-table" className="profileLink">
                            <RiCalendarScheduleLine className="profileLinkIcon" />
                            My Schedule
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/subjects"
                            className={'profileLink'}
                          >
                            <PiBooksLight className="profileLinkIcon" />
                            My Subjects
                          </NavLink>
                        </li>
                      </>
                    )}

                    {userInfo.role === "parent" && (
                      <>
                        <li>
                          <NavLink
                            to="/kids-schedule"
                            className="profileLink"
                          >
                            My Kids' Schedule
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/kids-grades"
                            className="profileLink"
                          >
                            My Kids' Grades
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/kids-attendance"
                            className="profileLink"
                          >
                            My Kids' Attendance
                          </NavLink>
                        </li>
                      </>
                    )}

                    {userInfo.role === "teacher" && (
                      <>
                        <li>
                          <NavLink
                            to="/AddQuiz"
                            className="profileLink"
                          >
                            <PiExam className="profileLinkIcon" />
                            Add Quiz
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/video"
                            className="profileLink"
                          >
                            <MdOndemandVideo className="profileLinkIcon" />
                            Add Class Materials
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/generate-qr"
                            className="profileLink"
                          >
                            <MdOutlinePeopleAlt className="profileLinkIcon" />
                            Take Attandance
                          </NavLink>
                        </li>
                      </>
                    )}

                    {userInfo.role === "admin" && (
                      <li>
                        <NavLink
                          to="/add-teacher"
                          className="profileLink"
                        >
                          <RxDashboard className="profileLinkIcon" />
                          Dashboard
                        </NavLink>
                      </li>
                    )}

                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-sm hover:rounded-b-lg hover:text-Orange"
                      >
                        <RiLogoutCircleRLine className="profileLinkIcon text-base" />
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
                <img className="w-8 h-8 rounded-full" src={userInfo.photoURL || unknownUser} alt="user photo" />
              </button>
              <div
                className={`profileMen absolute right-8 top-12 mt-4 text-base list-none bg-[#f4f4f4] divide-y divide-pink-100 rounded-lg  ${isDropdownOpen ? "block" : "hidden"}`}
                style={{ zIndex: 1000 }}
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-Orange truncate">{userInfo.email}</span>
                </div>
              </div>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `sm:hidden xs:hidden navPage ${isActive ? "text-Orange border-b border-Orange" : "text-deepBlue"}`
              }
            >
              Login
            </NavLink>
          )}
        </div>

        {/* menu button on small screens */}
        <div className='sm:block md:hidden'>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center p-1 text-2xl text-deepBlue rounded-lg md:hidden hover:text-Orange focus:outline-none focus:text-Orange focus:ring-2 focus:ring-Orange transition duration-200"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <MdMenu />
          </button>
        </div>

        {/* pages dropdown menu on small screens */} 
        {isMenuOpen &&  <div className='md:hidden gap-y-1 sm:flex flex-col absolute top-12 right-[4rem] bg-[#f0efef] rounded-lg w-44 z-50'>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navPage flex h-10 ${isActive ? "text-Orange border-b border-Orange" : "text-deepBlue"}`
            }
            aria-current="page"
          >
            {/* <IoMdHome /> */}
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `navPage h-10 ${isActive ? "text-Orange border-b border-Orange" : "text-deepBlue"}`
            }
            aria-current="page"
          >
            About
          </NavLink>
          <NavLink
            to="/stuff"
            className={({ isActive }) =>
              `navPage h-10 ${isActive ? "text-Orange border-b border-Orange" : "text-deepBlue"}`
            }
            aria-current="page"
          >
            Teachers
          </NavLink>
          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              `navPage h-10 ${isActive ? "text-Orange border-b border-Orange" : "text-deepBlue"}`
            }
            aria-current="page"
          >
            Calendar
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `navPage h-10 ${isActive ? "text-Orange border-b border-Orange" : "text-deepBlue"}`
            }
            aria-current="page"
          >
            Contact
          </NavLink>
          <NavLink
              to="/login"
              className={({ isActive }) =>
                `navPage h-10 hover:rounded-b-lg ${isActive ? "text-Orange border-b rounded-b-lg border-Orange" : "text-deepBlue"}`
              }
            >
              Login
            </NavLink>
        </div>}
       

      </div>



    </nav>
  )
}

export default Navbar2