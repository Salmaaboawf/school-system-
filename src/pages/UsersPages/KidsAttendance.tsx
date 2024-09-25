import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import { getKids } from '../../Redux/Slices/KidsSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/reduxHooks';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';

function KidsAttendance() {
    const dispatch = useDispatch();
    const kids = useAppSelector((state) => state.kids.kidsList);
    const [selectedKid, setSelectedKid] = useState(null);  // Store kid object
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userInfo = useAppSelector((state) => state.user.user);
  
    useEffect(() => {
      const parentId = userInfo.id;
      if (parentId) {
        dispatch(getKids(parentId));
      }
    }, [dispatch, userInfo.id]);

    useEffect(() => {
      if (selectedKid) {
        const fetchAttendance = async () => {
          try {
            setLoading(true);
            const attendanceCollection = collection(db, 'attendance');
            const q = query(attendanceCollection, where("studentId", "==", selectedKid.id)); // Use selectedKid.id
            const attendanceSnapshot = await getDocs(q);
            const attendanceList = attendanceSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAttendanceRecords(attendanceList);
          } catch (error) {
            setError("Failed to fetch attendance");
          } finally {
            setLoading(false);
          }
        };
  
        fetchAttendance();
      }
    }, [selectedKid]);  // Re-run whenever a new kid is selected

    // Function to get all school days in a date range (e.g., last 30 days)
    function getSchoolDays(startDate, endDate) {
        let days = [];
        let currentDate = new Date(startDate);
        while (currentDate <= new Date(endDate)) {
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 5) { // Skip weekends
                days.push(new Date(currentDate).toISOString().split("T")[0]);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return days;
    }

    // Get unique present dates from attendance records
    const presentDates = Array.from(
      new Set(
        attendanceRecords.map(
          (item) => new Date(item.timestamp).toISOString().split("T")[0]
        )
      )
    );

    // Define the date range (e.g., last 30 days)
    const schoolDays = getSchoolDays('2024-09-01', new Date());

    // Calculate absent days by excluding present dates from school days
    const absentDays = schoolDays.filter(day => !presentDates.includes(day));

    return (
      <>
        <div>
          <Nav />
        </div>

        <div className='container'>
          <div className="forms rounded-lg ">
            <div className="form max-w-full mt-20 p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Hello {userInfo.gender === 'male' ? 'Mr ' : "Mrs "}{userInfo.name}</h2>
              <form className="flex items-center space-x-4">
                <div className="flex flex-grow flex-wrap gap-4">
                  <select value={selectedKid ? selectedKid.id : ''} onChange={(e) => {
                    const selected = kids.find(kid => kid.id === e.target.value);
                    setSelectedKid(selected);
                  }}>
                    <option value="" disabled>Select a kid</option>
                    {kids.map((kid) => (
                      <option key={kid.id} value={kid.id}>{kid.name}</option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
          </div>

          <table className='w-full'>
            <tbody className='w-full'>
              <div className='w-[50rem] mx-auto'>
                <h3 className='font-bold text-xl text-center mb-4'>Attendance Records</h3>

                {/* Present Days */}
                <div>
                  <h4 className='font-bold text-lg w-full bg-green-500 text-white text-center py-2'>Present Days</h4>
                  {presentDates.map((date, index) => (
                    <div key={index} className='flex justify-between px-4 border-b'>
                      <span>{selectedKid ? selectedKid.name : ''}</span>
                      <span className='bg-green-500 text-white px-2 py-1 w-20 text-center my-1'>
                        {date}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Absent Days */}
                <div>
                  <h4 className='font-bold text-lg w-full bg-red-500 text-white text-center py-2'>Absent Days</h4>
                  {absentDays.map((date, index) => (
                    <div key={index} className='flex justify-between px-4 border-b'>
                      <span>{selectedKid ? selectedKid.name : ''}</span>
                      <span className='bg-red-500 text-white px-2 py-1 w-20 text-center my-1'>
                        {date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </tbody>
          </table>
        </div>
      </>
    );
}

export default KidsAttendance;
