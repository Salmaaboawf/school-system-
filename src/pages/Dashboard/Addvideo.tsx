import React, { useEffect, useState } from "react";
import { Button, Select, Label } from "flowbite-react";
import { db, storage } from "../../config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { fetchSubjectsByteacher_id } from "../../services/subjectServices";
import { useAppSelector } from "../../hooks/reduxHooks";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { toast } from 'react-toastify';
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav";
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
    // <div className="container mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
  <div className="container xs:px-0 lg:px-20">
<div>
        <Nav />
      </div>
    
<div className="mt-20">
 <Header />
</div>
      <div className="space-y-6 border p-6 my-10">
        <div>
          {/* <Label
            htmlFor="subject"
            value="Subject Name"
            className="text-lg font-medium text-gray-700"
          /> */}
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
          <Label htmlFor="videoFile" value="Upload Video" className="text-xl block mb-5" />
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={handleVideoUpload}
          />

 {/* <div className="w-20 h-20">

<div className="container">
  <div className="folder">
    <div className="front-side">
      <div className="tip"></div>
      <div className="cover"></div>
    </div>
    <div className="back-side cover"></div>
  </div>
  <label className="custom-file-upload">
    <input className="title" type="file" />
    Choose a file
  </label>
</div>

  
</div> */}

          {uploadProgress > 0 &&  <div className="bg-gray-200 rounded-full h-2.5 my-6 mx-auto w-2/3">
      <div
        className="bg-rustOrange h-2.5 rounded-full mt-5"
        style={{ width: `${uploadProgress}%`, transition: 'width 0.3s ease' }}
      />
    </div>}
        </div>

        <div className="flex justify-center mt-6">
          <Button
          outline
            onClick={saveVideo}
            className="my-5 lg:w-72 sm:w-32 xs:w-72"
          >
            Upload Video
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddVideo;

