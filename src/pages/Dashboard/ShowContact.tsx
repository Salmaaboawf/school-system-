import React, { useEffect, useState } from 'react'
import DashboardHeader from '../../components/Header/DashboardHeader'
import Sidebar from '../../components/Sidebar'
import { deleteContact, displayContact, markAsRead } from '../../services/contactService'
import '../../assets/general.css'
import { Checkbox } from 'flowbite-react'
import { CiTrash } from "react-icons/ci";
import Swal from 'sweetalert2'
function ShowContact() {
    const [contactList, setContactList] = useState([]);
    useEffect(() => {
        const fetchContacts = async () => {
            const contacts = await displayContact();
            setContactList(contacts);
        };

        fetchContacts();
    }, [])

    const checkMessage = async (id) => {
        const success = await markAsRead(id);
        if (success) {
            // Update the local contactList state to reflect the change
            setContactList((prevList) =>
                prevList.map((contact) =>
                    contact.id === id ? { ...contact, isRead: true } : contact
                )
            );
        }
    };

    // const handleDelete = async (id) => {
    //     const isDeleted = await deleteContact(id);
    //     if (isDeleted) {
    //         setContactList(contactList.filter(contact => contact.id !== id));
    //     }
    // };
    
    const handleDelete = async (id) => {
        // Show confirmation alert
        const result = await Swal.fire({
            title: "Are you sure you want to remove this message?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });
    
        if (result.isConfirmed) {
            // Proceed with deletion if confirmed
            const isDeleted = await deleteContact(id);
            if (isDeleted) {
                setContactList(contactList.filter(contact => contact.id !== id));
    
                // Show success message
                Swal.fire({
                    title: "Deleted!",
                    text: "The message has been deleted.",
                    icon: "success"
                });
            } else {
                // Show error alert if deletion fails
                Swal.fire({
                    title: "Error!",
                    text: "There was a problem deleting this message.",
                    icon: "error"
                });
            }
        }
    };
    

    const handleChange = (id) => (event) => {
        if (event.target.checked) {
            checkMessage(id);
        }
    };

    return (
        <div className="flex">
            <div className="fixed xl:w-[20%] lg:w-[25%] md:w-[30%] top-0 left-0 h-full z-50">
                <Sidebar />
            </div>

            <section className=" text-[#002749] xl:w-[80%] xl:ml-[20%] lg:w-[75%] lg:ml-[25%] md:w-[70%] md:ml-[30%] sm:m-auto w-full">

                <DashboardHeader pageTitle={'Contact List'} />
                <div className="w-full overflow-x-auto">
                    <table className="w-full table-auto border-collapse shadow-lg">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-4 border-b">Name</th>
                                <th className="p-4 border-b">Email</th>
                                <th className="p-4 border-b">Message</th>
                                <th className="p-4 border-b">Date</th>
                                <th className="py-4 px-1 border-b w-28">Mark as read</th>
                                <th className="p-4 border-b">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactList.length > 0 ? (
                                contactList.map((contact) => (
                                    <tr key={contact.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="p-4 border-b">{contact.name}</td>
                                        <td className="p-4 border-b">{contact.email}</td>
                                        <td className="p-4 border-b overflow-auto">{contact.message}</td>
                                        <td className="p-4 border-b">{new Date(contact.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</td>
                                        <td>
                                            <Checkbox className='mx-auto block' color={'green'} onChange={handleChange(contact.id)} checked={contact.isRead}/>
                                        </td>
                                        <td>
                                        <CiTrash className='mx-auto block text-red-600 text-xl font-extrabold cursor-pointer' onClick={() => handleDelete(contact.id)}/>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">No contacts available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default ShowContact