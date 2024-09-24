import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/Header/DashboardHeader';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/reduxHooks';
import { fetchLevels } from '../../services/levelsServices';
import { TabItem } from 'flowbite-react';

function ViewAttendance() {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLevel, setSelectedLevel] = useState(''); // To store selected level

    const dispatch = useDispatch();
    const levels = useAppSelector(state => state.levels.levels);


    useEffect(() => {
        const fetchData = async () => {
            // Fetch students
            const studentsCollection = collection(db, 'students');
            const studentsSnapshot = await getDocs(studentsCollection);
            const studentsList = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setStudents(studentsList);
            console.log(students);

            // Fetch all attendance records (no date filtering)
            const recordsQuery = collection(db, 'attendance');
            const recordsSnapshot = await getDocs(recordsQuery);
            const recordsList = recordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAttendanceRecords(recordsList);
            //   console.log(attendanceRecords)
        };

        fetchData();
    }, []);

    console.log(students)



    // const filteredRecords = recordsWithStatus.filter(record =>
    //     record.studentName && record.studentName.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const uniqueDates = Array.from(new Set(attendanceRecords.map(item =>
        new Date(item.timestamp).toISOString().split('T')[0]
    )));
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

                    <table className='w-full'>
                        <thead>
                        </thead>
                        <tbody className='w-full'>
                            <div className='w-[50rem] mx-auto'>
                                {uniqueDates.map((date, index) => (
                                    <div key={index}>
                                        <h3 className='font-bold text-lg w-full bg-deepBlue text-white text-center py-1'>{date}</h3>
                                        {/* {students.map((student) => {
                                            const attendanceRecord = attendanceRecords.find(record =>
                                                record.studentId === student.id &&
                                                new Date(record.timestamp).toISOString().split('T')[0] === date
                                            ); */}
                                            {students.filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => {
                                        const attendanceRecord = attendanceRecords.find(record =>
                                            record.studentId === student.id &&
                                            new Date(record.timestamp).toISOString().split('T')[0] === date
                                        );
                                            return (
                                                <div key={student.id} className='flex justify-between px-4 border-b'>
                                                    <span>{student.name}</span>
                                                    <span className={`text-white px-2 py-1 w-20 text-center my-1 ${attendanceRecord ? 'bg-green-500' : 'bg-red-500'}`}>
                                                        {attendanceRecord ? 'Present' : 'Absent'}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ViewAttendance