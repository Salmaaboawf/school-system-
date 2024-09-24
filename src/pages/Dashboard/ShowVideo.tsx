// import React, { useEffect, useState } from "react";
// import { Card } from "flowbite-react";
// import { db } from '../../config/firebase';
// import { collection, getDocs, query, where } from "firebase/firestore";

// interface Subject {
//   id: string;
//   name: string;
//   videoUrls: string[];  
// }

// function ShowVideo(subjectID) {
//   const [subjects, setSubjects] = useState<Subject[]>([]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       const subjectsCollection = collection(db, "subjects");
//       const Query = query(subjectsCollection , where('id' , '==' , subjectID))
//       console.log(subjectID);
      
//       const subjectsSnapshot = await getDocs(subjectsCollection);
//       const subjectsData = subjectsSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Subject[];
//       setSubjects(subjectsData);  // تخزين البيانات في الحالة
//     };

//     fetchVideos();
//   }, []);

//   return (
//     <div className="container mx-auto mt-10">
//       <h3 className="text-4xl font-medium text-gray-900 dark:text-white mb-8">
//         Videos Gallery
//       </h3>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {subjects.map((subject) =>
//           subject.videoUrls && subject.videoUrls.length > 0 ? (
//             subject.videoUrls.map((videoUrl, index) => (
//               <Card key={`${subject.id}-${index}`}>
//                 <video controls className="w-full h-64 object-cover">
//                   <source src={videoUrl} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//                 {/* <div className="p-4">
//                   <h5 className="text-xl font-semibold">{subject.name}</h5>
//                   <p className="text-gray-500">Video {index + 1}</p>
//                 </div> */}
//               </Card>
//             ))
//           ) : (
//             <div key={subject.id} className="col-span-full">
//               <p className="text-gray-500">No videos available for {subject.name}</p>
//             </div>
            
//           )
//         )}
//       </div>
//     </div>
//   );
// }

// export default ShowVideo;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // استخدام useParams للحصول على subjectId من URL
import { Card } from "flowbite-react";
import { db } from '../../config/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

interface Subject {
  id: string;
  name: string;
  videoUrls: string[];
}

const ShowVideo: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // احصل على subjectId من URL باستخدام useParams
  const { subjectId } = useParams<{ subjectId: string }>();

  console.log("Received subjectId:", subjectId); // تأكيد الحصول على subjectId

  useEffect(() => {
    if (!subjectId) {
      setError("Subject ID is missing");
      setLoading(false);
      return;
    }

    const fetchVideos = async () => {
      try {
        const subjectsCollection = collection(db, "subjects");
        const subjectQuery = query(subjectsCollection, where('id', '==', subjectId));

        const subjectsSnapshot = await getDocs(subjectQuery);
        const subjectsData = subjectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Subject),
        }));
        setSubjects(subjectsData);
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError("Failed to fetch subjects");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [subjectId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto mt-10">
      <h3 className="text-4xl font-medium text-gray-900 dark:text-white mb-8">
        Videos Gallery
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subjects.map((subject) =>
          subject.videoUrls && subject.videoUrls.length > 0 ? (
            subject.videoUrls.map((videoUrl, index) => (
              <Card key={`${subject.id}-${index}`}>
                <video controls className="w-full h-64 object-cover">
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Card>
            ))
          ) : (
            <div key={subject.id} className="col-span-full">
              <p className="text-gray-500">No videos available for {subject.name}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ShowVideo;




