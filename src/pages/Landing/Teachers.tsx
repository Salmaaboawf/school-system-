import { useEffect, useState } from "react";
import { fetchTeachers } from "../../services/teacherServices";
import "../../assets/teacher.css";


function Teachers() {
  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const fetchedTeachers = await fetchTeachers();
        setTeachers(fetchedTeachers);
      } catch (error) {
        console.error("Error fetching teachers: ", error);
      }
    };

    loadTeachers();
  }, []);

  const [teachers, setTeachers] = useState([]);

  return (
    <div className="mt-10">
      {/* Header start */}
      <div className="bg-gray-100 py-8 my-8 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full text-center ">
        <h1 className="text-3xl text-deepBlue dark:text-white">
          Teachers
        </h1>
      </div>
      {/* Header end */}

      {/* Teacher Cards */}
      <div className="mcontainer">
        {teachers.map((teacher, index) => (
          <div key={index}>
            <div
              className="profile-container"
              style={{
                "--bg-image": `url(${teacher.photoURL})`, // Set the CSS variable
              }}
            >
              <div className="profile-wrapper">
                <div className="profile-card">
                  <div className="fav-icon"></div>
                  {/* Profile Information */}
                  <img src={teacher.photoURL} alt="profile pics" />

                  <h2>{teacher.name}</h2>
                  <h4>{teacher.subjectName}</h4>

                  <p>{teacher.description}</p>

                  {/* Profile Button */}
                  {/* <a href="#">View Profile</a> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teachers;
