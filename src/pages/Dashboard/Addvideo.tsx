
import React, { useEffect, useState } from "react";
import { Button, Select, Label } from "flowbite-react";
import db, { storage } from '../../config/firebase';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


function AddVideo() {
  const [data, setData] = useState({ subject: "", teacher: "", description: "" });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [subjects, setSubjects] = useState<any[]>([]); // لتخزين المواد

  // جلب المواد من مجموعة Firebase subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectsCollection = collection(db, "subjects"); // ربط بـ collection subjects
        const subjectSnapshot = await getDocs(subjectsCollection); // جلب جميع الوثائق
        const subjectList = subjectSnapshot.docs.map(doc => ({
          id: doc.id,  // ID الخاص بكل وثيقة
          ...doc.data() // البيانات الأخرى (مثل الاسم)
        }));
        setSubjects(subjectList); // تخزين المواد في حالة subjects
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

  const saveVideo = async () => {
    if (!videoFile) {
      alert("Please select a video to upload.");
      return;
    }

    const storageRef = ref(storage, `videos/${videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const collectionRef = collection(db, "videos");
        await addDoc(collectionRef, {
          subject: data.subject,
          teacher: data.teacher,
          description: data.description,
          videoUrl: downloadURL,
        });
        setData({ subject: "", teacher: "", description: "" });
        setVideoFile(null);
        setUploadProgress(0);
        alert("Video uploaded successfully!");
      }
    );
  };

  return (
    <div className="container mx-auto mt-10">
      <h3 className="text-4xl font-medium text-gray-900 dark:text-white">Add Video</h3>
      <div className="space-y-6">
        {/* قائمة المواد المنسدلة */}
        <div>
          <Label htmlFor="subject" value="Subject Name" className="text-xl" />
          <Select
            id="subject"
            required
            value={data.subject}
            onChange={handleInputChange}
          >
            <option value="">Select subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </Select>
        </div>

        

        {/* رفع الفيديو */}
        <div>
          <Label htmlFor="videoFile" value="Upload Video" className="text-xl" />
          <input type="file" id="videoFile" accept="video/*" onChange={handleVideoUpload} />
          {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
        </div>

        <div className="flex justify-around">
          <Button onClick={saveVideo}>Upload Video</Button>
        </div>
      </div>
    </div>
  );
}

export default AddVideo;

