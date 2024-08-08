import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";
import auth from "../config/firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const schema = yup.object().shape({
    firstName: yup
      .string(),
      // .required("First name is required")
      // .max(20, "First name cannot exceed 20 characters"),
    lastName: yup
      .string(),
      // .required("Last name is required")
      // .matches(/^[A-Za-z]+$/i, "Last name must only contain letters"),
    age: yup
      .number(),
    //   .required("Age is required")
    //   .min(18, "You must be at least 18")
    //   .max(99, "You must be younger than 99"),
    // gender: yup.string().required("Gender is required"),
    email: yup
      .string(),
      // .email("Invalid email address")
      // .required("Email is required"),
    password: yup
      .string()
      // .min(8, "Password must be at least 8 characters")
      // .max(32, "Password cannot exceed 32 characters")
      // .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log("gvmcfbsfad");
  const navigate = useNavigate();

  const save = async (value) => {
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // dispatch(setUser({ email: user.email, displayName: user.displayName || 'User' }));
      
        navigate("/allstaff");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <section className="shadow-md text-[#002749] ps-48">
      <form
        onSubmit={handleSubmit(save, (err) => console.log(err))}
        className="flex max-w-md flex-col gap-4"
      >
     

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
