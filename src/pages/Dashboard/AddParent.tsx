import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Label, TextInput, Select, Button, FileInput } from "flowbite-react";
import ReactSelect from "react-select";
import makeAnimated from "react-select/animated";

import Sidebar from "../../components/Sidebar";
import { addParent, fetchStudents } from "../../services/userServices";
import { ParentType, StudentType } from "../../utils/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DashboardHeader from "../../components/Header/DashboardHeader";

// إضافة حقل الديانة إلى الـ schema
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, "Name must be characters only")
    .required("required ")
    .max(20, " Name cannot exceed 20 characters")
    .min(3, "min is 3 letters"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^01[01259][0-9]{8}$/),
  gender: yup.string().required("Gender is required"),
  religion: yup.string().required("Religion is required"), // حقل الديانة
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password cannot exceed 32 characters"),
  address: yup.string().required("Address is required"),
  children: yup.array().required(),
  photofile: yup
    .mixed()
    .required("Photo is required")
    .test("fileSize", "File is too large", (value: any) => {
      return !value || (value && value.size <= 2 * 1024 * 1024);
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
      addParent(value, photo);
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

  useEffect(() => {
    if (errors.name) {
      toast.error(errors.name.message);
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
    if (errors.address) {
      toast.error(errors.address.message);
    }
    if (errors.gender) {
      toast.error(errors.gender.message);
    }
    if (errors.religion) {
      toast.error(errors.religion.message); // معالجة الأخطاء لحقل الديانة
    }
    if (errors.children) {
      toast.error("Please select at least one child.");
    }
  }, [errors]);

  return (
    <div className="flex">
      <div className="fixed xl:w-[20%] lg:w-[25%] md:w-[30%] top-0 left-0 z-50">
        <Sidebar />
      </div>

      <section className=" text-[#002749] xl:w-[80%] xl:ml-[20%] lg:w-[75%] lg:ml-[25%] md:w-[70%] md:ml-[30%] sm:m-auto w-full">
        <DashboardHeader pageTitle={"Add Parent"} />
        <form
          onSubmit={handleSubmit(save)}
          className="border sm:px-8 sm:mx-7 md:px-4 py-6 md:mx-4 rounded xl:mx-8 lg:mx-6 mx-8 lg:px-6 xs:px-4 xs:mx-3"
        >
          {/* div for name and gender */}
          <div className="lg:flex justify-between block">
            <div>
              <Label htmlFor="name" value="Parent Name" />
              <TextInput
                {...register("name")}
                id="name"
                type="text"
                placeholder="Parent Name"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />
            </div>

            <div>
              <Label htmlFor="gender" value="Gender" />
              <Select
                {...register("gender")}
                id="gender"
                defaultValue=""
                className="xl:w-[27rem] lg:w-80 md:w-full"
              >
                <option value="" disabled className="w-80 border-none">
                  Gender
                </option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </Select>
            </div>
          </div>

          {/* div for address and phone */}
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
              <Label htmlFor="phoneNumber" value="Parent phone number" />
              <TextInput
                {...register("phoneNumber")}
                id="phoneNumber"
                type="text"
                placeholder="01023456789"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />
            </div>
          </div>

          {/* div for email and password */}
          <div className="lg:flex justify-between block my-3">
            <div>
              <Label htmlFor="email1" value="Parent Email" />
              <TextInput
                {...register("email")}
                id="email1"
                type="email"
                placeholder="name@gmail.com"
                className="xl:w-[27rem] lg:w-80 md:w-full"
              />
            </div>
            <div>
              <Label htmlFor="password1" value="Parent Password" />
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
              <Label htmlFor="children" value="Children" />
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
                    getOptionValue={(item: StudentType) => item.id}
                    onChange={(selectedOptions: any) => {
                      field.onChange(selectedOptions);
                      console.log(selectedOptions);
                      setSelectedChildrenValues([...selectedOptions]);
                    }}
                    className="xl:w-[27rem] lg:w-80 md:w-full"
                  />
                )}
              />
            </div>

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
          <div className="my-3">
            <Label htmlFor="religion" value="Religion" />
            <Select
              {...register("religion")}
              id="religion"
              defaultValue=""
              className="xl:w-[27rem] lg:w-80 md:w-full"
            >
              <option value="" disabled className="w-80 border-none">
                Select Religion
              </option>
              <option value="muslim">Islam</option>
              <option value="Christianity">Christianity</option>
              <option value="Other">Other</option>
            </Select>
          </div>

          <button
            className="formButton xl:w-[27rem] lg:w-80 md:w-full"
            type="submit"
          >
            Add Parent
          </button>
        </form>
      </section>
    </div>
  );
}
