import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Label, TextInput, Select, Button, FileInput } from "flowbite-react";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import { addParent, fetchStudents } from "../../services/userServices";
import { ParentType, StudentType } from "../../utils/types";
import { useEffect, useState } from "react";
const schema = yup.object().shape({
  name: yup
  .string()
  .matches(/^[A-Za-z\s]+$/, "must be chrachter only") 
  .required("required ")
  .max(20, " First name cannot exceed 20 characters").min(3,"min is 3 letters"),
  
  phoneNumber: yup
    .string()
    .required("Age is required").matches(/^01[01259][0-9]{8}$/, 
    ),
    // .min(18, "You must be at least 18")
    // .max(99, "You must be younger than 99"),
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
  address: yup
    .string()
    .required(),
  children: yup.array().required(),
  photofile: yup.mixed().required("Photo is required").test("fileSize", "File is too large", (value) => {
    return !value || (value && value.size <= 2 * 1024 * 1024)
  }),
});

const animatedComponents = makeAnimated();

export default function Register() {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [chidlrenValues, setSelectedChildrenValues] = useState<StudentType[]>(
    []
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const save = async (value: ParentType) => {
    try {
      const photo = value.photofile;
      addParent(value,photo);
      setSelectedChildrenValues([]);
      reset();
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValue("photofile", file); // Manually set the file in form values
  };

  useEffect(() => {
    fetchStudents(setStudents);
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
            <h1 className="text-2xl mb-10">add parent</h1>
            <form
              onSubmit={handleSubmit(save, (e) => {
                console.log(e.children);
              })}
              className="flex max-w-md flex-col gap-4"
            >
              <div>
                <Label htmlFor="name" value="First Name" />
                <TextInput
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="Parent Name"
                />
                <p className="text-red-500">{errors.name?.message}</p>
              </div>
              <div>
                <Label htmlFor="address" value="address" />
                <TextInput
                  {...register("address")}
                  id="address"
                  placeholder="address"
                />
                <p className="text-red-500">{errors.address?.message}</p>
              </div>
              <div>
                <Label htmlFor="children" value="children" />
                <Controller
                  name="children"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      {...field}
                      value={chidlrenValues}
                      options={students}
                      isMulti
                      components={animatedComponents}
                      placeholder="Choose Children"
                      getOptionLabel={(item: StudentType) => item.name}
                      getOptionValue={(item: StudentType) => `${item.id}`}
                      onChange={(selectedOptions) => {
                        field.onChange(selectedOptions);
                        console.log(selectedOptions);

                        setSelectedChildrenValues([...selectedOptions]);
                      }}
                    />
                  )}
                />
                <p className="text-red-500">{errors.gender?.message}</p>
              </div>
              <div>
                <Label htmlFor="gender" value="Gender" />
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
                  type="text"
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
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
