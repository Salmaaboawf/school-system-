import EnrollmentSlider from "../../components/about/EnrollmentSlider";
import SliderMain from "../../components/SliderMain";
import Service_Section from "../../components/ServiceSection";
import "../../assets/homelanding.css";
import Testimonials from "../../components/Testimonials";
import ScrollImages from "../../components/ScrollImages";
import Activities from "../../components/Activities";
import Heading from "../../components/about/Heading";

const HomeLanding = () => {
  return (
    <main className=" ">
      <section>
        <SliderMain />
      </section>
      <section className="px-10 ">
        <Heading
          h2="ENROLLMENT"
          p="Steps done with heart, soul, mind & strength"
        />
        <EnrollmentSlider />
      </section>
      <Service_Section />
     
      <Activities />
      <div className="mt-10">
        <ScrollImages />
      </div>
      <Testimonials />
    </main>
  );
};

export default HomeLanding;
