import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import {db} from '../config/firebase'
import { toast } from 'react-toastify';
export const addContact = async (data) => {
    try{
        const contactData = {
            ...data,  
            isRead: false 
        };

        const contactCol = collection(db,'contact')
        const contact = await addDoc (contactCol,contactData)
        toast.success('We received your message , we will get in touch soon')
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

// export const getUnreadContact = async() => {
//     try {
//         const contactCol = collection(db,'contact') 
//         const Query = query(contactCol,where('isRead','==',false))
//         const getUnread = await getDocs(Query)
//         const listUnread = getUnread.docs.map(doc => ({
//         id: doc.id,  
//         ...doc.data() 
//       }));
//     return listUnread
//     } catch (error) {
//         console.log(`display unread error: ${error}`)
//     }
// }

export const getUnreadContact = (callback) => {
    try {
      const contactCol = collection(db, 'contact');
      const Query = query(contactCol, where('isRead', '==', false));
  
      // Use onSnapshot to listen for real-time updates
      const unsubscribe = onSnapshot(Query, (snapshot) => {
        const listUnread = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Call the callback with the updated list of unread messages
        callback(listUnread);
      });
  
      // Return the unsubscribe function to stop listening when no longer needed
      return unsubscribe;
  
    } catch (error) {
      console.log(`display unread error: ${error}`);
    }
  };


export const markAsRead = async (id) => {
    try {
        const contactDoc = doc(db, 'contact', id);
        await updateDoc(contactDoc, { isRead: true });
        return true;
    } catch (error) {
        console.log(`mark as read error: ${error}`);
        return false;
    }
};


export const deleteContact = async (id) => {
    try {
        const contactDoc = doc(db, 'contact', id);
        await deleteDoc(contactDoc);
        console.log(`Contact with id ${id} deleted successfully.`);
        return true;
    } catch (error) {
        console.log(`Error deleting contact: ${error}`);
        return false;
    }
};