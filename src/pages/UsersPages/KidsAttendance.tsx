import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import { getKids } from '../../Redux/Slices/KidsSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/reduxHooks';

function KidsAttendance() {
    const dispatch = useDispatch();
    const kids = useAppSelector((state) => state.kids.kidsList);
    const [selectedKid, setSelectedKid] = useState("");
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userInfo = useAppSelector((state) => state.user.user);
  
    useEffect(() => {
      const parentId = userInfo.id
      if (parentId) {
        dispatch(getKids(parentId));
      }
    }, []);
  

  return (
    <>
    <div>
    <Nav />
  </div>

<div className='container'>
<div className="forms rounded-lg ">
  <div className="form max-w-full mt-20 p-6 bg-white rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold mb-4">Hello {userInfo.gender == 'male' ? 'Mr ' : "Mrs "}{userInfo.name}</h2>
    <form
    //   onSubmit={handleViewSchedule}
      className="flex items-center space-x-4"
    >
      <div className="flex flex-grow flex-wrap gap-4">

        <select value={selectedKid} onChange={(e) => setSelectedKid(e.target.value)}>
          <option value="" disabled>Select a kid</option>
          {kids.map((kid) => (
            <option key={kid.id} value={kid.id}>{kid.name}</option>
          ))}
        </select>
      </div>
      <div className="flex-shrink-0">
        <button
          type="submit"
          className="bg-[#002749] text-white px-6 py-3 rounded-lg h-12 hover:bg-[#577ce0]"
        >
          VIEW
        </button>
      </div>
    </form>
  </div>
</div>
</div>
</>
  )
}

export default KidsAttendance