import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks';

function DashboardHeader({pageTitle}) {

    const userInfo = useAppSelector((state) => state.user.user);
    
  return (
    <div className="flex h-16 border-b-slate-400 border-b mb-2 items-center px-4 justify-between">
    <div className="flex">

    <h2 className="font-bold text-lg">Dashboard / </h2> <h3 className="text-lg"> {pageTitle}</h3>
    </div>
    <div className="w-[40px] h-[40px] bg-black rounded-full overflow-hidden border-2 border-[#bf5517]">
      <img
        src={userInfo.photoURL}
        alt="profile"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
  )
}

export default DashboardHeader