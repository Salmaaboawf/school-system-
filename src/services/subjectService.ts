import { collection , doc , getDocs} from 'firebase/firestore'
import {db} from '../config/firebase'
// import auth from '../config/firebase'

export const getSubjectsGrades = async (studentEmail:string) => {

    try {
        const studentDocref = doc(db, "levels/Four/students", studentEmail);
        const subjectCollecRef = collection(studentDocref, "subjects");
    
        // Get all documents in the subjects collection
        const allSubjectsDocs = await getDocs(subjectCollecRef);
    
        const subjects = allSubjectsDocs.docs.map((doc => ({
            subjectName: doc.data().subjectName,
            grade: doc.data().grade
          })))
    console.log(subjects);
    
          return subjects;
    }
    catch(err) {
        console.error("Error retrieving subjects:", err);
    return [];
    }
   
}