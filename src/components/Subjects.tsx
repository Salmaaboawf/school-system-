import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import { useDispatch } from "react-redux";
import { fetchSubjectsByLevel } from "../services/subjectServices";
import { useAppSelector } from "../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

function Subjects() {
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const dispatch = useDispatch();
  const userInfo = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSubjects = async () => {
      if (userInfo.class_id) {
        const data = await fetchSubjectsByLevel(userInfo.class_id);
        setFilteredSubjects([...data]);
      }
    };

    loadSubjects();
  }, [dispatch, userInfo.class_id]);

  const handleButtonClick = (subjectId: string) => {
    navigate(`/quiz`, { state: { subjectId } });
  };
  const showDetails = (subjectId: string) => {
    navigate(`/subjectDetails`, { state: { subjectId } });
  };

  return (
    <>
      <Nav />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredSubjects.map((subject) => (
          <Card
            key={subject.id}
            className="max-w-sm"
            imgAlt={`صورة خاصة بمادة ${subject.name}`}
            imgSrc={subject.photoURL || "/default-image.jpg"}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {subject.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {subject.description}
            </p>
            <Button
              onClick={() => handleButtonClick(subject.id)}
              className="mt-4"
            >
              Take Exam
            </Button>
            <Button
              onClick={() => showDetails(subject.id)}
              className="mt-4"
            >
              show details
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Subjects;
