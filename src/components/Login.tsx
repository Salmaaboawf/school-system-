import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Label, TextInput } from "flowbite-react";
import auth from "../config/firebase";
import { saveLoggedUser } from "../services/userServices";
import { useAppDispatch } from "../hooks/reduxHooks";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RaisingHandImage from "../assets/images/Raising hand-pana.png";
import { Radio } from "flowbite-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { FirebaseError } from "firebase/app";
export default function Login() {
  const userId = localStorage.getItem("userId");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "The Email or Password you entered is incorrect, please try again.";
      default:
        return "An error occurred. Please try again.";
    }
  };
  const save = async (value: { email: string; password: string }) => {
    if (!role) {
      toast.error("Please select a role before logging in.");
      return;
    }
    if (role) {
      try {
        const userCred = await signInWithEmailAndPassword(
          auth,
          value.email,
          value.password
        );

        console.log(userCred.user.uid);
        const isRightUser = await saveLoggedUser(
          userCred.user.uid,
          dispatch,
          role
        );

        if (isRightUser) {
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.log(error);

        const errorMessage = getErrorMessage(error.code);
        toast.error(errorMessage);
      }
    }
  };

  function check(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setRole(e.target.value);
  }
  useEffect(() => {
    if (userId) {
      navigate("/about", { replace: true });
    }
  }, [userId, navigate]);


  return (
    <section className="bg-orange-50 p-8 rounded-lg shadow-lg text-gray-800">
      
      {/* Add the image above the form */}
      <div className="flex justify-center mb-6">
        <img src={RaisingHandImage} alt="Raising hand" className="w-64 h-64" />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
        School Login
      </h2>
      <div className="mb-6">
        <fieldset className="flex max-w-lg flex-row gap-10 items-center justify-center text-center mx-auto">
          <legend className="mb-4">Choose your Role</legend>
          <div className="flex items-center gap-2">
            <Radio
              id="teacher"
              name="countries"
              value="teachers"
              onChange={check}
            />
            <Label htmlFor="teacher">Teacher</Label>
          </div>

          <div className="flex items-center gap-2">
            <Radio
              id="student"
              name="countries"
              value="students"
              onChange={check}
            />
            <Label htmlFor="student">Student</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="" name="countries" value="parents" onChange={check} 
            />
            <Label htmlFor="">Parent</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="" name="countries" value="users" onChange={check} 
             />
            <Label htmlFor="">Admin</Label>
          </div>
        </fieldset>
      </div>
      <form
        onSubmit={handleSubmit(save, (err) => console.log(err))}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-6 my-10"
      >
        <div>
          <Label
            htmlFor="email1"
            value="Your Email"
            className="text-lg font-medium text-blue-800"
          />
          <TextInput
            {...register("email")}
            id="email1"
            type="email"
            placeholder="name@school.com"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
        </div>
        <div>
          <Label
            htmlFor="password1"
            value="Your Password"
            className="text-lg font-medium text-blue-800"
          />
          <TextInput
            {...register("password")}
            id="password1"
            type="password"
            placeholder="Password"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Login
        </button>
      </form>
    </section>
  );
}
