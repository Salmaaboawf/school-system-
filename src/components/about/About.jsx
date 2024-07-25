import Counter from "../Counter";
import "./about.css";
import Feature from "./Feature";
import OurHistory from "./Ourhistory";
import "./tailwind.css";
import Contact from "./Contact";
import Heading from "./Heading";
import Gallery from "./Gallery";
import EnrollmentSlider from "./EnrollmentSlider";
export default function About() {
  return (
    <>
      <div className="bg-gray-100  text-center py-10 text-3xl mb-5 ">
        <h2> About us </h2>
      </div>
      <div className="counter bg-slideOne">
        <Counter />
      </div>
      <Heading h2="OUR SERVICES" p="We make your child happy day after day" />
      <div className=" OurHistory md:w-[80%] md:mx-auto">
        <div className=" md:w-3/6  w-[100%]">
          <OurHistory />
        </div>
        <div className=" md:w-3/6  w-[100%] ">
          <Feature />
        </div>
      </div>
      <Heading
        h2="OUR OUR EVENTS"
        p="We make your We do all the work, you get all the credit happy day after day"
      />
      <Contact />
      <Heading
        h2="ENROLLMENT"
        p="Steps done with heart, soul, mind & strength"
      />

      <EnrollmentSlider />
      <Gallery />
    </>
  );
}
