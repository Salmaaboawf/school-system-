import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Label, TextInput, Select } from "flowbite-react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import { StudentType } from "../../utils/types";
import { addStudent } from "../../services/userServices";
export default function Register() {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("name is required")
      .max(20, "name cannot exceed 20 characters"),
    phoneNumber: yup
      .string()
      .required("Last name is required")
      .matches(/^[A-Za-z]+$/i, "Last name must only contain letters"),
    age: yup
      .string()
      .required("Age is required")
      .min(18, "You must be at least 18")
      .max(99, "You must be younger than 99"),
    gender: yup.string().required("Gender is required"),
    type: yup.string().required("Gender is required"),
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const save = async (value: StudentType) => {
    try {
      addStudent(value);
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

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
              onSubmit={handleSubmit(save)}
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
                <Label htmlFor="class" value="class" />
                <TextInput
                  {...register("class")}
                  id="class"
                  type="text"
                  placeholder="class"
                />
                <p className="text-red-500">{errors.age?.message}</p>
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

              <input type="submit" title="submit" />
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
