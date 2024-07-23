import EnrollmentSlider from "../../components/EnrollmentSlider";
import SliderMain from "../../components/SliderMain";

const HomeLanding = () => {
  return (
    <main>
      <section>
        <SliderMain />
      </section>
      <section className="px-10">
        <EnrollmentSlider />
      </section>
    </main>
  );
};

export default HomeLanding;
