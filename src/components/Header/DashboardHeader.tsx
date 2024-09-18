import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { IoIosHome } from 'react-icons/io';
import { FaRegBell } from 'react-icons/fa';
import { resetUser } from '../../Redux/Slices/userSlice';
import { Link } from 'react-router-dom';
import { RiLogoutBoxRLine } from 'react-icons/ri';
function DashboardHeader({ pageTitle }) {
  const dispatch = useAppDispatch();
  function logout() {
    localStorage.removeItem("userId");
    dispatch(resetUser());
  }

  const userInfo = useAppSelector((state) => state.user.user);

  return (
    <div className="flex h-[70px] border-b-slate-400 border-b mb-4 items-center px-8 xs:pl-16 md:pl-8 justify-between">
      <div className="flex">

        <h2 className="font-bold text-lg">Dashboard / </h2> <h3 className="text-lg">&nbsp; {pageTitle}</h3>
      </div>


<div className="flex items-center space-x-4"> 
  {/* Home Icon */}
  <Link
    to="/"
    className="icon-button text-xl text-deepBlue hover:text-Orange"
  >
    <IoIosHome />
  </Link>

  {/* Notification Icon with Badge */}

  <div className="relative inline-block">
  <FaRegBell size={20} className="text-deepBlue" />
  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 bg-red-500 rounded-full text-white text-xs font-semibold">
    1
  </span>
</div>


  {/* Logout Icon */}
  <Link
    to="/"
    className="icon-button text-xl text-deepBlue hover:text-Orange"
    onClick={logout}
  >
    <RiLogoutBoxRLine />
  </Link>

  {/* Profile Picture */}
  <div className="w-[35px] h-[35px] bg-black rounded-full overflow-hidden border-2 border-[#bf5517]">
    <img
      src={userInfo.photoURL}
      alt="profile"
      className="w-full h-full object-cover"
    />
  </div>
</div>

    </div>
  )
}

export default DashboardHeader