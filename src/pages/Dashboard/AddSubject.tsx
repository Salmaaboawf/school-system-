import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import { Button, Select, Label } from "flowbite-react";
import { addSubject } from "../../services/subjectServices";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchLevels } from "../../services/levelsServices";

export default function AddSubject() {
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [description, setDescription] = useState("");
  const [level_id, setLevel] = useState("");
  const [total_grade, setGrade] = useState("");


  const levels = useAppSelector((state) => state.levels.levels);
  const dispatch = useAppDispatch();

  function saveName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function saveTeacherName(e: React.ChangeEvent<HTMLInputElement>) {
    setTeacher(e.target.value);
  }

  function saveDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    try {
      await addSubject({ name, teacher, description, level_id , total_grade});
      console.log("subject added to Firestore");
    } catch (error) {
      console.error("Error adding subject: ", error);
    }
  };

  useEffect(() => {
    fetchLevels(dispatch);
  }, [dispatch]);

  return (
    <div className="container flex gap-x-5">
      <div className="flex-[1]">
        <Sidebar />
      </div>
      <div className="flex-[4]">
        <div>
          <Header />
        </div>
        <div className="my-5">
          <section className="shadow-md text-[#002749]">
            <h3 className="bg-[#002749] text-white font-bold py-4 pl-4 text-lg">
              Add Subject
            </h3>
            <form onSubmit={save} className="p-4 w-full">
              <div className="mb-4">
                <label htmlFor="courseName">Course Name</label>
                <input
                  type="text"
                  className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded mb-4 lg:mb-0"
                  id="courseName"
                  placeholder="Course Name"
                  onChange={saveName}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="courseName">Course full Mark</label>
                <input
                  type="number"
                  className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded mb-4 lg:mb-0"
                  id="courseName"
                  placeholder="Course full Mark"
                  onChange={(e) => {
                    setGrade(e.target.value);
                  }}
                />
              </div>
              
              <div>
                <Label htmlFor="class" value="Class" />
                <Select
                  id="class"
                  onChange={(e) => {
                    setLevel(e.target.value);
                  }}
                >
                  <option value="">Select</option>
                  {levels.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="mb-4">
                <label htmlFor="courseTeacher">Course Teacher</label>
                <input
                  type="text"
                  className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded mb-4 lg:mb-0"
                  id="courseTeacher"
                  placeholder="Teacher Name"
                  onChange={saveTeacherName}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description">Course Description</label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Enter course description here..."
                  className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded mb-4 lg:mb-0"
                  onChange={saveDescription}
                />
              </div>

              <div className="mb-2">
                <label htmlFor="user_photo">Upload Photo</label>
                <input
                  type="file"
                  id="user_photo"
                  className="block pl-2 w-full mt-2 py-1 border-gray-300 rounded"
                />
              </div>

              <div className="">
                <Button
                  outline
                  gradientDuoTone="pinkToOrange"
                  className="my-5 w-72"
                  type="submit"
                >
                  Add
                </Button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
