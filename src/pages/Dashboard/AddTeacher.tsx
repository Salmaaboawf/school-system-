import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import {
  Label,
  TextInput,
  Select,
  Button,
  FileInput,
  Textarea,
} from "flowbite-react";
import Sidebar from "../../components/Sidebar";
import { addTeacher } from "../../services/teacherServices";
import { TeacherType } from "../../utils/types";
import { useEffect } from "react";
import { fetchLevels } from "../../services/levelsServices";
import { fetchSubjects } from "../../services/subjectServices";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toast } from 'react-toastify';
import DashboardHeader from "../../components/Header/DashboardHeader";
export default function AddTeacher() {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Teacher name is required")
      .matches(/^[A-Za-z\s]+$/, "Name must be characters only")
      .max(20, " Name cannot exceed 20 characters")
      .min(3, "Name must be at least 3 letters"),

    age: yup.string().required("Age is required"),
    gender: yup.string().required("Gender is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password cannot exceed 32 characters"),  
    subjects: yup.array().required('Teacher must have a subject').of(yup.object()).default([]),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^01[01259][0-9]{8}$/, "Phone number is not valid"),
    levels: yup.array().required("Must assign at least one level to the teacher").of(yup.object()),
    photofile: yup
      .mixed()
      .required("Photo is required")
      .test("fileSize", "File is too large", (value) => {
        return !value || (value && value.size <= 2 * 1024 * 1024);
      }),
    description: yup.string().required("Description is required"),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });



  const dispatch = useAppDispatch();

  // State to hold level options
  const levels = useAppSelector((state) => state.levels.levels);
  const subjects = useAppSelector((state) => state.subject.subject);
  // console.log("Redux subjects state:", subjects);

  // Fetch levels from firestore
  useEffect(() => {
    fetchLevels(dispatch);
    fetchSubjects(dispatch);
    // console.log("Fetched subjects:", subjects);
  }, [dispatch]);

  useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message);
    }
    if (errors.age) {
      toast.error(errors.age.message);
    }
    if (errors.email) {
      toast.error(errors.email.message);
    }
    if (errors.password) {
      toast.error(errors.password.message);
    }
    if (errors.phoneNumber) {
      toast.error(errors.phoneNumber.message);
    }
    if (errors.photofile) {
      toast.error(errors.photofile.message);
    }
    if (errors.description) {
      toast.error(errors.description.message);
    }
    if (errors.levels) {
      toast.error(errors.levels.message);
    }
    if (errors.subjects) {
      toast.error(errors.subjects.message);
    }
    if (errors.gender) {
      toast.error(errors.gender.message);
    }
  }, [errors]);

  const save = async (value: TeacherType) => {
    try {
      const photo = value.photofile; // handle the file separately
      addTeacher(value, photo);
      reset();
    } catch (error) {
      console.error("Error adding teacher: ", error);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValue("photofile", file); // Manually set the file in form values
  };

  const animatedComponents = makeAnimated();

  // Filter subjects that do not have a teacher assigned (no teacherId)
  const availableSubjects = subjects.filter(
    (subject) => !subject.teacher || subject.teacher === ""
  );

  return (
    <div className="flex">
      <div className="fixed xl:w-[20%] lg:w-[25%] md:w-[30%] top-0 left-0 h-full z-50">
        <Sidebar />
      </div>


      <section className=" text-[#002749] xl:w-[80%] xl:ml-[20%] lg:w-[75%] lg:ml-[25%] md:w-[70%] md:ml-[30%] sm:m-auto w-full">

      <DashboardHeader pageTitle={'AddTeacher'} />
        <form
          onSubmit={handleSubmit(save, (err) => console.log(err))}
          className="border sm:px-8 sm:mx-7 md:px-4 py-6 md:mx-4 rounded xl:mx-8 lg:mx-6 mx-8 lg:px-6 xs:px-4 xs:mx-3"
        >
          <div className="lg:flex justify-between block">

            <div>
              <Label htmlFor="name" value="Teacher Name" />
              <TextInput
                {...register("name")}
                id="name"
                type="text"
                placeholder="Teacher Name"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />
            </div>

            <div>
              <Label htmlFor="gender" value="Gender" />
              <Select {...register("gender")} id="gender" defaultValue="" className="xl:w-[27rem] lg:w-80 md:w-full">
                <option value="" disabled className="w-80 border-none">
                  Gender
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </Select>

            </div>

          </div>

          <div className="lg:flex justify-between block my-3">

            <div>
              <Label htmlFor="phoneNumber" value="Teacher Phone Number" />
              <TextInput
                {...register("phoneNumber")}
                id="phoneNumber"
                type="text"
                placeholder="Teacher Phone Number"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />

            </div>
            <div>
              <Label htmlFor="age" value="Age" />
              <TextInput
                {...register("age")}
                id="age"
                type="text"
                placeholder="Age"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />

            </div>
          </div>

          <div className="lg:flex justify-between block my-3">

            <div>
              <Label htmlFor="email1" value="Teacher Email" />
              <TextInput
                {...register("email")}
                id="email1"
                type="email"
                placeholder="name@gmail.com"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />

            </div>
            <div>
              <Label htmlFor="password1" value="Teacher Password" />
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

            <div className="xl:w-[27rem] lg:w-80 md:w-full">
              <Label htmlFor="subjects" value="Teacher Subjects" />
              <Controller
                name="subjects"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    options={availableSubjects}
                    isMulti
                    components={animatedComponents}
                    placeholder="Choose Subjects"
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    onChange={(selected) => {
                      field.onChange(selected);
                    }}
                  />
                )}
              />

            </div>
            <div className="xl:w-[27rem] lg:w-80 md:w-full">
              <Label htmlFor="levels" value="Teacher Levels" />
              <Controller
                name="levels"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    options={levels}
                    isMulti
                    components={animatedComponents}
                    placeholder="Choose Levels"
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    onChange={(selected) => {
                      field.onChange(selected);
                    }}
                  />
                )}
              />
            </div>
          </div>


          <div className="lg:flex justify-between block my-3 items-center">


            <div className="max-w-md">
              <Label htmlFor="description" value="Teacher Description" />
              <Textarea
                placeholder="Write description about the teacher..."
                rows={4}
                {...register("description")}
                id="description"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />
            </div>

            {/* photo field */}
            <div>
              <Label htmlFor="photo" value="Teacher Photo" />
              <FileInput
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />

            </div>
          </div>
          <Button
            outline
            // gradientDuoTone="pinkToOrange"
            className="w-full xl:w-[27rem] "
            type="submit"
          >
            Submit
          </Button>
        </form>
      </section>
    </div>

  );
}
