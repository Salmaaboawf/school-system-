import { MdOutlineScience } from "react-icons/md";
import { BiSolidBusSchool } from "react-icons/bi";
import { FaSchool } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { PiExam } from "react-icons/pi";
import { FaPaintBrush } from "react-icons/fa";

export default function Service_Section() {
  return (
    // service section in home page
    <section className="container m-auto text-neutral-600 my-20">
      {/* div contains heading and paragraph */}
      <div className="items-center text-center ">
        <h2 className="text-3xl my-3">OUR SERVICES</h2>
        <p className="my-1">We make your child happy day after day</p>
      </div>

      {/* div container for all services */}
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-col-1 xl:gap-y-9 md:gap-y-9 gap-y-8 gap-x-16  items-center text-center m-auto w-4/5 mt-6">
        {/* first service div */}
        <div className="px-6 shadow-md py-4   rounded">
          <div className="text-5xl text-[#ff4e31] border rounded-full w-32 h-32 text-center items-center pl-10 pt-9 m-auto">
            <FaSchool />
          </div>
          <h5 className="text-lg my-3">SCIENCE LABS</h5>
          <p>
            Alterum accommodare duo cu. Ius labore luptatum efficiendi ex, ne
            vim enim rebum.
          </p>
        </div>

        {/* second service div */}
        <div className="px-6 shadow-md py-4 rounded">
          <div className="text-5xl text-[#ff4e31] border rounded-full w-32 h-32 text-center items-center pl-10 pt-9 m-auto">
            <MdOutlineScience />
          </div>

          <h5 className="text-lg my-3">SCIENCE LABS</h5>
          <p>
            Alterum accommodare duo cu. Ius labore luptatum efficiendi ex, ne
            vim enim rebum.
          </p>
        </div>

        {/* third service div */}
        <div className="px-6 shadow-md py-4 rounded">
          <div className="text-5xl text-[#ff4e31] border rounded-full w-32 h-32 text-center items-center pl-10 pt-9 m-auto">
            <BiSolidBusSchool />
          </div>

          <h5 className="text-lg my-3">SCIENCE LABS</h5>
          <p>
            Alterum accommodare duo cu. Ius labore luptatum efficiendi ex, ne
            vim enim rebum.
          </p>
        </div>

        {/* fourth service div */}
        <div className="px-6 shadow-md py-4 rounded">
          <div className="text-5xl text-[#ff4e31] border rounded-full w-32 h-32 text-center items-center pl-10 pt-9 m-auto">
            <GiTeacher />
          </div>

          <h5 className="text-lg my-3">SCIENCE LABS</h5>
          <p>
            Alterum accommodare duo cu. Ius labore luptatum efficiendi ex, ne
            vim enim rebum.
          </p>
        </div>

        {/* fifth service div */}
        <div className="px-6 shadow-md py-4 rounded">
          <div className="text-5xl text-[#ff4e31] border rounded-full w-32 h-32 text-center items-center pl-10 pt-9 m-auto">
            <PiExam />
          </div>

          <h5 className="text-lg my-3">SCIENCE LABS</h5>
          <p>
            Alterum accommodare duo cu. Ius labore luptatum efficiendi ex, ne
            vim enim rebum.
          </p>
        </div>

        {/* sixth service div */}
        <div className="px-6 shadow-md py-4 rounded">
          <div className="text-4xl text-[#ff4e31] border rounded-full w-32 h-32 text-center items-center pl-11 pt-10 m-auto">
            <FaPaintBrush />
          </div>

          <h5 className="text-lg my-3 rounded">SCIENCE LABS</h5>
          <p>
            Alterum accommodare duo cu. Ius labore luptatum efficiendi ex, ne
            vim enim rebum.
          </p>
        </div>
      </div>
    </section>
  );
}
