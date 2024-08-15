import { Button, Label, TextInput } from "flowbite-react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import { addClass } from "../../services/levelsServices";
export default function AddClass() {
  const [className, setClassName] = useState("");

  const save = async (event) => {
    event.preventDefault();
    try {
      // const docRef = collection(db, "classes");
      // await addDoc(docRef, {
      //   className: className,
      //   student: [],
      // });
      addClass();
      console.log("Class added to Firestore");
    } catch (error) {
      console.error("Error adding class: ", error);
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
          <div className="flex justify-center items-center min-h-screen">
            <form className="w-72" onSubmit={save}>
              <div className="mb-2 block">
                <Label htmlFor="class" value="Class Name" />
              </div>
              <TextInput
                id="class"
                type="text"
                placeholder="A1"
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
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
