// import { Button, Label, TextInput } from "flowbite-react";
// import { collection, addDoc, onSnapshot } from "firebase/firestore";
// import { db } from "../../config/firebase";
// import { useEffect, useState } from "react";
// import Header from "../../components/Header/Header";
// import Sidebar from "../../components/Sidebar";
// import { addLevels } from "../../services/levelsServices";


// export default function addLevels() {
//   // const [className, setClassName] = useState("");
//   const [levelName, setLevelName] = useState("");

  

//   const save = async (event) => {
//     event.preventDefault();
//     try {
//       // const docRef = collection(db, "classes");
//       // await addDoc(docRef, {
//       //   className: className,
//       //   student: [],
//       // });
//       addLevels();
//       console.log("Class added to Firestore");
//     } catch (error) {
//       console.error("Error adding class: ", error);
//     }
//   };

//   return (
//     <div className="container flex gap-x-5  ">
//       <div className="flex-[1]">
//         <Sidebar />
//       </div>
//       <div className="flex-[4]">
//         {/* Header of the section */}
//         <div>
//           <Header />
//         </div>
//         {/* Header of the section */}
//         <div className="my-5">
//           <div className="flex justify-center items-center min-h-screen">
//             <form className="w-72" onSubmit={save}>
//               <div className="mb-2 block">
//                 <Label htmlFor="class" value="Class Name" />
//               </div>
//               <TextInput
//                 id="class"
//                 type="text"
//                 placeholder="A1"
//                 required
              
//                 value={levelName}
//                 onChange={(e) => setLevelName(e.target.value)}
//               />
//               <Button
//                 outline
//                 gradientDuoTone="pinkToOrange"
//                 className="my-5 w-72"
//                 type="submit"
//                 // onClick={addClass}
//               >
//                 Add Class
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
/////////////////////
import { Button, Label, TextInput } from "flowbite-react";
import { addLevels } from "../../services/levelsServices";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";

export default function AddLevels() {
  const [levelName, setLevelName] = useState("");

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // // نمرر اسم المستوى إلى الدالة addLevels
      await addLevels(levelName);
      console.log("Level added to Firestore");
    } catch (error) {
      console.error("Error adding level: ", error);
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
                required
                value={levelName}
                onChange={(e) => setLevelName(e.target.value)}
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
