import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../config/firebase';
import { toast } from "react-toastify";
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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          placeholder="Start Date"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          placeholder="End Date"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          required
        />
        <button type="submit">Add Event</button>
      </form>
    );
}

export default AddEvent