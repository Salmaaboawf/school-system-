import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Label, TextInput } from "flowbite-react";
import auth from "../config/firebase";
import { saveLoggedUser } from "../services/userServices";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RaisingHandImage from "../assets/images/Raising hand-pana.png"; // Import the image
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const userId = useAuth();
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
        console.log(user.uid);
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
  }, [userId, navigate]);

  return (
    <section className="bg-orange-50 p-8 rounded-lg shadow-lg text-gray-800">
      {/* Add the image above the form */}
      <div className="flex justify-center mb-6">
        <img src={RaisingHandImage} alt="Raising hand" className="w-64 h-64" />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
        School Registration
      </h2>
      <form
        onSubmit={handleSubmit(save, (err) => console.log(err))}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
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
          <p className="text-red-500 mt-1">{errors.email?.message}</p>
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
          <p className="text-red-500 mt-1">{errors.password?.message}</p>
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
``;
