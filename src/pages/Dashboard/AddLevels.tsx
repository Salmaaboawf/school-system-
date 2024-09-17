import { Button, Label, TextInput } from "flowbite-react";
import { addLevels } from "../../services/levelsServices";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/Header/DashboardHeader";

export default function AddLevels() {
  const [levelName, setLevelName] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validationSchema = Yup.object().shape({
    levelName: Yup.string().required("Level is required"),
    // .min(3, "min 3 letters")
    // .matches(/^[A-Za-z\s]+$/,"must be just letters")
  });

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate({ levelName }, { abortEarly: false });
      await addLevels(levelName);
      toast.success(`${levelName} level added successfully`);
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      setSuccessMessage(""); // Clear success message on error
    }
  };

  useEffect(() => {
    if (errors.levelName) {
      toast.error(errors.levelName);
    }
  }, [errors]);

  return (
    <div className="flex">
    <div className="fixed xl:w-[20%] lg:w-[25%] md:w-[30%] top-0 left-0 h-full z-50">
      <Sidebar />
    </div>

    <section className=" text-[#002749] xl:w-[80%] xl:ml-[20%] lg:w-[75%] lg:ml-[25%] md:w-[70%] md:ml-[30%] sm:m-auto w-full">

      <DashboardHeader pageTitle={'Add Level'} />
          <form onSubmit={handleSave} className="border sm:px-8 sm:mx-7 md:px-4 py-6 md:mx-4 rounded xl:mx-8 lg:mx-6 mx-8 lg:px-6 xs:px-4 xs:mx-3">
            <div>
              <Label htmlFor="class" value="Class Name" />
              <TextInput
                id="class"
                type="text"
                placeholder="A1"
                value={levelName}
                onChange={(e) => setLevelName(e.target.value)}
                className="mt-1 block w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#002749] transition duration-300 ease-in-out"
              />
              {errors.levelName && (
                <p className="text-red-500 text-sm mt-1">{errors.levelName}</p>
              )}
            </div>

            <Button
              outline
              className="formButton"
              type="submit"
            >
              Add Level
            </Button>

          </form>
          </section>
        </div>

  );
}
