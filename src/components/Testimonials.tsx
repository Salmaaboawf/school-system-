
import image2 from "../assets/images/pexels-pixabay-460672.jpg";
import "../assets/homelanding.css";
import TestimonialBox from "./TestimonialBox ";
import SectionTitle from "./SectionTitle";

const Testimonials = () => {
  const testimonialsData = [
    {
      image: image2,
      name: "Mostafa Madany",
      title: "Full Stack Web Developer",
      rating: 4,
      description:
        "Mostafa is a highly skilled developer, adept at both frontend and backend development. His work ethic and dedication are unmatched.",
    },
    {
      image: image2,
      name: "Salah Bestawy",
      title: "Software Engineer",
      rating: 4,
      description:
        "Salah has a great eye for detail and produces clean, efficient code. His collaboration skills make him an invaluable asset to any team.",
    },
    {
      image: image2,
      name: "Moumen Mostafa",
      title: "Web Development Specialist",
      rating: 5,
      description:
        "Moumen's passion for coding is evident in everything he does. His ability to solve complex problems is impressive.",
    },
    {
      image: image2,
      name: "Esraa Mohamed",
      title: "Frontend Engineer",
      rating: 3,
      description:
        "Esraa has a strong understanding of full-stack development, though he excels more on the frontend side.",
    },
    {
      image: image2,
      name: "ٍSalma Aboouf",
      title: "UI/UX Developer",
      rating: 3,
      description:
        "Salma is dedicated to delivering quality work. She has great experience in frontend technologies and strives to continuously improve.",
    },
    {
      image: image2,
      name: "Hadeer Sharei",
      title: "Mobile App Developer",
      rating: 5,
      description:
        "Hadeer is a creative thinker and brings innovative ideas to the table. His technical skills and ability to work under pressure are impressive.",
    },
  ];

  return (
    <div className="Testimonials mt-36" >
      <SectionTitle title="Testimonials" desc="Here are the testimonials" />
      <h2 className="mt-12"></h2>
      <div className="container">
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
  );
};

export default Testimonials;
