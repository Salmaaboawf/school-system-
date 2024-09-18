import { useEffect } from "react";
import "./about.css";
import image1 from "../../assets/images/student/student (1).jpg";
import image2 from "../../assets/images/student/student (2).jpg";
import image3 from "../../assets/images/student/student (3).jpg";
import image4 from "../../assets/images/student/student (4).jpg";
import image5 from "../../assets/images/student/student (5).jpg";
import image6 from "../../assets/images/student/student (6).jpg";
import image7 from "../../assets/images/student/student (7).jpg";
import image8 from "../../assets/images/student/student(8).jpg";
import image9 from "../../assets/images/student/student(9).jpg";
import image10 from "../../assets/images/student/student(10).jpg";
import image11 from "../../assets/images/student/student(11).jpg";
import image12 from "../../assets/images/student/student(12).jpg";

function Gallery() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("li"));
    const directions: { [key: number]: string } = {
      0: "top",
      1: "right",
      2: "bottom",
      3: "left",
    };

    const classNames = ["in", "out"]
      .map((p) => Object.values(directions).map((d) => `${p}-${d}`))
      .reduce((a, b) => a.concat(b), []);

    const getDirectionKey = (ev: MouseEvent, node: HTMLLIElement) => {
      const { width, height, top, left } = node.getBoundingClientRect();
      const l = ev.pageX - (left + window.pageXOffset);
      const t = ev.pageY - (top + window.pageYOffset);
      const x = l - (width / 2) * (width > height ? height / width : 1);
      const y = t - (height / 2) * (height > width ? width / height : 1);
      return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
    };

    class Item {
      element: HTMLLIElement;
      constructor(element: HTMLLIElement) {
        this.element = element;
        this.element.addEventListener("mouseover", (ev: MouseEvent) =>
          this.update(ev, "in")
        );
        this.element.addEventListener("mouseout", (ev: MouseEvent) =>
          this.update(ev, "out")
        );
      }
      update(ev: MouseEvent, prefix: string) {
        this.element.classList.remove(...classNames);
        this.element.classList.add(
          `${prefix}-${directions[getDirectionKey(ev, this.element)]}`
        );
      }
    }

    nodes.forEach((node) => new Item(node as HTMLLIElement));
  }, []);

  const images = [
    {
      src: image1,
      title: "Moments of Learning Our International School",
      description:
        "Highlighting curiosity, collaboration, and joy as we nurture global citizens and create lasting memories.",
    },
    {
      src: image2,
      title: "Moments of Learning Our International School",
      description:
        "Highlighting curiosity, collaboration, and joy as we nurture global citizens and create lasting memories.",
    },
    {
      src: image3,
      title: "Moments of Learning Our International School",
      description:
        "Highlighting curiosity, collaboration, and joy as we nurture global citizens and create lasting memories.",
    },
    {
      src: image4,
      title: "this is Toleen",
      description: "Sharing a laugh, creating lasting memories together.",
    },
    {
      src: image5,
      title: "Moments of Learning Our International School",
      description:
        "Highlighting curiosity, collaboration, and joy as we nurture global citizens and create lasting memories.",
    },
    {
      src: image6,
      title: "Moments of Learning Our International School",
      description:
        "Highlighting curiosity, collaboration, and joy as we nurture global citizens and create lasting memories.",
    },
    {
      src: image7,
      title: "Moments of Learning Our International School",
      description:
        "Highlighting curiosity, collaboration, and joy as we nurture global citizens and create lasting memories.",
    },
    {
      src: image8,
      title: "Moments of Learning Our International School",
      description:
        "Highlighting curiosity, collaboration, and joy as we nurture global citizens and create lasting memories.",
    },
    {
      src: image9,
      title: "Moments of Learning Our International School",
      description:
        "Highlighting curiosity, collaboration, and joy as we nurture global citizens and create lasting memories.",
    },
    {
      src: image10,
      title: "Moments of Learning Our International School",
      description:
        "Highlighting curiosity, collaboration, and joy as we nurture global citizens and create lasting memories.",
    },
    {
      src: image11,
      title: "Moments of Learning Our International School",
      description:
        "Highlighting curiosity, collaboration, and joy as we nurture global citizens and create lasting memories.",
    },
    {
      src: image12,
      title: "Moments of Learning Our International School",
      description:
        "Highlighting curiosity, collaboration, and joy as we nurture global citizens and create lasting memories.",
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
