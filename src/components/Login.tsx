import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Label, TextInput } from "flowbite-react";
import auth from "../config/firebase";
import { saveLoggedUser } from "../services/userServices";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const userId = localStorage.getItem("userId");
  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
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

  const save = async (value: { email: string; password: string }) => {
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // dispatch(setUser({ email: user.email, displayName: user.displayName || 'User' }));
        saveLoggedUser(user.uid, dispatch);

        navigate("/", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  useEffect(() => {
    if (userId) {
      navigate("/about", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
