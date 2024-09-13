import EnrollmentSlider from "../../components/EnrollmentSlider";
import SchoolStatus from "../../components/SchoolStatus";
import SliderMain from "../../components/SliderMain";
import { LuTrees } from "react-icons/lu";
import { GiTeacher } from "react-icons/gi";
import { TbMathMaxMin } from "react-icons/tb";
import { FaTree } from "react-icons/fa6";
import StatusCard from "../../components/StatusCard";
import Service_Section from "../../components/ServiceSection";
import PlanUpgrades from "../../components/PlaneUpgrades";
import awesomeVideo from "../../video/awesome-video.mp4";
import image1 from "../../assets/images/pexels-dominikagregus-672532.jpg";
import image2 from "../../assets/images/pexels-pixabay-460672.jpg";
import one from "../../assets/images/01.svg";
import two from "../../assets/images/02.svg";
import three from "../../assets/images/03.svg";
import four from "../../assets/images/04.svg";
import five from "../../assets/images/05.svg";
import six from "../../assets/images/06.svg";
import {  useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { SlSocialFacebook, SlSocialLinkedin, SlSocialYoutube } from "react-icons/sl";
import { TfiTwitter } from "react-icons/tfi";
const HomeLanding = () => {
const ref = useRef(null);
const { scrollYProgress } = useScroll({
   target: ref,
   offset: ["start end", "end start"],
 });

 // Set up scroll-based transforms for each image
 const y1 = useTransform(scrollYProgress, [0, 0.25], [100, 0]);
 const y2 = useTransform(scrollYProgress, [0.25, 0.5], [100, 0]);
 const y3 = useTransform(scrollYProgress, [0.5, 0.75], [100, 0]);
 const y4 = useTransform(scrollYProgress, [0.75, 1], [100, 0]);
  return (
    <main>
      <section>
        <SliderMain />
      </section>
      <section className="px-10 my-5">
        <EnrollmentSlider />
      </section>
      <Service_Section />
      <SchoolStatus>
        <>
          <StatusCard
            title="Outdoor Activities"
            number="75"
            icon={<LuTrees size={30} color="white" />}
          />
          <StatusCard
            title="Math Lessons"
            number="237"
            icon={<TbMathMaxMin size={30} color="white" />}
          />
          <StatusCard
            title="Loving Teachers"
            number="32"
            icon={<GiTeacher size={30} color="white" />}
          />
          <StatusCard
            title="Pencils Wood"
            number="457"
            icon={<FaTree size={30} color="white" />}
          />
        </>
      </SchoolStatus>
      {/* <h1 className="h-80">Hello</h1> */}
      <PlanUpgrades />
      {/* scroll images */}
      <div ref={ref} className="w-4/5 mx-auto lg:h-[400vh]">
        {/* Image 1 */}
        <motion.div
          className="lg:sticky top-0 lg:h-screen flex justify-center items-center mb-8 lg:mb-0"
          style={{ y: y1 }}
        >
          <img
            src={image1}
            alt="Sticky Example"
            className="w-full h-auto object-cover rounded-lg"
          />
        </motion.div>

        {/* Image 2 */}
        <motion.div
          className="lg:sticky top-0 lg:h-screen flex justify-center items-center mb-8 lg:mb-0"
          style={{ y: y2 }}
        >
          <img
            src={image2}
            alt="Sticky Example"
            className="w-full h-auto object-cover rounded-lg"
          />
        </motion.div>

        {/* Image 3 */}
        <motion.div
          className="lg:sticky top-0 lg:h-screen flex justify-center items-center mb-8 lg:mb-0"
          style={{ y: y3 }}
        >
          <img
            src={image1}
            alt="Sticky Example"
            className="w-full h-auto object-cover rounded-lg"
          />
        </motion.div>

        {/* Image 4 */}
        <motion.div
          className="lg:sticky top-0 lg:h-screen flex justify-center items-center mb-8 lg:mb-0"
          style={{ y: y4 }}
        >
          <img
            src={image2}
            alt="Sticky Example"
            className="w-full h-auto object-cover rounded-lg"
          />
        </motion.div>
      </div>

      {/* video sections */}
      <section className="bg-gray-100 py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Discover Our School
            </h2>
            <p className="mt-3 max-w-2xl text-xl text-gray-500 mx-auto">
              Explore our learning environment and meet our dedicated staff
              through our video.
            </p>
          </div>
          <div className="mt-10">
            <div className="relative pb-9/16">
              <video
                className="top-0 right-0"
                controls
                width="100%"
                height="100%"
              >
                <source src={awesomeVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>
      {/* start logos  */}
      {/* <section className="container mx-auto py-8">
        <div className="flex flex-wrap gap-x-2 loop justify-center">
          <div className="w-1/4 sm:w-1/6 lg:w-1/12 px-2 mb-4">
            <li className="list-none">
              <a href="#" className="iconfooter social-icon">
                <SlSocialLinkedin className="text-xl" />
              </a>
            </li>
          </div>
          <div className="w-1/4 sm:w-1/6 lg:w-1/12 px-2 mb-4">
            <li className="list-none">
              <a href="#" className="iconfooter social-icon">
                <TfiTwitter className="text-xl" />
              </a>
            </li>
          </div>
          <div className="w-1/4 sm:w-1/6 lg:w-1/12 px-2 mb-4">
            <li className="list-none">
              <a href="#" className="iconfooter social-icon">
                <SlSocialYoutube className="text-xl" />
              </a>
            </li>
          </div>
          <div className="w-1/4 sm:w-1/6 lg:w-1/12 px-2 mb-4">
            <li className="list-none">
              <a href="#" className="iconfooter social-icon">
                <SlSocialFacebook className="text-xl" />
              </a>
            </li>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default HomeLanding;
