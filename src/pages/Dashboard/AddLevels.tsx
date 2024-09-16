import { Button, Label, TextInput } from "flowbite-react";
import { addLevels } from "../../services/levelsServices";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar";

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
      toast.success(`${levelName} grade added successfully`);
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
    <div className="flex flex-col md:flex-row gap-5 p-5 mx-auto max-w-screen-lg">
      <div
        className={`fixed inset-0 z-10 md:relative md:w-1/4 shadow-md transition-transform transform `}
      >
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1">
        <Header />
        
        <div className="my-5 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-[#002749] mb-4 border-b pb-2">
            Add Level
          </h3>
          <form onSubmit={handleSave} className="space-y-6">
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
              // gradientDuoTone="pinkToOrange"
              className="w-full max-w-xs mx-auto transition duration-300 ease-in-out transform hover:scale-105"
              type="submit"
            >
              Add Level
            </Button>

            {successMessage && (
              <p className="text-green-500 text-sm mt-4">{successMessage}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
