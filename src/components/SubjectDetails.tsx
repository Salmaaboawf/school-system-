import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSubjectById } from "../services/subjectServices";

function SubjectDetails() {
  const location = useLocation();
  const { subjectId } = location.state || {};
  const [videos, setVideos] = useState([]);
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    if (!subjectId) {
      console.error("No subjectId found in location.state");
      return;
    }

    console.log("subjectId:", subjectId);

    const getSubject = async (id) => {
      try {
        const subjectData = await getSubjectById(id);
        if (subjectData) {
          console.log("Subject Data:", subjectData);
          setSubject(subjectData);
          setVideos(subjectData.videoUrls || []);
        } else {
          console.error("No subject data found!");
        }
      } catch (error) {
        console.error("Error fetching subject details: ", error);
      }
    };

    getSubject(subjectId);
    console.log(subject);
  }, [subjectId]);

  if (!subject) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div 
      className="p-4 flex flex-col md:flex-row"
      style={{ 
        backgroundImage: `url(${subject.photoURL})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center" 
      }}
    >
      <div className="md:w-1/3 p-4 bg-white bg-opacity-80">
        <h1 className="text-2xl font-bold mb-4">{subject.name}</h1>
        <h4 className="text-xl mb-4">{subject.description}</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-2/3 p-4 bg-white bg-opacity-80">
        {videos.map((videoUrl, index) => (
          <div key={index} className="flex items-center mb-4">
            <video controls className="w-full h-auto" src={videoUrl}></video>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubjectDetails;
