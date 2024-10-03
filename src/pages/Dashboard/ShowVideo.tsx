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
// ***********************
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // استخدام useParams للحصول على subjectId من URL
// import { Card } from "flowbite-react";
// import { db } from '../../config/firebase';
// import { collection, getDocs, query, where } from "firebase/firestore";

// interface Subject {
//   id: string;
//   name: string;
//   videoUrls: string[];
// }

// const ShowVideo: React.FC = () => {
//   const [subjects, setSubjects] = useState<Subject[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   // احصل على subjectId من URL باستخدام useParams
//   const { subjectId } = useParams<{ subjectId: string }>();

//   console.log("Received subjectId:", subjectId); // تأكيد الحصول على subjectId

//   useEffect(() => {
//     if (!subjectId) {
//       setError("Subject ID is missing");
//       setLoading(false);
//       return;
//     }

//     const fetchVideos = async () => {
//       try {
//         const subjectsCollection = collection(db, "subjects");
//         const subjectQuery = query(subjectsCollection, where('id', '==', subjectId));

//         const subjectsSnapshot = await getDocs(subjectQuery);
//         const subjectsData = subjectsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...(doc.data() as Subject),
//         }));
//         setSubjects(subjectsData);
//       } catch (err) {
//         console.error("Error fetching subjects:", err);
//         setError("Failed to fetch subjects");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, [subjectId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

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
// };

// export default ShowVideo;

// ============================

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"; // استخدام useParams للحصول على subjectId من URL
// import { Card } from "flowbite-react";
// import { db } from '../../config/firebase';
// import { collection, getDocs, query, where } from "firebase/firestore";

// interface Subject {
//   id: string;
//   name: string;
//   lessonNames: string[];  // تأكد أن هذا الحقل هو مصفوفة
//   videoUrls: string[];
// }

// const ShowVideo: React.FC = () => {
//   const [subjects, setSubjects] = useState<Subject[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   // احصل على subjectId من URL باستخدام useParams
//   const { subjectId } = useParams<{ subjectId: string }>();

//   useEffect(() => {
//     if (!subjectId) {
//       setError("Subject ID is missing");
//       setLoading(false);
//       return;
//     }

//     const fetchVideos = async () => {
//       try {
//         const subjectsCollection = collection(db, "subjects");
//         const subjectQuery = query(subjectsCollection, where('id', '==', subjectId));

//         const subjectsSnapshot = await getDocs(subjectQuery);
//         const subjectsData = subjectsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...(doc.data() as Subject),
//         }));
//         setSubjects(subjectsData);
//       } catch (err) {
//         console.error("Error fetching subjects:", err);
//         setError("Failed to fetch subjects");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, [subjectId]);

//   // هنا نقوم بتصفية الفيديوهات بناءً على اسم الدرس
//   const filteredVideos = subjects.flatMap(subject =>
//     subject.videoUrls && subject.lessonNames
//       ? subject.videoUrls.map((videoUrl, index) => {
//           const lessonName = subject.lessonNames[index]; // نفترض أن أسماء الدروس تتوافق مع الفيديوهات
//           return lessonName && lessonName.toLowerCase().includes(searchTerm.toLowerCase())
//             ? { videoUrl, lessonName }
//             : null;
//         }).filter(Boolean) // حذف العناصر null
//       : []
//   );

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const hasVideos = subjects.some(subject => subject.videoUrls && subject.videoUrls.length > 0);

//   return (
//     <div className="container mx-auto mt-10">
//       <h3 className="text-4xl font-medium text-gray-900 dark:text-white mb-8">
//         Videos Gallery
//       </h3>

//       {!hasVideos ? (
//         <div className="text-center text-gray-500">
//           <p>No videos available for this subject.</p>
//         </div>
//       ) : (
//         <>
//           <input
//             type="text"
//             placeholder="Search by lesson name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-2 border rounded-md mb-4"
//           />

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredVideos.length > 0 ? (
//               filteredVideos.map((video, index) => (
//                 <Card key={`${index}`}>
//                   <h4 className="font-semibold text-lg mb-2">
//                     {video.lessonName || "Lesson Name Not Available"}
//                   </h4>
//                   <video controls className="w-full h-64 object-cover">
//                     <source src={video.videoUrl} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 </Card>
//               ))
//             ) : (
//               <div className="col-span-full text-center">
//                 <p className="text-gray-500">No videos found for the search term.</p>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ShowVideo;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "flowbite-react";
import { HiCheckCircle, HiX } from "react-icons/hi"; // Import HiX for the close button
import { db } from '../../config/firebase';
import { collection, getDocs, query, where } from "firebase/firestore";

interface Subject {
  id: string;
  name: string;
  lessonNames: string[];
  videoUrls: string[];
  pdfUrls: string[];
}

const ShowVideo: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<{ url: string | null, type: string, lessonName: string } | null>(null);
  const { subjectId } = useParams<{ subjectId: string }>();

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

  const filteredVideos = subjects.flatMap(subject =>
    subject.videoUrls && subject.lessonNames
      ? subject.videoUrls.map((videoUrl, index) => {
          const lessonName = subject.lessonNames[index];
          const pdfUrl = subject.pdfUrls[index];
          return lessonName && lessonName.toLowerCase().includes(searchTerm.toLowerCase())
            ? { videoUrl, lessonName, pdfUrl }
            : null;
        }).filter(Boolean)
      : []
  );

  const handleSelectItem = (url: string | null, type: string, lessonName: string) => {
    setSelectedVideo({ url, type, lessonName });
  };

  const handleClose = () => {
    setSelectedVideo(null); // Close the displayed video or PDF
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  const hasContent = subjects.some(subject => subject.videoUrls && subject.videoUrls.length > 0);

  return (
    <div className="container mx-auto mt-10 grid grid-cols-12 gap-4">
      {/* Left section - Lessons List */}
      <div className="col-span-4 p-4 bg-gray-200 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 text-center">Lessons List</h3>
        <input
          type="text"
          placeholder="Search by lesson name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <ul className="space-y-4">
          {filteredVideos.map((video, index) => (
            <li key={index} className="flex items-center justify-between bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
              <div>
                <p className="font-semibold text-[#ff4e31]">{video.lessonName}</p>
                <div className="flex space-x-2">
                <button
  onClick={() => handleSelectItem(video.videoUrl, 'video', video.lessonName)}
  className={`text-[#002749] hover:underline ${selectedVideo?.url === video.videoUrl ? 'font-bold' : ''}`}
>
<svg xmlns="http://www.w3.org/2000/svg"fill="#002749" width="18" height="18" viewBox="0 0 24 24"><path d="M16 18c0 1.104-.896 2-2 2h-12c-1.105 0-2-.896-2-2v-12c0-1.104.895-2 2-2h12c1.104 0 2 .896 2 2v12zm8-14l-6 6.223v3.554l6 6.223v-16z"/></svg>
</button>

<button
  onClick={() => handleSelectItem(video.pdfUrl, 'pdf', video.lessonName)}
  className={`text-[#002749] hover:underline ${selectedVideo?.url === video.pdfUrl ? 'font-bold' : ''}`}
>
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#002749">
    <path d="M11.363 2c4.155 0 2.637 6 2.637 6s6-1.65 6 2.457v11.543h-16v-20h7.363zm.826-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-2.628v3.686h.907v-1.472h1.49v-.732h-1.49v-.698h1.721v-.784zm-4.9 0h-1.599v3.686h1.599c.537 0 .961-.181 1.262-.535.555-.658.587-2.034-.062-2.692-.298-.3-.712-.459-1.2-.459zm-.692.783h.496c.473 0 .802.173.915.644.064.267.077.679-.021.948-.128.351-.381.528-.754.528h-.637v-2.12zm-2.74-.783h-1.668v3.686h.907v-1.277h.761c.619 0 1.064-.277 1.224-.763.095-.291.095-.597 0-.885-.16-.484-.606-.761-1.224-.761zm-.761.732h.546c.235 0 .467.028.576.228.067.123.067.366 0 .489-.109.199-.341.227-.576.227h-.546v-.944z"/>
  </svg>
</button>

                </div>
              </div>
              {selectedVideo?.url === video.videoUrl || selectedVideo?.url === video.pdfUrl ? (
                <HiCheckCircle className="text-green-500" />
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      {/* Right section - Video or PDF display */}
      <div className="col-span-8 p-4 bg-gray-50 rounded-lg shadow-lg relative">
        {selectedVideo ? (
          <>
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              aria-label="Close"
            >
              <HiX className="w-6 h-6" />
            </button>
            <h4 className="text-xl font-semibold mb-4 text-[#ff4e31]">{selectedVideo.lessonName}</h4>
            {selectedVideo.type === 'video' ? (
              <video controls className="w-full h-96 object-cover rounded-lg shadow-md">
                <source src={selectedVideo.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={selectedVideo.url}
                className="w-full h-96 rounded-lg shadow-md"
                title={selectedVideo.lessonName}
                frameBorder="0"
              />
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center">Please select a video or PDF to view</p>
        )}
      </div>
    </div>
  );
};

export default ShowVideo;



