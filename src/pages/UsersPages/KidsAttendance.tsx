
// import React, { useEffect, useState } from 'react';
// import Nav from '../../components/Nav';
// import { getKids } from '../../Redux/Slices/KidsSlice';
// import { useDispatch } from 'react-redux';
// import { useAppSelector } from '../../hooks/reduxHooks';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../config/firebase';
// import { FaCheck } from 'react-icons/fa';
// import { FaX } from 'react-icons/fa6';

// function KidsAttendance() {
//     const dispatch = useDispatch();
//     const kids = useAppSelector((state) => state.kids.kidsList);
//     const [selectedKid, setSelectedKid] = useState(null);
//     const [attendanceRecords, setAttendanceRecords] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const userInfo = useAppSelector((state) => state.user.user);
//     const [uniqueDates, setUniqueDates] = useState([])

//     useEffect(() => {
//         const parentId = userInfo.id;
//         if (parentId) {
//             dispatch(getKids(parentId));
//         }
//     }, [dispatch, userInfo.id]);


//     const handleViewAttendance = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         try {
//             // Fetch all attendance records
//             const attendanceSnapshot = await getDocs(collection(db, "attendance"));
//             const records = attendanceSnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));

//             // Extract unique dates
//             const allDates = Array.from(
//                 new Set(records.map((record) => record.timestamp)) // unique timestamps
//             );
//             allDates.sort((a, b) => new Date(b) - new Date(a));
//             setUniqueDates(allDates);

//             // Filter attendance records for selected kid
//             const kidAttendanceRecords = records.filter(
//                 (record) => {
//                     console.log(record.studentId); // Log the studentId for debugging
//                     return record.studentId === selectedKid; // Fix: Return the comparison result
//                 }
//             );

//             setAttendanceRecords(kidAttendanceRecords);
//         } catch (err) {
//             setError("Failed to fetch attendance records.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getAttendanceStatus = (date) => {
//         const record = attendanceRecords.find(
//             (rec) => rec.timestamp === date && rec.studentId === selectedKid
//         );
//         return record ? record.status : "absent";
//     };
//     return (
//         <>
//             <div>
//                 <Nav />
//             </div>

//             <div className='container'>

//                 <div className="forms rounded-lg ">
//                     <div className="form max-w-full mt-20 p-6 bg-white rounded-lg shadow-lg">
//                         <h2 className="text-2xl font-semibold mb-4">Hello {userInfo.gender == 'male' ? 'Mr ' : "Mrs "}{userInfo.name}</h2>
//                         <form
//                             onSubmit={handleViewAttendance}
//                             className="flex items-center space-x-4"
//                         >
//                             <div className="flex flex-grow flex-wrap gap-4">

//                                 <select value={selectedKid} onChange={(e) => setSelectedKid(e.target.value)}>
//                                     <option value="" disabled>Select a kid</option>
//                                     {kids.map((kid) => (
//                                         <option key={kid.id} value={kid.id}>{kid.name}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="flex-shrink-0">
//                                 <button
//                                     type="submit"
//                                     className="bg-[#002749] text-white px-6 py-3 rounded-lg h-12 hover:bg-[#577ce0]"
//                                 >
//                                     VIEW
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>

//                 {!selectedKid && <p className='noData'>Please select a kid to view their Schedule.</p>}
//                 {/* {selectedKid && schedule.length === 0 && !loading && !error && (
//           <p className='noData'>No Schedule available for the selected kid.</p>
//         )} */}
//             </div>

//             {selectedKid && uniqueDates.length > 0 && (
//                 <table className="table-auto w-full mt-6 px-10">
//                     <thead>
//                         <tr className='bg-deepBlue text-white'>
//                             <th className="px-4 py-2">Date</th>
//                             <th className="px-4 py-2">Attendance Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {uniqueDates.map((date) => (
//                             <tr key={date} className='text-center'>
//                                 <td className="border px-4 py-2">{date}</td>
//                                 <td className="border px-4 py-2 justify-center items-center" >
//             {getAttendanceStatus(date) === "present" ? (
//                 <>
//                     <FaCheck className='text-green-600 mx-auto' /> {/* Show check icon in green */}
//                 </>
//             ) : (
//                 <>
//                     <FaX className='text-red-600 mx-auto' /> {/* Show X icon in red */}
//                 </>
//             )}
//         </td>
//                             </tr>
                           
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </>
//     );
// }

// export default KidsAttendance;


import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import { getKids } from '../../Redux/Slices/KidsSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/reduxHooks';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaCheck } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';

function KidsAttendance() {
    const dispatch = useDispatch();
    const kids = useAppSelector((state) => state.kids.kidsList);
    const [selectedKid, setSelectedKid] = useState(null);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userInfo = useAppSelector((state) => state.user.user);
    const [uniqueDates, setUniqueDates] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all'); // New state for filtering by status

    useEffect(() => {
        const parentId = userInfo.id;
        if (parentId) {
            dispatch(getKids(parentId));
        }
    }, [dispatch, userInfo.id]);

    const handleViewAttendance = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Fetch all attendance records
            const attendanceSnapshot = await getDocs(collection(db, "attendance"));
            const records = attendanceSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            // Extract unique dates
            const allDates = Array.from(
                new Set(records.map((record) => record.timestamp)) // unique timestamps
            );
            allDates.sort((a, b) => new Date(b) - new Date(a));
            setUniqueDates(allDates);

            // Filter attendance records for selected kid
            const kidAttendanceRecords = records.filter(
                (record) => record.studentId === selectedKid
            );

            setAttendanceRecords(kidAttendanceRecords);
        } catch (err) {
            setError("Failed to fetch attendance records.");
        } finally {
            setLoading(false);
        }
    };

    const getAttendanceStatus = (date) => {
        const record = attendanceRecords.find(
            (rec) => rec.timestamp === date && rec.studentId === selectedKid
        );
        return record ? record.status : "absent";
    };

    const filteredDates = uniqueDates.filter((date) => {
        if (filterStatus === 'all') return true;
        return getAttendanceStatus(date) === filterStatus;
    });

    return (
        <>

            <div className='container'>
                <div className="forms rounded-lg">
                    <div className="form max-w-full mt-20 p-6 bg-white rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">
                            Hello {userInfo.gender === 'male' ? 'Mr ' : 'Mrs '}{userInfo.name}
                        </h2>
                        <form onSubmit={handleViewAttendance} className="flex items-center space-x-4">
                            <div className="flex flex-grow flex-wrap gap-4">
                                <select value={selectedKid} onChange={(e) => setSelectedKid(e.target.value)}>
                                    <option value="" disabled selected>Select a kid</option>
                                    {kids.map((kid) => (
                                        <option key={kid.id} value={kid.id}>{kid.name}</option>
                                    ))}
                                </select>

                                {/* Filter by Attendance Status */}
                                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                    <option value="all">All</option>
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
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

                {!selectedKid && <p className='noData'>Please select a kid to view their attendance.</p>}
            </div>

            {selectedKid && filteredDates.length > 0 && (
                <table className="table-auto w-full mt-6 px-10">
                    <thead>
                        <tr className='bg-deepBlue text-white'>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Attendance Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDates.map((date) => (
                            <tr key={date} className='text-center'>
                                <td className="border px-4 py-2">{date}</td>
                                <td className="border px-4 py-2 justify-center items-center">
                                    {getAttendanceStatus(date) === "present" ? (
                                        <FaCheck className='text-green-600 mx-auto' />
                                    ) : (
                                        <FaX className='text-red-600 mx-auto' />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default KidsAttendance;

