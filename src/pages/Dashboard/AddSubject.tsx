
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import {  Button} from "flowbite-react";

export default function AddSubject() {
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
      <section className="shadow-md text-[#002749]">
      <h3 className=" bg-[#002749] text-white font-bold py-4 pl-4 text-lg">
        Add Subject
      </h3>
      <form action="#" className="p-4 w-full">
        {/*  course name  */}
        <div className="mb-4">
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded mb-4 lg:mb-0"
            id="courseName"
            placeholder="Course Name"
          />
        </div>

        {/*  teacher name  */}
        <div className="mb-4">
          <label htmlFor="courseTeacher">Course Teacher</label>
          <input
            type="text"
            className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded mb-4 lg:mb-0"
            id="courseTeacher"
            placeholder="First name"
          />
        </div>

        {/*  course description  */}
        <div className="mb-4">
          <label htmlFor="description">Course Description</label>
          <textarea
            id="description"
            rows={4}
            placeholder="Enter course description here..."
            className="block border pl-2 w-full mt-2 py-1 border-gray-300 rounded mb-4 lg:mb-0"
          />
        </div>

        {/* course picture */}
        <div className="mb-2">
          <label htmlFor="user_photo">Upload Photo</label>

          <input
            type="file"
            id="user_photo"
            className="block pl-2 w-full mt-2 py-1 border-gray-300 rounded"
          />
        </div>

        <div className="">
          <button
            type="submit"
            className="text-[#002749] bg-gray-200 font-bold w-full rounded text-xl lg:mt-6 py-2"
          >
            Add
          </button>
          <Button
                outline
                gradientDuoTone="pinkToOrange"
                className="my-5 w-72 "
                type="submit"
              >
                Add 
              </Button>
        </div>
      </form>
    </section>
      </div>
    </div>
  </div>
  );
}
