import { MdOutlineScience } from "react-icons/md";
import { BiSolidBusSchool } from "react-icons/bi";
import { FaSchool } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { FaPaintBrush } from "react-icons/fa";
import { RiGameLine } from "react-icons/ri";

export default function Service_Section() {
  return (
    // service section in home page
    <section className="container m-auto text-neutral-600 my-20">
      {/* div contains heading and paragraph */}
      <div className="items-center text-center">
        <h2 className="text-3xl my-3">OUR SERVICES</h2>
        <p className="my-1">We make your child happy day after day</p>
      </div>

      {/* div container for all services */}
      <div className="grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xl:gap-y-9 md:gap-y-9 gap-y-8 gap-x-16 items-center text-center m-auto w-4/5 mt-6">
        {/* first service div */}
        <div className="px-6 shadow-md py-4 rounded transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-solid hover:border-2 hover:border-black">
          <div className="text-5xl text-[#ff4e31] border rounded-full w-32 h-32 text-center items-center pl-10 pt-9 m-auto">
            <FaSchool />
          </div>
          <h5 className="text-lg my-3">GREAT FACILITIES</h5>
          <p>
            Our facilities are top-notch, providing an exceptional learning
            environment with state-of-the-art equipment and comfortable spaces.
          </p>
        </div>

        {/* second service div */}
        <div className="px-6 shadow-md py-4 rounded transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-solid hover:border-2 hover:border-black">
          <div className="text-5xl text-[#ff4e31] border rounded-full w-32 h-32 text-center items-center pl-10 pt-9 m-auto">
            <MdOutlineScience />
          </div>

          <h5 className="text-lg my-3">SCIENCE LABS</h5>
          <p>
            Our science labs are equipped with the latest technology to
            facilitate hands-on experiments and foster scientific curiosity.
          </p>
        </div>

        {/* third service div */}
        <div className="px-6 shadow-md py-4 rounded transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-solid hover:border-2 hover:border-black">
          <div className="text-5xl text-[#ff4e31] border rounded-full w-32 h-32 text-center items-center pl-10 pt-9 m-auto">
            <BiSolidBusSchool />
          </div>

          <h5 className="text-lg my-3">SCHOOL BUS</h5>
          <p>
            Our school bus service ensures safe and reliable transportation for
            students, making their commute comfortable and stress-free.
          </p>
        </div>

        {/* fourth service div */}
        <div className="px-6 shadow-md py-4 rounded transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-solid hover:border-2 hover:border-black">
          <div className="text-5xl text-[#ff4e31] border rounded-full w-32 h-32 text-center items-center pl-10 pt-9 m-auto">
            <RiGameLine />
          </div>

          <h5 className="text-lg my-3">Funny Games</h5>
          <p>
            We offer a variety of fun and engaging games that stimulate
            creativity and encourage teamwork among students.
          </p>
        </div>

        {/* fifth service div */}
        <div className="px-6 shadow-md py-4 rounded transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-solid hover:border-2 hover:border-black">
          <div className="text-5xl text-[#ff4e31] border rounded-full w-32 h-32 text-center items-center pl-10 pt-9 m-auto">
            <GiMeal />
          </div>

          <h5 className="text-lg my-3">DELICIOUS MEALS</h5>
          <p>
            Our cafeteria serves a variety of delicious and nutritious meals
            that cater to all tastes and dietary needs.
          </p>
        </div>

        {/* sixth service div */}
        <div className="px-6 shadow-md py-4 rounded transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:border-solid hover:border-2 hover:border-black">
          <div className="text-4xl text-[#ff4e31] border rounded-full w-32 h-32 text-center items-center pl-11 pt-10 m-auto">
            <FaPaintBrush />
          </div>

          <h5 className="text-lg my-3">VARIED CLASSES</h5>
          <p>
            We offer a wide range of classes, from arts to sports, ensuring that
            students can explore their interests and develop new skills.
          </p>
        </div>
      </div>
    </section>
  );
}
