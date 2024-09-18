import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import {db} from '../config/firebase'
import { toast } from 'react-toastify';
export const addContact = async (data) => {
    try{
        const contactCol = collection(db,'contact')
        const contact = await addDoc (contactCol,data)
        toast.success('We recieved your message , we will get in touch soon')
        return contact
    }
    catch(error) {
        console.log(`contact error: ${error}`)
    }
}

export const displayContact = async() => {
try {
    const contactCol = collection(db,'contact') 
    const getContact = await getDocs(contactCol)
    const contactList = getContact.docs.map(doc => ({
        id: doc.id,  
        ...doc.data() 
      }));
    return contactList
} catch (error) {
    console.log(`display contact error: ${error}`)
}
}

export const getUnreadContact = async() => {
    try {
        const contactCol = collection(db,'contact') 
        const Query = query(contactCol,where('isRead','==','false'))
        const getUnread = await getDocs(Query)
        const listUnread = getUnread.docs.map(doc => ({
        id: doc.id,  
        ...doc.data() 
      }));
    return listUnread
    } catch (error) {
        console.log(`display unread error: ${error}`)
    }
}