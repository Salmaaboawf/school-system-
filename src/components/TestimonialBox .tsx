import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

interface TestimonialProps {
  image: string;
  name: string;
  title: string;
  rating: number;
  description: string;
}

const TestimonialBox = ({
  image,
  name,
  title,
  rating,
  description,
}: TestimonialProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 relative box">
      <img
        src={image}
        alt={`Photo of ${name}`}
        className=""
      />
      <h3 className="text-xl font-bold text-center mb-2">{name}</h3>
      <span className="block text-gray-500 text-center mb-2">{title}</span>
      <div className="flex justify-center mb-4 space-x-1">
        {Array.from({ length: 5 }, (_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={index < rating ? filledStar : emptyStar}
            className="text-yellow-400"
          />
        ))}
      </div>
      <p className="text-gray-700 text-center">{description}</p>
    </div>
  );
};

export default TestimonialBox;
