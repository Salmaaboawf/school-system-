import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { IoIosHome } from 'react-icons/io';
import { FaRegBell } from 'react-icons/fa';
import { resetUser } from '../../Redux/Slices/userSlice';
import { Link } from 'react-router-dom';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { getUnreadContact } from '../../services/contactService';
function DashboardHeader({ pageTitle }) {
  const dispatch = useAppDispatch();
  function logout() {
    localStorage.removeItem("userId");
    dispatch(resetUser());
  }

  const userInfo = useAppSelector((state) => state.user.user);
  const [notficationNum, setNotficationNum] = useState(0)
  // useEffect(()=>{
  //   const fetchUnreadNotifications = async () => {
  //     try {
  //       const unreadMessages = await getUnreadContact();
  //       setNotficationNum(unreadMessages.length); // Set the length of unread messages
  //     } catch (error) {
  //       console.error('Error fetching unread messages:', error);
  //     }
  //   };

  //   fetchUnreadNotifications(); 
  // },[])

  useEffect(() => {
    // Define the callback that will update the notification count
    const updateNotificationCount = (unreadContacts) => {
      setNotficationNum(unreadContacts.length);
    };

    // Call getUnreadContact and pass the callback
    const unsubscribe = getUnreadContact(updateNotificationCount);

    // Cleanup by unsubscribing when the component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

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
          <Link
            to="/show-contact"
            className="icon-button text-xl text-deepBlue hover:text-Orange"
          >
            <FaRegBell />
          </Link>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 bg-red-500 rounded-full text-white text-xs font-medium">
            {notficationNum}
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