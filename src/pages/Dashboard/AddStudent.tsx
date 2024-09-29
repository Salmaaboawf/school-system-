import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Label, TextInput, Select, Button, FileInput } from "flowbite-react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import { ParentType, StudentType } from "../../utils/types";
import { addStudent, fetchParents } from "../../services/userServices";
import { useEffect, useState } from "react";
import { fetchLevels } from "../../services/levelsServices";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toast } from 'react-toastify';
import DashboardHeader from "../../components/Header/DashboardHeader";

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Name must be characters only")
    .required("required ")
    .max(20, "Name cannot exceed 20 characters")
    .min(3, "Name must be at least 3 letters"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^01[01259][0-9]{8}$/, "Invalid phone number format"),
  age: yup
    .number()
    .required("Age is required")
    .typeError("Age must be a number"),
  gender: yup.string().required("Gender is required"),
  class: yup.string().required("Class is required"),
  address: yup.string().required("Address is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password cannot exceed 32 characters")
    .required("Password is required"),
  parent: yup.string().default(""),
  religion: yup.string().required("Religion is required"), // New validation for religion
  photofile: yup
    .mixed()
    .required("Photo is required")
    .test("fileSize", "File is too large", (value) => {
      return !value || (value && value.size <= 2 * 1024 * 1024);
    }),
});

export default function Register() {
  const [parents, setParents] = useState<ParentType[]>([]);
  const levels = useAppSelector((state) => state.levels.levels);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValue("photofile", file); // Manually set the file in form values
  };

  const save = async (value: StudentType) => {
    try {
      const photo = value.photofile;
      addStudent(value, photo);
      reset();
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  useEffect(() => {
    fetchParents(setParents);
    fetchLevels(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (errors.name) toast.error(errors.name.message);
    if (errors.age) toast.error(errors.age.message);
    if (errors.email) toast.error(errors.email.message);
    if (errors.password) toast.error(errors.password.message);
    if (errors.phoneNumber) toast.error(errors.phoneNumber.message);
    if (errors.photofile) toast.error(errors.photofile.message);
    if (errors.address) toast.error(errors.address.message);
    if (errors.gender) toast.error(errors.gender.message);
    if (errors.class) toast.error('Class is required.');
    if (errors.religion) toast.error('Religion is required.');
  }, [errors]);

  return (
    <div className="flex">
      <div className="fixed xl:w-[20%] lg:w-[25%] md:w-[30%] top-0 left-0 h-full z-50">
        <Sidebar />
      </div>

      <section className="text-[#002749] xl:w-[80%] xl:ml-[20%] lg:w-[75%] lg:ml-[25%] md:w-[70%] md:ml-[30%] sm:m-auto w-full">
        <DashboardHeader pageTitle="Add Student" />
        <form
          onSubmit={handleSubmit(save, (err) => console.log(err))}
          className="border sm:px-8 sm:mx-7 md:px-4 py-6 md:mx-4 rounded xl:mx-8 lg:mx-6 mx-8 lg:px-6 xs:px-4 xs:mx-3"
        >
          <div className="lg:flex justify-between block">
            <div>
              <Label htmlFor="name" value="Student Name" />
              <TextInput
                {...register("name")}
                id="name"
                type="text"
                placeholder="Student Name"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />
            </div>

            <div>
              <Label htmlFor="gender" value="Gender" />
              <Select {...register("gender")} id="gender" defaultValue="" className="xl:w-[27rem] lg:w-80 md:w-full">
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </Select>
            </div>
          </div>

          <div className="lg:flex justify-between block my-3">
            <div>
              <Label htmlFor="address" value="Address" />
              <TextInput
                {...register("address")}
                id="address"
                type="text"
                placeholder="Address"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />
            </div>

            <div>
              <Label htmlFor="phoneNumber" value="Phone Number" />
              <TextInput
                {...register("phoneNumber")}
                id="phoneNumber"
                type="text"
                placeholder="01023456789"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />
            </div>
          </div>

          <div className="lg:flex justify-between block my-3">
            <div>
              <Label htmlFor="age" value="Age" />
              <TextInput
                {...register("age")}
                id="age"
                type="number"
                placeholder="Age"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />
            </div>

            <div>
              <Label htmlFor="parent" value="Parent" />
              <Select {...register("parent")} id="parent" className="xl:w-[27rem] lg:w-80 md:w-full">
                <option value="">Select Parent</option>
                {parents.map((parent) => (
                  <option key={parent.id} value={parent.id}>
                    {parent.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="lg:flex justify-between block my-3">
            <div>
              <Label htmlFor="email1" value="Email" />
              <TextInput
                {...register("email")}
                id="email1"
                type="email"
                placeholder="name@gmail.com"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />
            </div>

            <div>
              <Label htmlFor="password1" value="Password" />
              <TextInput
                {...register("password")}
                id="password1"
                type="password"
                placeholder="Password"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />
            </div>
          </div>

          <div className="lg:flex justify-between block my-3">
            <div>
              <Label htmlFor="class" value="Class" />
              <Select {...register("class")} id="class" className="xl:w-[27rem] lg:w-80 md:w-full">
                <option value="">Select Class</option>
                {levels.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>
                    {lvl.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="religion" value="Religion" />
              <Select {...register("religion")} id="religion" className="xl:w-[27rem] lg:w-80 md:w-full">
                <option value="" disabled>
                  Select Religion
                </option>
                <option value="muslim">Muslim</option>
                <option value="christian">Christian</option>
              </Select>
            </div>
          </div>

          <div className="lg:flex justify-between block my-3">
            <div>
              <Label htmlFor="photo" value="Student Photo" />
              <FileInput
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />
            </div>
          </div>

          <button
            className="formButton xl:w-[27rem] lg:w-80 md:w-full"
            type="submit"
          >
            Add Student
          </button>
        </form>
      </section>
    </div>
  );
}
