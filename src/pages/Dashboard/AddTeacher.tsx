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
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import { addTeacher } from "../../services/teacherServices";
import { TeacherType } from "../../utils/types";
import { useEffect } from "react";
import { fetchLevels } from "../../services/levelsServices";
import { fetchSubjects } from "../../services/subjectServices";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toast} from 'react-toastify';
export default function Register() {
  const schema = yup.object().shape({
    name: yup
      .string()
<<<<<<< HEAD
      .matches(/^[A-Za-z\s]+$/, "Name must be characters only")
      .required("required ")
      .max(20, " First name cannot exceed 20 characters")
=======
      .matches(/^[A-Za-z\s]+$/, "must be character only")
      .required("required")
      .max(20, "First name cannot exceed 20 characters")
>>>>>>> 1de1f364cbd97bae45d6943481fd1823dbc6671e
      .min(3, "min is 3 letters"),

    age: yup.string().required("Age is required"),
    gender: yup.string().required("Gender is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password cannot exceed 32 characters")
      .required("Password is required"),
    subjects: yup.array().of(yup.object()).default([]),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^01[01259][0-9]{8}$/, "Phone number is not valid"),
    levels: yup.array().of(yup.object()),
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

  // Fetch levels from firestore
  useEffect(() => {
    fetchLevels(dispatch);
    fetchSubjects(dispatch);
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
    <div className="container flex gap-x-5">
      <div className="flex-[1]">
        <Sidebar />
      </div>
      <div className="flex-[4]">
        {/* Header of the section */}
        <div>
          <Header />
        </div>
        {/* Form section */}
        <div className="my-5">
          <section className="shadow-md text-[#002749] ps-48">
<<<<<<< HEAD
            <h1 className="text-2xl mb-10">Add teacher</h1>
=======
            <h1 className="text-2xl mb-10">Add Teacher</h1>
>>>>>>> 1de1f364cbd97bae45d6943481fd1823dbc6671e
            <form
              onSubmit={handleSubmit(save, (err) => console.log(err))}
              className="flex max-w-md flex-col gap-4"
            >
              <div>
                <Label htmlFor="name" value="Teacher Name" />
                <TextInput
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="Teacher Name"
                />

              </div>
              <div>
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
                    placeholder="Choose Level"
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    onChange={(selected) => {
                      field.onChange(selected);
                    }}
                  />
                )}
              />
              <div className="max-w-md">
                <Label htmlFor="description" value="Teacher Description" />
                <Textarea
                  placeholder="Leave a comment..."
                  rows={4}
                  {...register("description")}
                  id="description"
                />
                <p className="text-red-500">{errors.description?.message}</p>
              </div>

              <div>
                <Label htmlFor="phoneNumber" value="Teacher Phone Number" />
                <TextInput
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  type="text"
                  placeholder="Teacher Phone Number"
                />

              </div>
              <div>
                <Label htmlFor="age" value="Age" />
                <TextInput
                  {...register("age")}
                  id="age"
                  type="text"
                  placeholder="Age"
                />
 
              </div>
              <div>
                <Label htmlFor="gender" value="Gender" />
                <Select {...register("gender")} id="gender" defaultValue="">
                  <option value="" disabled>
                    Gender
                  </option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </Select>

              </div>

              <div>
                <Label htmlFor="email1" value="Your Email" />
                <TextInput
                  {...register("email")}
                  id="email1"
                  type="email"
                  placeholder="name@flowbite.com"
                />

              </div>
              <div>
                <Label htmlFor="password1" value="Your Password" />
                <TextInput
                  {...register("password")}
                  id="password1"
                  type="password"
                  placeholder="Password"
                />

              </div>
              {/* photo field */}
              <div>
                <Label htmlFor="photo" value="Teacher Photo" />
                <FileInput
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />

              </div>
              <Button
                outline
                gradientDuoTone="pinkToOrange"
                className="my-5 w-72"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
