import { useEffect } from "react";
import "./about.css";
import image1 from "../../assets/images/gallery1.jpg";
import image2 from "../../assets/images/madany.jpg";
import image3 from "../../assets/images/gallery2.jpg";
import image4 from "../../assets/images/negm.jpg";
import { MdHeight } from "react-icons/md";

function Gallery() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("li"));
    const directions = { 0: "top", 1: "right", 2: "bottom", 3: "left" };
    const classNames = ["in", "out"]
      .map((p) => Object.values(directions).map((d) => `${p}-${d}`))
      .reduce((a, b) => a.concat(b), []);
    const getDirectionKey = (ev, node) => {
      const { width, height, top, left } = node.getBoundingClientRect();
      const l = ev.pageX - (left + window.pageXOffset);
      const t = ev.pageY - (top + window.pageYOffset);
      const x = l - (width / 2) * (width > height ? height / width : 1);
      const y = t - (height / 2) * (height > width ? width / height : 1);
      return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    };
    class Item {
      constructor(element) {
        this.element = element;
        this.element.addEventListener("mouseover", (ev) =>
          this.update(ev, "in")
        );
        this.element.addEventListener("mouseout", (ev) =>
          this.update(ev, "out")
        );
      }
      update(ev, prefix) {
        this.element.classList.remove(...classNames);
        this.element.classList.add(
          `${prefix}-${directions[getDirectionKey(ev, this.element)]}`
        );
      }
    }
    nodes.forEach((node) => new Item(node));
  }, []);

  const images = [
    {
      src: image1,
      title: "the smart one",
      description: "this is the first student in whole school",
    },
    {
      src: image3,
      title: "this is Madany",
      description: "Front-End Developer & cross plate-form mobile applications",
    },
    {
      src: image4,
      title: "the smart one",
      description: "this is the first student in whole school",
    },
    {
      src: image4,
      title: "this is Big Star",
      description: "this is our lovely instructor",
    },
    {
      src: image1,
      title: "the smart one",
      description: "this is the first student in whole school",
    },
    {
      src: image4,
      title: "this is Madany",
      description: "Front-End Developer & cross plate-form mobile applications",
    },
    {
      src: image3,
      title: "the smart one",
      description: "this is the first student in whole school",
    },
    {
      src: image4,
      title: "this is Big Star",
      description: "this is our lovely instructor",
    },
    {
      src: image4,
      title: "this is Big Star",
      description: "this is our lovely instructor",
    },
    {
      src: image2,
      title: "this is Madany",
      description: "Front-End Developer & cross plate-form mobile applications",
    },
    {
      src: image1,
      title: "the smart one",
      description: "this is the first student in whole school",
    },
    {
      src: image3,
      title: "the smart one",
      description: "this is the first student in whole school",
    },
  ];

  return (
    <div className="about-parent">
      <div className="container">
        <ul>
          {images.map((image, index) => (
            <li key={index}>
              <a>
                <img
                  src={image.src}
                  alt="school images"
                  style={{ width: "200px", height: "200px" }}
                />
              </a>
              <div className="info">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Gallery;
