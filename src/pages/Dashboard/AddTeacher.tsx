import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";
import { Label, TextInput, Select, Button, FileInput, Textarea } from "flowbite-react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import { addTeacher } from "../../services/teacherServices";
import { TeacherType } from "../../utils/types";
import { useEffect } from "react";
import { fetchLevels } from "../../services/levelsServices";
import { fetchSubjects } from "../../services/subjectServices";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";


export default function Register() {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("First name is required")
      .max(20, "First name cannot exceed 20 characters"),
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
    subject: yup.string(),
    phoneNumber: yup.string().required("Phone Number is required"),
    levels: yup
      .array()
      .of(yup.object())
      .required("At least one level is required"), //schema for levels
    photofile: yup.mixed().required("Photo is required").test("fileSize", "File is too large", (value) => {
      return !value || (value && value.size <= 2 * 1024 * 1024)
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
  }, []);

  const save = async (value: TeacherType) => {
    try {
      const photo = value.photofile; // handle the file seperately
      addTeacher(value, photo);
      reset();
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValue("photofile", file); // Manually set the file in form values
  };

  const animatedComponents = makeAnimated();

  return (
    <div className="container flex gap-x-5  ">
      <div className="flex-[1]">
        <Sidebar />
      </div>
      <div className="flex-[4]">
        {/* Header of the section */}
        <div>
          <Header />
        </div>
        {/* Header of the section */}
        <div className="my-5">
          <section className="shadow-md text-[#002749] ps-48">
            <h1 className="text-2xl mb-10">add teacher</h1>
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
                <p className="text-red-500">{errors.name?.message}</p>
              </div>
              <div>
                <Label htmlFor="subject" value="Teacher Subject" />
                <Select {...register("subject")} id="subject">
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </Select>

                <p className="text-red-500">{errors.subject?.message}</p>
              </div>
              <Label htmlFor="levels" value="Teacher levels" />
              <Controller
                name="levels"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    // value={subjects}
                    options={levels} // change this with the useState after fetch from subjects
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
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="Teacher Description" />
                </div>
                <Textarea id="comment" placeholder="Leave a comment..." rows={4}   {...register("description")}
                  id="description"/>
              </div>

              <div>
                <Label htmlFor="phoneNumber" value="Teacher Phone Number" />
                <TextInput
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  type="text"
                  placeholder="Teacher Phone Number"
                />
                <p className="text-red-500">{errors.phoneNumber?.message}</p>
              </div>
              <div>
                <Label htmlFor="age" value="Age" />
                <TextInput
                  {...register("age")}
                  id="age"
                  type="text"
                  placeholder="Age"
                />
                <p className="text-red-500">{errors.age?.message}</p>
              </div>
              <div>
                <Label htmlFor="gender" value="Gender" />
                <Select {...register("gender")} id="gender" defaultValue="">
                  <option value="" disabled >Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </Select>
                <p className="text-red-500">{errors.gender?.message}</p>
              </div>

              <div>
                <Label htmlFor="email1" value="Your Email" />
                <TextInput
                  {...register("email")}
                  id="email1"
                  type="email"
                  placeholder="name@flowbite.com"
                />
                <p className="text-red-500">{errors.email?.message}</p>
              </div>
              <div>
                <Label htmlFor="password1" value="Your Password" />
                <TextInput
                  {...register("password")}
                  id="password1"
                  type="password"
                  placeholder="Password"
                />
                <p className="text-red-500">{errors.password?.message}</p>
              </div>
              {/* photo field */}
              <div>
                <Label htmlFor="photo" value="Teacher Photo" />
                <FileInput id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange} />
                <p className="text-red-500">{errors.photofile?.message}</p>
              </div>
              <Button
                outline
                gradientDuoTone="pinkToOrange"
                className="my-5 w-72"
                type="submit"
              >
                submit
              </Button>
              {/* <input  type="submit" title="submit" /> */}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
