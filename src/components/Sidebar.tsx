import { Link } from "react-router-dom";
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
      <ul className="list-none p-0">
        <li className="flex items-center mb-4">
          <Link to="/">Home</Link>
        </li>
        <li className="flex items-center mb-4">
          <Link to="/">My Schedule</Link>
        </li>
        <li className="flex items-center mb-4">
          <Link to="/">My exams</Link>
        </li>
        <li className="flex items-center mb-4">
          <Link to="/">My classes</Link>
        </li>
        <li>
          Add
          <ul className="ml-3">
            <li>
              <Link to="/">Teacher</Link>
            </li>
            <li>
              <Link to="/">Parent</Link>
            </li>
            <li>
              <Link to="/">Student</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
