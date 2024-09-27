import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../config/firebase';
import { toast } from "react-toastify";
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/Header/DashboardHeader';
function AddEvent() {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await addDoc(collection(db, 'events'), {
          title,
          start: new Date(start),
          end: new Date(end),
        });
        toast.success('Event added successfully!')
      } catch (err) {
        console.error('Error adding event: ', err);
      }
    };
  
    return (
      <div className='flex'>
 <div className="fixed xl:w-[20%] lg:w-[25%] md:w-[30%] top-0 left-0 h-full z-50">
        <Sidebar />
      </div>
      <section className=" text-deepBlue xl:w-[80%] xl:ml-[20%] lg:w-[75%] lg:ml-[25%] md:w-[70%] md:ml-[30%] sm:m-auto w-full">
      <DashboardHeader pageTitle={"Add Event"} />
      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
  <div className="flex flex-col">
    <label htmlFor="title" className="text-darkBlue font-semibold mb-1">Event Title</label>
    <input
      type="text"
      id="title"
      placeholder="Event Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="start" className="text-darkBlue font-semibold mb-1">Start Date</label>
    <input
      type="datetime-local"
      id="start"
      value={start}
      onChange={(e) => setStart(e.target.value)}
      required
      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="end" className="text-darkBlue font-semibold mb-1">End Date</label>
    <input
      type="datetime-local"
      id="end"
      value={end}
      onChange={(e) => setEnd(e.target.value)}
      required
      className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  <button
    type="submit"
    className="formButton w-64 mx-auto"
  >
    Add Event
  </button>
</form>

      </section>
      </div>
    );
}

export default AddEvent