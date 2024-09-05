import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import { Button, Select, Label } from "flowbite-react";
import { addSubject } from "../../services/subjectServices";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchLevels } from "../../services/levelsServices";

const schema = yup.object().shape({
  name: yup
  .string()
  .matches(/^[A-Za-z\s]+$/, "must be chrachter only") 
  .required("required ")
  .max(20, "  name cannot exceed 20 characters").min(3,"min is 3 letters"),
  
  teacher: yup.string()
  .matches(/^[A-Za-z\s]+$/, "must be chrachter only") 
  .required("required ")
  .max(20, "  name cannot exceed 20 characters").min(3,"min is 3 letters"),
  description: yup.string().required("Course description is required"),
  level_id: yup.string().required("Please select a class"),
  total_grade: yup.number().required("Full mark is required").positive("Grade must be a positive number"),
});

export default function AddSubject() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  
  const levels = useAppSelector((state) => state.levels.levels);
  const dispatch = useAppDispatch();

  const save = async (data) => {
    try {
      await addSubject(data);
      console.log("Subject added to Firestore");
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
                <Select
                  id="class"
                  {...register("level_id")}
                >
                  <option value="">Select</option>
                  {levels.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.name}
                    </option>
                  ))}
                </Select>
                <p className="text-red-500">{errors.level_id?.message}</p>
              </div>

              <div className="mb-4">
                <label htmlFor="courseTeacher">Course Teacher</label>
                <input
                  type="text"
                  className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded"
                  id="courseTeacher"
                  placeholder="Teacher Name"
                  {...register("teacher")}
                />
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
