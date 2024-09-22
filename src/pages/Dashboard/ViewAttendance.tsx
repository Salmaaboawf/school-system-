import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/Header/DashboardHeader';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/reduxHooks';
import { fetchLevels } from '../../services/levelsServices';

function ViewAttendance() {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLevel, setSelectedLevel] = useState(''); // To store selected level

    const dispatch = useDispatch();
    const levels = useAppSelector(state => state.levels.levels);
    useEffect(() => {
        fetchLevels(dispatch);
        const fetchData = async () => {
            // Fetch students
            const studentsCollection = collection(db, 'students');
            const studentsSnapshot = await getDocs(studentsCollection);
            const studentsList = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStudents(studentsList);


            let recordsQuery;
            if (selectedLevel) {
                recordsQuery = query(collection(db, 'attendance'), where('levelId', '==', selectedLevel));
            } else {
                recordsQuery = collection(db, 'attendance'); // Fetch all records if no level is selected
            }

            // Fetch attendance records
            const recordsSnapshot = await getDocs(recordsQuery);
            const recordsList = recordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAttendanceRecords(recordsList);
        };

        fetchData();
    }, []);


    const recordsWithStatus = students.map(student => {
        const attendanceRecord = attendanceRecords.find(record => record.studentId === student.id);
        return {
            studentName: student.name,
            date: attendanceRecord ? attendanceRecord.date : 'N/A',  // Date from attendance record
            timestamp: attendanceRecord ? attendanceRecord.timestamp : 'N/A',
            status: attendanceRecord ? attendanceRecord.status : 'absent', // Mark absent if no record exists
        };
    });

    const filteredRecords = recordsWithStatus
        .filter(record => record.studentName.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(record => !selectedLevel || record.levelId === selectedLevel);
    return (
        <>
            <div className='flex'>
                <div className='w-[20%]'>
                    <Sidebar />
                </div>
                <div className='w-[80%]'>
                    <DashboardHeader pageTitle={'View Attendance'} />

                    <div className='flex'>

                        <input
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />

                        <select value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}>
                            <option value="">All Levels</option>
                            {levels.map(level => (
                                <option key={level.id} value={level.id}>
                                    {level.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Date</th>
                                <th>Timestamp</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.studentName}</td>
                                    <td>{levels.find(level => level.id === record.levelId)?.name || 'Unknown Level'}</td> {/* Display level name */}
                                    <td>{record.date}</td>
                                    <td>{record.timestamp}</td>
                                    <td>{record.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ViewAttendance