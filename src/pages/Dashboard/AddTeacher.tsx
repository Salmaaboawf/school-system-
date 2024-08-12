import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Label, TextInput, Select } from "flowbite-react";
import auth from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Register() {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .max(20, "First name cannot exceed 20 characters"),
    lastName: yup
      .string()
      .required("Last name is required")
      .matches(/^[A-Za-z]+$/i, "Last name must only contain letters"),
    age: yup
      .number()
      .required("Age is required")
      .min(18, "You must be at least 18")
      .max(99, "You must be younger than 99"),
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const save = async (value: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
  }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      const user = userCredential.user;

      console.log(user);

      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        firstName: value.firstName,
        lastName: value.lastName,
        age: value.age,
        gender: value.gender,
        email: value.email,
        type: "teacher",
      });

      navigate("/about");
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  return (
    <section className="shadow-md text-[#002749] ps-48">
      <h1 className="text-2xl mb-10">add teacher</h1>
      <form
        onSubmit={handleSubmit(save, (err) => console.log(err))}
        className="flex max-w-md flex-col gap-4"
      >
        <div>
          <Label htmlFor="firstName" value="First Name" />
          <TextInput
            {...register("firstName")}
            id="firstName"
            type="text"
            placeholder="First name"
          />
          <p className="text-red-500">{errors.firstName?.message}</p>
        </div>
        <div>
          <Label htmlFor="lastName" value="Last Name" />
          <TextInput
            {...register("lastName")}
            id="lastName"
            type="text"
            placeholder="Last name"
          />
          <p className="text-red-500">{errors.lastName?.message}</p>
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
          <Label htmlFor="gender" value="Gender" />
          <Select {...register("gender")} id="gender">
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
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

        <input type="submit" title="submit" />
      </form>
    </section>
  );
}
