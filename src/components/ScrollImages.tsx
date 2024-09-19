import  { useRef } from 'react'
import { motion, useScroll, useTransform } from "framer-motion";
import image1 from "../assets/images/student/student(13).jpg";
import image2 from "../assets/images/student/student(14).jpg";
import image3 from "../assets/images/student/student(15).jpg";
import image4 from "../assets/images/student/student(10).jpg";

function ScrollImages() {
     const ref = useRef(null);
     const { scrollYProgress } = useScroll({
       target: ref,
       offset: ["start end", "end start"],
     });
    
     const y1 = useTransform(scrollYProgress, [0, 0.25], [100, 0]);
     const y2 = useTransform(scrollYProgress, [0.25, 0.5], [100, 0]);
     const y3 = useTransform(scrollYProgress, [0.5, 0.75], [100, 0]);
     const y4 = useTransform(scrollYProgress, [0.75, 1], [100, 0]);
  return (
    <div ref={ref} className="w-4/5 mx-auto lg:h-[400vh]">
      {/* Image 1 */}
      <motion.div
        className="lg:sticky top-0 lg:h-screen flex justify-center items-center mb-8 lg:mb-0"
        style={{ y: y1 }}
      >
        <img
          src={image1}
          alt="Sticky Example"
          className="w-full h-auto object-cover rounded-lg"
        />
      </motion.div>

      {/* Image 2 */}
      <motion.div
        className="lg:sticky top-0 lg:h-screen flex justify-center items-center mb-8 lg:mb-0"
        style={{ y: y2 }}
      >
        <img
          src={image2}
          alt="Sticky Example"
          className="w-full h-auto object-cover rounded-lg"
        />
      </motion.div>

      {/* Image 3 */}
      <motion.div
        className="lg:sticky top-0 lg:h-screen flex justify-center items-center mb-8 lg:mb-0"
        style={{ y: y3 }}
      >
        <img
          src={image3}
          alt="Sticky Example"
          className="w-full h-auto object-cover rounded-lg"
        />
      </motion.div>

      {/* Image 4 */}
      <motion.div
        className="lg:sticky top-0 lg:h-screen flex justify-center items-center mb-8 lg:mb-0"
        style={{ y: y4 }}
      >
        <img
          src={image4}
          alt="Sticky Example"
          className="w-full h-auto object-cover rounded-lg"
        />
      </motion.div>
    </div>
  );
}

export default ScrollImages