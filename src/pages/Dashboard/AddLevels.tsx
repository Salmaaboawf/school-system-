import { Button, Label, TextInput } from "flowbite-react";
import { addLevels } from "../../services/levelsServices";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import * as Yup from "yup";

export default function AddLevels() {
  const [levelName, setLevelName] = useState();
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    levelName: Yup.string()
      .min(3, "min 3 letters")
      .matches(/^[A-Za-z\s]+$/,"must be just letters") 
      .required("required "),
  });
  

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate({ levelName }, { abortEarly: false });

      await addLevels(levelName);
      console.log("Level added to Firestore");
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container flex gap-x-5">
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
          <div className="flex justify-center items-center min-h-screen">
            <form className="w-72" onSubmit={handleSave}>
              <div className="mb-2 block">
                <Label htmlFor="class" value="Class Name" />
              </div>
              <TextInput
                id="class"
                type="text"
                placeholder="A1"
              
                value={levelName}
                onChange={(e) => setLevelName(e.target.value)}
              />
              {errors.levelName && (
                <div className="text-red-500">{errors.levelName}</div>
              )}
              <Button
                outline
                gradientDuoTone="pinkToOrange"
                className="my-5 w-72"
                type="submit"
              >
                Add Class
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
