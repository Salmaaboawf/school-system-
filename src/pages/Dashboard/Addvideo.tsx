// import React, { useEffect, useState } from "react";
// import { Button, Select, Label } from "flowbite-react";
// import { db, storage } from "../../config/firebase";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { fetchSubjectsByteacher_id } from "../../services/subjectServices";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { doc, updateDoc, arrayUnion } from "firebase/firestore";
// import { toast } from 'react-toastify';
// interface Subject {
//   id: string;
//   name: string;
// }

// function AddVideo() {
//   const [data, setData] = useState({ subject: "" });
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
//   const userInfo = useAppSelector((state) => state.user.user);

//   useEffect(() => {
//     const loadSubjects = async () => {
//       if (userInfo.id) {
//         const subjectsData: Subject[] = await fetchSubjectsByteacher_id(
//           userInfo.id
//         );
//         setFilteredSubjects(subjectsData);
//       }
//     };
//     loadSubjects();
//   }, [userInfo.id]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { id, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setVideoFile(e.target.files[0]);
//     }
//   };

//   const saveVideo = async () => {
//     if (!videoFile || !data.subject) {
//       toast.error("Please select a subject and upload a video.")
//       return;
//     }

//     const storageRef = ref(storage, `videos/${videoFile.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, videoFile);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         console.error("Video upload failed:", error);
//       },
//       async () => {
//         try {
//           const videoURL = await getDownloadURL(uploadTask.snapshot.ref);
//           const subjectDoc = doc(db, "subjects", data.subject);
//           await updateDoc(subjectDoc, {
//             videoUrls: arrayUnion(videoURL),
//           });
//           toast.success("Video uploaded successfully!")
//           setUploadProgress(0);
//           setVideoFile(null);
//         } catch (error) {
//           console.error("Error updating document: ", error);
//           toast.error('Failed to upload video please try again')
//         }
//       }
//     );
//   };

//   return (
//     <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">

//       <h3 className="text-4xl font-semibold text-center text-gray-800 dark:text-white mb-8">
//         Add Video
//       </h3>
//       <div className="space-y-6">
//         <div>
//           <Label
//             htmlFor="subject"
//             value="Subject Name"
//             className="text-lg font-medium text-gray-700"
//           />
//           <Select
//             id="subject"
//             required
//             value={data.subject}
//             onChange={handleInputChange}
//             className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
//           >
//             <option value="">Select subject</option>
//             {filteredSubjects.map((subject) => (
//               <option key={subject.id} value={subject.id}>
//                 {subject.name}
//               </option>
//             ))}
//           </Select>
//         </div>

//         <div>
//           <Label htmlFor="videoFile" value="Upload Video" className="text-xl" />
//           <input
//             type="file"
//             id="videoFile"
//             accept="video/*"
//             onChange={handleVideoUpload}
//           />
//           {uploadProgress > 0 &&  <div className="bg-gray-200 rounded-full h-2.5 my-6 mx-auto w-2/3">
//       <div
//         className="bg-rustOrange h-2.5 rounded-full mt-5"
//         style={{ width: `${uploadProgress}%`, transition: 'width 0.3s ease' }}
//       />
//     </div>}
//         </div>

//         <div className="flex justify-center mt-6">
//           <Button
//             onClick={saveVideo}
//             className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
//           >
//             Upload Video
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddVideo;
// **************

// import React, { useEffect, useState } from "react";
// import { Button, Select, Label, TextInput, Table } from "flowbite-react";
// import { db, storage } from "../../config/firebase";
// import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
// import { fetchSubjectsByteacher_id } from "../../services/subjectServices";
// import { useAppSelector } from "../../hooks/reduxHooks";
// import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
// import { toast } from 'react-toastify';

// interface Subject {
//   id: string;
//   name: string;
// }

// interface Video {
//   url: string;
//   lessonName: string;
// }

// function AddVideo() {
//   const [data, setData] = useState({ subject: "", lessonName: "" });
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
//   const [videos, setVideos] = useState<Video[]>([]);
//   const [editingVideo, setEditingVideo] = useState<Video | null>(null);
//   const userInfo = useAppSelector((state) => state.user.user);

//   useEffect(() => {
//     const loadSubjects = async () => {
//       if (userInfo.id) {
//         const subjectsData: Subject[] = await fetchSubjectsByteacher_id(userInfo.id);
//         setFilteredSubjects(subjectsData);
//       }
//     };
//     loadSubjects();
//   }, [userInfo.id]);

//   useEffect(() => {
//     if (data.subject) {
//       const unsubscribe = onSnapshot(doc(db, "subjects", data.subject), (doc) => {
//         const subjectData = doc.data();
//         if (subjectData) {
//           const lessonNames = subjectData.lessonNames || [];
//           const videoUrls = subjectData.videoUrls || [];
//           const combinedVideos = lessonNames.map((lessonName: string, index: number) => ({
//             url: videoUrls[index],
//             lessonName
//           }));
//           setVideos(combinedVideos);
//         }
//       });
//       return () => unsubscribe();
//     }
//   }, [data.subject]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setVideoFile(e.target.files[0]);
//     }
//   };

//   const saveVideo = async () => {
//     if (!videoFile || !data.subject || !data.lessonName) {
//       toast.error("Please select a subject, enter a lesson name, and upload a video.");
//       return;
//     }

//     const storageRef = ref(storage, `videos/${videoFile.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, videoFile);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         console.error("Video upload failed:", error);
//       },
//       async () => {
//         try {
//           const videoURL = await getDownloadURL(uploadTask.snapshot.ref);
//           const subjectDoc = doc(db, "subjects", data.subject);
//           await updateDoc(subjectDoc, {
//             videoUrls: arrayUnion(videoURL),
//             lessonNames: arrayUnion(data.lessonName),
//           });
//           toast.success("Video and lesson name uploaded successfully!");
//           setUploadProgress(0);
//           setVideoFile(null);
//         } catch (error) {
//           console.error("Error updating document: ", error);
//           toast.error('Failed to upload video, please try again.');
//         }
//       }
//     );
//   };

//   const deleteVideoAndLesson = async (video: Video) => {
//     const subjectDoc = doc(db, "subjects", data.subject);
//     try {
//       const videoRef = ref(storage, video.url);
//       await deleteObject(videoRef);
//       await updateDoc(subjectDoc, {
//         videoUrls: arrayRemove(video.url),
//         lessonNames: arrayRemove(video.lessonName),
//       });
//       toast.success("Video and lesson name deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting video and lesson:", error);
//       toast.error('Failed to delete video and lesson.');
//     }
//   };

//   const editVideo = (video: Video) => {
//     setEditingVideo(video);
//     setData({ ...data, lessonName: video.lessonName });
//   };

//   const updateVideo = async () => {
//     if (!videoFile || !editingVideo) {
//       toast.error("Please upload a new video.");
//       return;
//     }

//     const storageRef = ref(storage, `videos/${videoFile.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, videoFile);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         console.error("Video upload failed:", error);
//       },
//       async () => {
//         try {
//           const newVideoURL = await getDownloadURL(uploadTask.snapshot.ref);
//           const subjectDoc = doc(db, "subjects", data.subject);

//           // Delete the old video from storage
//           const oldVideoRef = ref(storage, editingVideo.url);
//           await deleteObject(oldVideoRef);

//           // Update Firestore
//           await updateDoc(subjectDoc, {
//             videoUrls: arrayRemove(editingVideo.url), // Remove old video
//             lessonNames: arrayRemove(editingVideo.lessonName), // Remove old lesson name
//           });

//           // Add new video and lesson name
//           await updateDoc(subjectDoc, {
//             videoUrls: arrayUnion(newVideoURL), // Add new video
//             lessonNames: arrayUnion(data.lessonName), // Add new lesson name
//           });

//           toast.success("Video updated successfully!");
//           setUploadProgress(0);
//           setVideoFile(null);
//           setEditingVideo(null);
//           setData({ subject: "", lessonName: "" }); // Reset form
//         } catch (error) {
//           console.error("Error updating document: ", error);
//           toast.error('Failed to update video, please try again.');
//         }
//       }
//     );
//   };

//   return (
//     <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h3 className="text-4xl font-semibold text-center text-gray-800 dark:text-white mb-8">
//         Add Video
//       </h3>

//       <div>
//         <Label htmlFor="subject" value="Select Subject" className="text-lg font-medium text-gray-700" />
//         <Select
//           id="subject"
//           required
//           value={data.subject}
//           onChange={handleInputChange}
//           className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
//         >
//           <option value="">Select subject</option>
//           {filteredSubjects.map((subject) => (
//             <option key={subject.id} value={subject.id}>
//               {subject.name}
//             </option>
//           ))}
//         </Select>
//       </div>

//       <div>
//         <Label htmlFor="lessonName" value="Lesson Name" className="text-lg font-medium text-gray-700" />
//         <TextInput
//           id="lessonName"
//           required
//           value={data.lessonName}
//           onChange={handleInputChange}
//           placeholder="Enter lesson name..."
//           className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
//         />
//       </div>

//       <div>
//         <Label htmlFor="videoFile" value="Upload Video" className="text-xl" />
//         <input type="file" id="videoFile" accept="video/*" onChange={handleVideoUpload} />
//         {uploadProgress > 0 && (
//           <div className="bg-gray-200 rounded-full h-2.5 my-6 mx-auto w-2/3">
//             <div
//               className="bg-purple-600 h-2.5 rounded-full mt-5"
//               style={{ width: `${uploadProgress}%`, transition: 'width 0.3s ease' }}
//             />
//           </div>
//         )}
//       </div>

//       <div className="flex justify-center mt-6">
//         <Button
//           onClick={saveVideo}
//           className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
//         >
//           Upload Video
//         </Button>
//       </div>

//       {/* جدول الفيديوهات الموجودة */}
//       <div className="mt-10">
//         <h4 className="text-2xl font-semibold text-gray-800">Your Videos</h4>
//         <Table>
//           <thead>
//             <tr>
//               <th>Lesson Name</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {videos.map((video, index) => (
//               <tr key={index}>
//                 <td>{video.lessonName}</td>
//                 <td>
//                   <div className="flex space-x-2">
//                     <Button
//                       onClick={() => deleteVideoAndLesson(video)}
//                       color="failure"
//                       className="my-2"
//                     >
//                       Delete
//                     </Button>
//                     <Button
//                       onClick={() => editVideo(video)}
//                       color="light"
//                       className="my-2"
//                     >
//                       Edit
//                     </Button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       {editingVideo && (
//         <div className="mt-6">
//           <Label htmlFor="videoFile" value="Upload New Video" className="text-xl" />
//           <input type="file" accept="video/*" onChange={handleVideoUpload} />
//           <Button
//             onClick={updateVideo}
//             className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 mt-4"
//           >
//             Update Video
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddVideo;
// **************

import React, { useEffect, useState } from "react";
import { Button, Select, Label, TextInput, Table } from "flowbite-react";
import { db, storage } from "../../config/firebase";
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { fetchSubjectsByteacher_id } from "../../services/subjectServices";
import { useAppSelector } from "../../hooks/reduxHooks";
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { toast } from 'react-toastify';
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav";
interface Subject {
  id: string;
  name: string;
}

interface Video {
  url: string;
  pdfUrl: string;
  lessonName: string;
}

function AddVideo() {
  const [data, setData] = useState({ subject: "", lessonName: "" });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const userInfo = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const loadSubjects = async () => {
      if (userInfo.id) {
        const subjectsData: Subject[] = await fetchSubjectsByteacher_id(userInfo.id);
        setFilteredSubjects(subjectsData);
      }
    };
    loadSubjects();
  }, [userInfo.id]);

  useEffect(() => {
    if (data.subject) {
      const unsubscribe = onSnapshot(doc(db, "subjects", data.subject), (doc) => {
        const subjectData = doc.data();
        if (subjectData) {
          const lessonNames = subjectData.lessonNames || [];
          const videoUrls = subjectData.videoUrls || [];
          const pdfUrls = subjectData.pdfUrls || [];
          const combinedVideos = lessonNames.map((lessonName: string, index: number) => ({
            url: videoUrls[index],
            pdfUrl: pdfUrls[index],
            lessonName,
          }));
          setVideos(combinedVideos);
        }
      });
      return () => unsubscribe();
    }
  }, [data.subject]);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdfFile(e.target.files[0]);
    }
  };

  const saveVideo = async () => {
    if (!videoFile || !pdfFile || !data.subject || !data.lessonName) {
      toast.error("All fields are required. Please upload a video, PDF, and enter a lesson name.");
      return;
    }

    const videoStorageRef = ref(storage, `videos/${videoFile.name}`);
    const videoUploadTask = uploadBytesResumable(videoStorageRef, videoFile);
    const pdfStorageRef = ref(storage, `pdfs/${pdfFile.name}`);
    const pdfUploadTask = uploadBytesResumable(pdfStorageRef, pdfFile);

    videoUploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Video upload failed:", error);
      },
      async () => {
        try {
          const videoURL = await getDownloadURL(videoUploadTask.snapshot.ref);
          const pdfURL = await getDownloadURL(pdfUploadTask.snapshot.ref);
          const subjectDoc = doc(db, "subjects", data.subject);
          await updateDoc(subjectDoc, {
            videoUrls: arrayUnion(videoURL),
            pdfUrls: arrayUnion(pdfURL),
            lessonNames: arrayUnion(data.lessonName),
          });
          toast.success("Video, PDF, and lesson name uploaded successfully!");
          setUploadProgress(0);
          setVideoFile(null);
          setPdfFile(null);
        } catch (error) {
          console.error("Error updating document: ", error);
          toast.error('Failed to upload video and PDF, please try again.');
        }
      }
    );
  };

  const deleteVideoAndLesson = async (video: Video) => {
    if (!data.subject) {
      toast.error("Subject is not selected.");
      return;
    }
  
    const subjectDocRef = doc(db, "subjects", data.subject); // التأكد من استخدام مرجع وثيقة صحيح
  
    try {
      const videoRef = ref(storage, video.url);  // مرجع الفيديو في التخزين
      const pdfRef = ref(storage, video.pdfUrl); // مرجع الـ PDF في التخزين
  
      // حذف الفيديو والـPDF من التخزين
      await deleteObject(videoRef); 
      await deleteObject(pdfRef); 
  
      // تحديث الوثيقة في Firestore لإزالة المراجع
      await updateDoc(subjectDocRef, {
        videoUrls: arrayRemove(video.url),
        pdfUrls: arrayRemove(video.pdfUrl),
        lessonNames: arrayRemove(video.lessonName),
      });
  
      toast.success("Video, PDF, and lesson name deleted successfully.");
    } catch (error) {
      console.error("Error deleting video and PDF:", error);
      toast.error('Failed to delete video and PDF.');
    }
  };
  

  const editVideo = (video: Video) => {
    setEditingVideo(video);
    setData({ ...data, lessonName: video.lessonName });
  };

  const updateVideo = async () => {
    if (!videoFile || !pdfFile || !editingVideo) {
      toast.error("Please upload a new video and PDF.");
      return;
    }

    const videoStorageRef = ref(storage, `videos/${videoFile.name}`);
    const videoUploadTask = uploadBytesResumable(videoStorageRef, videoFile);
    const pdfStorageRef = ref(storage, `pdfs/${pdfFile.name}`);
    const pdfUploadTask = uploadBytesResumable(pdfStorageRef, pdfFile);

    videoUploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Video upload failed:", error);
      },
      async () => {
        try {
          const newVideoURL = await getDownloadURL(videoUploadTask.snapshot.ref);
          const newPdfURL = await getDownloadURL(pdfUploadTask.snapshot.ref);
          const subjectDoc = doc(db, "subjects", data.subject);

          const oldVideoRef = ref(storage, editingVideo.url);
          const oldPdfRef = ref(storage, editingVideo.pdfUrl);
          await deleteObject(oldVideoRef);
          await deleteObject(oldPdfRef);

          await updateDoc(subjectDoc, {
            videoUrls: arrayRemove(editingVideo.url),
            pdfUrls: arrayRemove(editingVideo.pdfUrl),
            lessonNames: arrayRemove(editingVideo.lessonName),
          });

          await updateDoc(subjectDoc, {
            videoUrls: arrayUnion(newVideoURL),
            pdfUrls: arrayUnion(newPdfURL),
            lessonNames: arrayUnion(data.lessonName),
          });

          toast.success("Video and PDF updated successfully!");
          setUploadProgress(0);
          setVideoFile(null);
          setPdfFile(null);
          setEditingVideo(null);
          setData({ subject: "", lessonName: "" });
        } catch (error) {
          console.error("Error updating document: ", error);
          toast.error('Failed to update video and PDF, please try again.');
        }
      }
    );
  };

  return (

    <div className="container mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
  <h3 className="text-4xl font-semibold text-center text-gray-800 mb-8">Add Video & PDF</h3>

  <div className="mb-4">
    <Label htmlFor="subject" value="Select Subject" />
    <Select id="subject" required value={data.subject} onChange={handleInputChange}>
      <option value="">Select subject</option>
      {filteredSubjects.map((subject) => (
        <option key={subject.id} value={subject.id}>
          {subject.name}
        </option>
      ))}
    </Select>
  </div>

  <div className="mb-4">
    <Label htmlFor="lessonName" value="Lesson Name" />
    <TextInput
      id="lessonName"
      required
      value={data.lessonName}
      onChange={handleInputChange}
      placeholder="Enter lesson name..."
    />
  </div>

  {/* <div className="mb-4">
    <Label htmlFor="videoFile" value="Upload Video" />
    <input type="file" id="videoFile" accept="video/*" onChange={handleVideoUpload} />
    {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
  </div>

  <div className="mb-4">
    <Label htmlFor="pdfFile" value="Upload PDF" />
    <input type="file" id="pdfFile" accept="application/pdf" onChange={handlePdfUpload} />
  </div> */}

<div className="mb-6">
  <Label htmlFor="videoFile" value="Upload Video" className="font-semibold text-gray-700 mb-2" />
  <input
    type="file"
    id="videoFile"
    accept="video/*"
    onChange={handleVideoUpload}
    className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:border file:border-gray-300
      file:rounded-md file:bg-gray-50 file:text-gray-700
      hover:file:bg-gray-100 transition duration-200 ease-in-out"
  />
  {uploadProgress > 0 && (
    <progress value={uploadProgress} max="100" className="mt-2 w-full h-2 bg-gray-200 rounded" />
  )}
</div>

<div className="mb-6">
  <Label htmlFor="pdfFile" value="Upload PDF" className="font-semibold text-gray-700 mb-2" />
  <input
    type="file"
    id="pdfFile"
    accept="application/pdf"
    onChange={handlePdfUpload}
    className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:border file:border-gray-300
      file:rounded-md file:bg-gray-50 file:text-gray-700
      hover:file:bg-gray-100 transition duration-200 ease-in-out"
  />
</div>


  <div className="flex space-x-4 mb-6">
    {editingVideo ? (
      <Button onClick={updateVideo} className="flex-1">
        Update Video & PDF
      </Button>
    ) : (
      <Button onClick={saveVideo} className="flex-1">
        Save Video & PDF
      </Button>
    )}
  </div>

  <Table className="mt-6 border-collapse border border-gray-300">
    <Table.Head className="bg-gray-200">
      <Table.HeadCell>Lesson Name</Table.HeadCell>
      <Table.HeadCell>Video</Table.HeadCell>
      <Table.HeadCell>PDF</Table.HeadCell>
      <Table.HeadCell>Actions</Table.HeadCell>
    </Table.Head>
    <Table.Body>
      {videos.map((video, index) => (
        <Table.Row key={index} className="border-t">
          <Table.Cell className="p-4">{video.lessonName}</Table.Cell>
          <Table.Cell className="p-4">
            <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View Video
            </a>
          </Table.Cell>
          <Table.Cell className="p-4">
            <a href={video.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View PDF
            </a>
          </Table.Cell>
          <Table.Cell className="p-4 flex space-x-2">
            <Button onClick={() => editVideo(video)} className="bg-blue-500 hover:bg-blue-600 text-white">
              Edit
            </Button>
            <Button onClick={() => deleteVideoAndLesson(video)} className="bg-red-500 hover:bg-red-600 text-white">
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</div>

  );
}

export default AddVideo;
