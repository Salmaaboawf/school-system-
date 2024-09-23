import React, { useEffect, useState } from 'react'
import DashboardHeader from '../../components/Header/DashboardHeader'
import Sidebar from '../../components/Sidebar'
import { displayContact, markAsRead } from '../../services/contactService'
import '../../assets/general.css'
function ShowContact() {
    const [contactList, setContactList] = useState([]);
    useEffect(() => {
        const fetchContacts = async () => {
            const contacts = await displayContact();
            setContactList(contacts);
        };

        fetchContacts();
    }, [])

    const checkMessage = (id) => {
        markAsRead(id)
    }

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
                                <th className="p-4 border-b">Mark as read</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactList.length > 0 ? (
                                contactList.map((contact) => (
                                    <tr key={contact.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="p-4 border-b">{contact.name}</td>
                                        <td className="p-4 border-b">{contact.email}</td>
                                        <td className="p-4 border-b">{contact.message}</td>
                                        <td className="p-4 border-b">{new Date(contact.date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</td>
                                        <td>
                                            {/* <label className="checkbox-wrapper">
                                                <input
                                                    checked={contact.isRead} // controlled checked attribute
                                                    type="checkbox"
                                                   id={`check`} // unique ID for each checkbox
                                                    hidden
                                                    onChange={() => checkMessage(contact.id)} // handle onChange event
                                                />
                                             <label htmlFor={`check`} className="checkmark"></label> 
                                             </label> */}


                                            <input type='checkbox' onChange={checkMessage(contact.id)} checked={contact.isRead}></input>
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