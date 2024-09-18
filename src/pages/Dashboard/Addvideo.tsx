import React, { useEffect, useState } from "react";
import { Button, Select, Label } from "flowbite-react";
import { db, storage } from "../../config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { fetchSubjectsByteacher_id } from "../../services/subjectServices";
import { useAppSelector } from "../../hooks/reduxHooks";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { toast } from 'react-toastify';
interface Subject {
  id: string;
  name: string;
}

function AddVideo() {
  const [data, setData] = useState({ subject: "" });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const userInfo = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const loadSubjects = async () => {
      if (userInfo.id) {
        const subjectsData: Subject[] = await fetchSubjectsByteacher_id(
          userInfo.id
        );
        setFilteredSubjects(subjectsData);
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
      toast.error("Please select a subject and upload a video.")
      return;
    }

    const storageRef = ref(storage, `videos/${videoFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          toast.success("Video uploaded successfully!")
          setUploadProgress(0);
          setVideoFile(null);
        } catch (error) {
          console.error("Error updating document: ", error);
          toast.error('Failed to upload video please try again')
        }
      }
    );
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">

      <h3 className="text-4xl font-semibold text-center text-gray-800 dark:text-white mb-8">
        Add Video
      </h3>
      <div className="space-y-6">
        <div>
          <Label
            htmlFor="subject"
            value="Subject Name"
            className="text-lg font-medium text-gray-700"
          />
          <Select
            id="subject"
            required
            value={data.subject}
            onChange={handleInputChange}
            className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
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
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={handleVideoUpload}
          />
          {uploadProgress > 0 &&  <div className="bg-gray-200 rounded-full h-2.5 my-6 mx-auto w-2/3">
      <div
        className="bg-rustOrange h-2.5 rounded-full mt-5"
        style={{ width: `${uploadProgress}%`, transition: 'width 0.3s ease' }}
      />
    </div>}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={saveVideo}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Upload Video
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddVideo;

