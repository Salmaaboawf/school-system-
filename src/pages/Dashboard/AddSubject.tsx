import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import { Button, Select, Label, FileInput } from "flowbite-react";
import { addQuestion, addSubject } from "../../services/subjectServices";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchLevels } from "../../services/levelsServices";
import { uploadImageToStorage } from "../../services/subjectServices"; // استيراد الدالة
import { fetchTeachers } from "../../services/teacherServices";

// Validation Schema
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "must be characters only")
    .required("Required")
    .max(20, "Name cannot exceed 20 characters")
    .min(3, "Min is 3 letters"),

  teacher: yup.string().required("Required").min(3, "Min is 3 letters"),

  description: yup.string().required("Course description is required"),
  level_id: yup.string().required("Please select a class"),
  total_grade: yup
    .number()
    .required("Full mark is required")
    .positive("Grade must be a positive number"),
  photofile: yup.mixed().required("Photo is required"),
});

export default function AddSubject() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const levels = useAppSelector((state) => state.levels.levels);
  const dispatch = useAppDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [teachers, setTeachers] = useState([]);

  // Save function to handle form submission
  const save = async (data) => {
    try {
      const photo = data.photofile;
      let photoURL = await uploadImageToStorage(photo);

      await addSubject({ ...data, photoURL });
      console.log("Subject added to Firestore");
    } catch (error) {
      console.error("Error adding subject: ", error);
    }
  };

  // Handle file input change
  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("photofile", file);
    }
  };

  // Fetch levels on component mount
  useEffect(() => {
    fetchLevels(dispatch);
    fetchTeachers().then((fetchedTeachers) => setTeachers(fetchedTeachers));
  }, [dispatch]);

  return (
    <div className="container flex gap-x-5">
      <div className="flex-[1]">
        <Sidebar />
      </div>
      <div className="flex-[4]">
        <Header />
        <div className="my-5">
          <section className="shadow-md text-[#002749]">
            <h3 className="bg-[#002749] text-white font-bold py-4 pl-4 text-lg">
              Add Subject
            </h3>
            <form onSubmit={handleSubmit(save)} className="p-4 w-full">
              <div className="mb-4">
                <label htmlFor="courseName">Course Name</label>
                <input
                  type="text"
                  className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded"
                  id="courseName"
                  placeholder="Course Name"
                  {...register("name")}
                />
                <p className="text-red-500">{errors.name?.message}</p>
              </div>
              <div className="mb-4">
                <label htmlFor="courseMark">Course Full Mark</label>
                <input
                  type="number"
                  className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded"
                  id="courseMark"
                  placeholder="Course Full Mark"
                  {...register("total_grade")}
                />
                <p className="text-red-500">{errors.total_grade?.message}</p>
              </div>

              <div>
                <Label htmlFor="class" value="Class" />

                <Select id="class" {...register("level_id")}>
                  <option value="">Select</option>
                  {levels.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.name}
                    </option>
                  ))}
                </Select>
                <p className="text-red-500">{errors.level_id?.message}</p>
              </div>

              {/* Teacher Dropdown */}
              <div className="mb-4">
                <Label htmlFor="teacher" value="Select Teacher" />
                <Select id="teacher" {...register("teacher")}>
                  <option value="">Select a Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </Select>
                <p className="text-red-500">{errors.teacher?.message}</p>
              </div>

              <div className="mb-4">
                <label htmlFor="description">Course Description</label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Enter course description here..."
                  className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded"
                  {...register("description")}
                />
                <p className="text-red-500">{errors.description?.message}</p>
              </div>

              {/* Photo field */}
              <div>
                <Label htmlFor="photo" value="Teacher Photo" />
                <FileInput
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                <p className="text-red-500">{errors.photofile?.message}</p>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="my-4" />
                )}
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

            <Button
              outline
              gradientDuoTone="pinkToOrange"
              className="my-5 w-72"
              onClick={() => {
                addQuestion({
                  question: "what is your name",
                  answers: ["asdas", "momen", "sadas", "sadasd"],
                  correctAnswer: "1",
                });
              }}
            >
              Add
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
