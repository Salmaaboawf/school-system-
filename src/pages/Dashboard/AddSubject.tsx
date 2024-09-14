import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import { Button, Select, Label, FileInput } from "flowbite-react";
import {
  addQuestion,
  addSubject,
  uploadImageToStorage,
} from "../../services/subjectServices";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchLevels } from "../../services/levelsServices";
import { toast } from "react-toastify";

import { fetchTeachers } from "../../services/teacherServices";
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Subject name must be characters only")
    .required("required ")
    .max(20, "Subject name cannot exceed 20 characters")
    .min(3, "min is 3 letters"),

  teacher: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Teacher name must be characters only")
    .required("required ")
    .max(20, " name cannot exceed 20 characters")
    .min(3, "Teacher name must be at least 3 letters"),
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

  const save = async (data) => {
    try {
      const photo = data.photofile;
      const photoURL = await uploadImageToStorage(photo);
      await addSubject({ ...data, photoURL });
      console.log("Subject added to Firestore");
    } catch (error) {
      console.error("Error adding subject: ", error);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("photofile", file);
    }
  };

  useEffect(() => {
    fetchLevels(dispatch);
    fetchTeachers().then((fetchedTeachers) => setTeachers(fetchedTeachers));
  }, [dispatch]);

  useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message);
    }
    if (errors.total_grade) {
      toast.error(errors.total_grade.message);
    }
    if (errors.level_id) {
      toast.error(errors.level_id.message);
    }
    if (errors.teacher) {
      toast.error(errors.teacher.message);
    }
    if (errors.description) {
      toast.error(errors.description.message);
    }
  }, [errors]);

  return (
    <div className="flex flex-col md:flex-row gap-5 p-5 mx-auto max-w-screen-lg">
      <div
        className={`fixed inset-0 z-10 md:relative md:w-1/4 shadow-md transition-transform transform `}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Header />
        <div className="my-5 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-[#002749] mb-4 border-b pb-2">
            Add Subject
          </h3>
          <form onSubmit={handleSubmit(save)} className="space-y-6">
            <div>
              <Label htmlFor="courseName" value="Course Name" />
              <input
                type="text"
                className="block w-full mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#002749] transition duration-300 ease-in-out"
                id="courseName"
                placeholder="Course Name"
                {...register("name")}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.name?.message}
              </p>
            </div>

            <div>
              <Label htmlFor="courseMark" value="Course Full Mark" />
              <input
                type="number"
                className="block w-full mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#002749] transition duration-300 ease-in-out"
                id="courseMark"
                placeholder="Course Full Mark"
                {...register("total_grade")}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.total_grade?.message}
              </p>
            </div>

            <div>
              <Label htmlFor="class" value="Class" />
              <Select
                id="class"
                {...register("level_id")}
                className="mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#002749] transition duration-300 ease-in-out"
              >
                <option value="">Select</option>
                {levels.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>
                    {lvl.name}
                  </option>
                ))}
              </Select>
              <p className="text-red-500 text-sm mt-1">
                {errors.level_id?.message}
              </p>
            </div>

            <div>
              <Label htmlFor="teacher" value="Select Teacher" />
              <Select
                id="teacher"
                {...register("teacher")}
                className="mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#002749] transition duration-300 ease-in-out"
              >
                <option value="">Select a Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </Select>
              <p className="text-red-500 text-sm mt-1">
                {errors.teacher?.message}
              </p>
            </div>

            <div>
              <Label htmlFor="description" value="Course Description" />
              <textarea
                id="description"
                rows={4}
                placeholder="Enter course description here..."
                className="block w-full mt-1 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#002749] transition duration-300 ease-in-out"
                {...register("description")}
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.description?.message}
              </p>
            </div>

            <div>
              <Label htmlFor="photo" value="Course Photo" />
              <FileInput
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="mt-1"
              />
              <p className="text-red-500 text-sm mt-1">
                {errors.photofile?.message}
              </p>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="my-4 rounded-lg border border-gray-300 w-full max-w-xs mx-auto transition duration-300 ease-in-out"
                />
              )}
            </div>

            <div className="flex justify-center">
            <Button
  className="w-full max-w-xs mx-auto transition duration-300 ease-in-out transform hover:scale-105 bg-[#6890b6] hover:bg-[#feb4b4] text-white font-bold py-2 px-4 rounded-full"
  type="submit"
>
  Add Level
</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
