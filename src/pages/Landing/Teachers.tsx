import { useState } from "react";
import { FiFacebook } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { LuTwitter } from "react-icons/lu";

function Teachers() {
  const [teachers] = useState([
    {
      name: "Teacher 1",
      src: "src/assets/images/5-min-1.jpg",
      des: "Mel utamur nostrud et, duo illud oratio suavitate, qui cu elitr et sanctus. Ei convenire suavitate eos. Ex pro minimum recusabo.",
      sub: "Math teach",
    },
    {
      name: "Teacher 2",
      src: "src/assets/images/2-min.jpg",
      des: "Mel utamur nostrud et, duo illud oratio suavitate, qui cu elitr et sanctus. Ei convenire suavitate eos. Ex pro minimum recusabo.",
      sub: "Math teach",
    },
    {
      name: "Teacher 3",
      src: "src/assets/images/4-min.jpg",
      des: "Mel utamur nostrud et, duo illud oratio suavitate, qui cu elitr et sanctus. Ei convenire suavitate eos. Ex pro minimum recusabo.",
      sub: "Math teach",
    },
    {
      name: "Teacher 4",
      src: "src/assets/images/1-min.jpg",
      des: "Mel utamur nostrud et, duo illud oratio suavitate, qui cu elitr et sanctus. Ei convenire suavitate eos. Ex pro minimum recusabo.",
      sub: "Math teach",
    },
    {
      name: "Teacher 5",
      src: "src/assets/images/2-min.jpg",
      des: "Mel utamur nostrud et, duo illud oratio suavitate, qui cu elitr et sanctus. Ei convenire suavitate eos. Ex pro minimum recusabo.",
      sub: "Math teach",
    },
    {
      name: "Teacher 6",
      src: "src/assets/images/6-min-1.jpg",
      des: "Mel utamur nostrud et, duo illud oratio suavitate, qui cu elitr et sanctus. Ei convenire suavitate eos. Ex pro minimum recusabo.",
      sub: "Math teach",
    },
    {
      name: "Teacher 7",
      src: "src/assets/images/5-min-1.jpg",
      des: "Mel utamur nostrud et, duo illud oratio suavitate, qui cu elitr et sanctus. Ei convenire suavitate eos. Ex pro minimum recusabo.",
      sub: "Math teach",
    },
  ]);

  return (
    <div className="px-4 md:px-8 lg:px-16 text-[#002749]">
      {/* Header start */}
      <div className="bg-gray-300 py-8 my-8 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full text-center">
        <h1 className="text-3xl font-bold text-[#002749] dark:text-white">
          Teachers
        </h1>
      </div>
      {/* Header end */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teachers.map((teacher, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row"
          >
            {/* Image */}
            <a href="#">
              <img
                className="rounded-t-lg md:rounded-l-lg md:rounded-t-none w-full md:w-48"
                src={teacher.src}
                alt=""
              />
            </a>
            {/* Info */}
            <div className="p-5 flex-1">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#002749] dark:text-white">
                  {teacher.name}
                </h5>
              </a>
              {/* Contact */}
              <ul className="flex flex-wrap justify-center md:justify-start">
                <li className="p-3 m-2 rounded-full border border-gray-300">
                  <a
                    href="#"
                    target="_blank"
                    className="text-[#002749] hover:text-orange-500 transition-colors duration-300"
                  >
                    <FiFacebook />
                  </a>
                </li>
                <li className="p-3 m-2 rounded-full border border-gray-300">
                  <a
                    href="#"
                    target="_blank"
                    className="text-[#002749] hover:text-orange-500 transition-colors duration-300"
                  >
                    <SlSocialLinkedin />
                  </a>
                </li>
                <li className="p-3 m-2 rounded-full border border-gray-300">
                  <a
                    href="#"
                    target="_blank"
                    className="text-[#002749] hover:text-orange-500 transition-colors duration-300"
                  >
                    <LuTwitter />
                  </a>
                </li>
              </ul>
              {/* Description */}
              <p className="mb-3 py-4 font-normal text-[#002749] dark:text-gray-400">
                {teacher.des}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teachers;
