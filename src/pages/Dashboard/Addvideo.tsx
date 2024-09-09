
import React, { useEffect, useState } from "react";
import { Button, Select, Label } from "flowbite-react";
import {db,  storage } from '../../config/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { fetchSubjectsByteacher_id } from "../../services/subjectServices";
import { useAppSelector } from "../../hooks/reduxHooks";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

// تعديل نوع البيانات
interface Subject {
  id: string;
  name: string;
}

function AddVideo() {
  const [data, setData] = useState({ subject: "" });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]); // تعديل النوع إلى مصفوفة من الكائنات التي تحتوي على معرف واسم
  const userInfo = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const loadSubjects = async () => {
      if (userInfo.id) {
        const subjectsData: Subject[] = await fetchSubjectsByteacher_id(userInfo.id); // تحديد النوع هنا
        setFilteredSubjects(subjectsData); // تعيين البيانات دون أخطاء
      }
    };

    loadSubjects();
  }, [userInfo.id]);

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
    if (!videoFile || !data.subject) {
      alert("Please select a subject and upload a video.");
      return;
    }

    const storageRef = ref(storage, `videos/${videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
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
          const videoURL = await getDownloadURL(uploadTask.snapshot.ref);
          const subjectDoc = doc(db, "subjects", data.subject);
          await updateDoc(subjectDoc, {
            videoUrls: arrayUnion(videoURL),
          });
          alert("Video uploaded and linked successfully!");
          setUploadProgress(0);
          setVideoFile(null);
        } catch (error) {
          console.error("Error updating document: ", error);
          alert("Failed to upload video or update subject");
        }
      }
    );
  };

  return (
    <div className="container mx-auto mt-10">
      <h3 className="text-4xl font-medium text-gray-900 dark:text-white">Add Video</h3>
      <div className="space-y-6">

        <div>
          <Label htmlFor="subject" value="Subject Name" className="text-xl" />
          <Select
            id="subject"
            required
            value={data.subject}
            onChange={handleInputChange}
          >
            <option value="">Select subject</option>
            {filteredSubjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </Select>
        </div>

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
