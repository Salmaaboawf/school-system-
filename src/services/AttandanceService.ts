// import { collection, addDoc } from 'firebase/firestore';
// import {db} from '../config/firebase'
// export const createSession = async (teacherId, classId) => {
//   try {
//     const session = {
//       teacherId,
//       classId,
//       timestamp: new Date(),
//     };
//     // Add session to Firestore
//     const docRef = await addDoc(collection(db, 'sessions'), session);
//     console.log('Session created with ID: ', docRef.id);
//     return docRef.id;
//   } catch (e) {
//     console.error('Error adding session: ', e);
//   }
// };
