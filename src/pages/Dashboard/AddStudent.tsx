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
const schema = yup.object().shape({
  name: yup.string().required("name is required"),
  phoneNumber: yup.string().required("Last name is required"),
  age: yup.number().required("Age is required"),
  gender: yup.string().required("Gender is required"),
  class: yup.string().required("Gender is required"),
  address: yup.string().required("Gender is required"),
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
  photofile: yup.mixed().required("Photo is required").test("fileSize", "File is too large", (value) => {
    return !value || (value && value.size <= 2 * 1024 * 1024)
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
      console.log("pressed");
      addStudent(value,photo);
      reset();
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  useEffect(() => {
    fetchParents(setParents);
    fetchLevels(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <h1 className="text-2xl mb-10">add student</h1>
            <form
              onSubmit={handleSubmit(save, (err) => console.log(err))}
              className="flex max-w-md flex-col gap-4"
            >
              <div>
                <Label htmlFor="name" value="Name" />
                <TextInput
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="Name"
                />
                <p className="text-red-500">{errors.name?.message}</p>
              </div>
              <div>
                <Label htmlFor="address" value="address" />
                <TextInput
                  {...register("address")}
                  id="address"
                  type="text"
                  placeholder="Address"
                />
                <p className="text-red-500">{errors.address?.message}</p>
              </div>
              <div>
                <Label htmlFor="age" value="Age" />
                <TextInput
                  {...register("age")}
                  id="age"
                  type="number"
                  placeholder="Age"
                />
                <p className="text-red-500">{errors.age?.message}</p>
              </div>
              <div>
                <Label htmlFor="parent" value="parent" />
                <Select {...register("parent")} id="parent">
                  <option value="">Select</option>
                  {parents.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name}
                    </option>
                  ))}
                </Select>
                <p className="text-red-500">{errors.age?.message}</p>
              </div>
              <div>
                <Label htmlFor="class" value="class" />
                <Select {...register("class")} id="class">
                  <option value="">Select</option>
                  {levels.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.name}
                    </option>
                  ))}
                </Select>
                <p className="text-red-500">{errors.age?.message}</p>
              </div>
              <div>
                {/* <Label htmlFor="gender" value="Gender" /> */}
                <Select {...register("gender")} id="gender">
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </Select>
                <p className="text-red-500">{errors.gender?.message}</p>
              </div>
              <div>
                <Label htmlFor="phoneNumber" value="Your phone number" />
                <TextInput
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  type="number"
                  placeholder="01023456789"
                />
                <p className="text-red-500">{errors.phoneNumber?.message}</p>
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

              <div>
                <Label htmlFor="photo" value="Student Photo" />
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
              {/* <input type="submit" title="submit" /> */}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
