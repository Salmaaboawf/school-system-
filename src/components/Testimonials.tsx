
import mostafa from "../assets/images/testimonials/steptodown.com100018.jpg";
import momen from "../assets/images/testimonials/steptodown.com374246.jpg";
import salma from "../assets/images/testimonials/steptodown.com731439.jpg";
import salah from "../assets/images/testimonials/steptodown.com789803.jpg";
import esraa from "../assets/images/testimonials/steptodown.com840566.jpg";
import hadeer from "../assets/images/testimonials/steptodown.com972047.jpg";
import "../assets/homelanding.css";
import TestimonialBox from "./TestimonialBox ";
import SectionTitle from "./SectionTitle";

const Testimonials = () => {
  const testimonialsData = [
    {
      image: mostafa,
      name: "Mostafa Madany",
      title: "Civil Engineer",
      rating: 4,
      description:
        "As a civil engineer, I appreciate the structured and professional environment this school offers. My child is excelling academically, and I am thoroughly impressed with the dedication of the staff.",
    },
    {
      image: momen,
      name: "Salah Bestawy",
      title: "Business Consultant",
      rating: 4,
      description:
        "The school's approach to education fosters both academic growth and personal development. My child has shown remarkable improvement, and I feel confident in the education being provided here.",
    },
    {
      image: salma,
      name: "Moumen Mostafa",
      title: "Architect",
      rating: 5,
      description:
        "This school has exceeded my expectations in every way. The attention to detail in the curriculum and the commitment to student well-being is incredible. My child has grown both academically and socially.",
    },
    {
      image: salah,
      name: "Esraa Mohamed",
      title: "Project Manager",
      rating: 3,
      description:
        "The school's strong emphasis on learning is admirable, and my child enjoys the collaborative environment. However, there is still some room for improvement in extracurricular activities.",
    },
    {
      image: esraa,
      name: "Salma Aboouf",
      title: "Marketing Specialist",
      rating: 3,
      description:
        "The school offers a nurturing environment with a solid academic foundation. I am particularly happy with how much my child has progressed in key subjects, though I hope to see more focus on creative development.",
    },
    {
      image: hadeer,
      name: "Hadeer Sharei",
      title: "Entrepreneur",
      rating: 5,
      description:
        "The level of care and dedication from the teachers is impressive. My child is thriving in this school, and I am extremely pleased with how they are being prepared for the future.",
    },
  ];


  return (
    <div className="Testimonials mt-36 ">
      <SectionTitle title="Testimonials" desc="Here are the testimonials" />

      <div className="w-[98%]">
        <div className="container mt-12">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialBox
              key={index}
              image={testimonial.image}
              name={testimonial.name}
              title={testimonial.title}
              rating={testimonial.rating}
              description={testimonial.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
