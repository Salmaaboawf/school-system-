// import { db } from './firebase'; 
// import { collection, writeBatch, doc } from 'firebase/firestore';

// const addMultipleQuestions = async (questions) => {
//   const batch = writeBatch(db);
//   const questionsCollection = collection(db, 'questions');

//   questions.forEach((question) => {
//     const questionRef = doc(questionsCollection);
//     batch.set(questionRef, question);
//   });

//   try {
//     await batch.commit();
//     console.log('تم إضافة الأسئلة بنجاح');
//   } catch (error) {
//     console.error('خطأ في إضافة الأسئلة:', error);
//   }
// };

// const questions = [
//   {
//     question: "ما هو أكبر كوكب في النظام الشمسي؟",
//     options: ["الأرض", "المشتري", "زحل", "المريخ"],
//     correctAnswer: "المشتري"
//   },
//   {
//     question: "ما هو أقرب كوكب إلى الشمس؟",
//     options: ["الأرض", "عطارد", "الزهرة", "المريخ"],
//     correctAnswer: "عطارد"
//   },
//   {
//     question: "ما هي أقوى عضلة في جسم الإنسان؟",
//     options: ["العضلة القلبية", "عضلة الساق", "عضلة البطن", "عضلة اليد"],
//     correctAnswer: "العضلة القلبية"
//   }
// ];

// addMultipleQuestions(questions);
