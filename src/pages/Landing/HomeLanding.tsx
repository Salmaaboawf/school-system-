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
import "../../assets/homelanding.css";
import Testimonials from "../../components/Testimonials";
import ScrollImages from "../../components/ScrollImages";
import ParticlesComponent from "../../components/Tsparticles";

const HomeLanding = () => {
  return (
    <main className=" ">
      <ParticlesComponent id="particles" />
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
      <PlanUpgrades />
      <ScrollImages />
      <Testimonials />
    </main>
  );
};

export default HomeLanding;
