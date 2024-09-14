import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

interface TestimonalProps{
    image: string,
    name: string,
    title: string,
    rating: number,
    description:string
}
const TestimonialBox = ({ image, name, title, rating, description }:TestimonalProps) => {
  return (
    <div className="box">
      <img src={image} alt={name} className="sbinner"/>
      <h3>{name}</h3>
      <span className="title">{title}</span>
      <div className="rate flex space-x-1">
        {Array.from({ length: 5 }, (_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={index < rating ? filledStar : emptyStar}
            className="text-yellow-300"
          />
        ))}
      </div>
      <p>{description}</p>
    </div>
  );
};

export default TestimonialBox;
