import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade"; // Import only the necessary effects
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  A11y,
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper/modules";
import { useEffect, useRef } from "react";

const enrollArr = [
  {
    title: "Contact",
    desc: "For any inquiries about our school programs, feel free to reach out to us.",
  },
  {
    title: "Application",
    desc: "Learn about our application process and how to apply for admission.",
  },
  {
    title: "Counseling",
    desc: "We offer counseling services to help students succeed academically and emotionally.",
  },
  {
    title: "Admission",
    desc: "Find out more about our admission requirements and deadlines.",
  },
  {
    title: "Registration",
    desc: "Get information on how to register for classes and extracurricular activities.",
  },
];

const EnrollmentSlider = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  useEffect(() => {
    // Update Swiper navigation refs
    const swiperInstance = {
      el: navigationPrevRef.current,
      // Ensure that the Swiper instance is set up correctly
      swiper: {
        navigation: {
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        },
      },
    };
    if (navigationPrevRef.current && navigationNextRef.current) {
      navigationPrevRef.current.swiper = swiperInstance.swiper;
      navigationNextRef.current.swiper = swiperInstance.swiper;
    }
  }, []);

  return (
    <div>
      <Swiper
        className="w-[70%] relative py-5"
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        spaceBetween={30}
        modules={[Navigation, Pagination, Autoplay, A11y, EffectFade]}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
        }}
        autoplay={{ delay: 2000 }} // Optional: Autoplay configuration
        loop={true} // Optional: Loop through slides
      >
        {enrollArr.map((item, index) => (
          <SwiperSlide
            className="flex flex-col items-center py-3 px-3 z-[20] relative"
            key={item.title}
          >
            <p
              className={`relative z-40 w-14 h-14 flex items-center justify-center font-bold rounded-full ${
                index % 2 === 0 ? "bg-[#FF4E31]" : "bg-[#002749]"
              } shadow-lg text-white text-xl mb-4`}
            >
              {index + 1}
            </p>
            <p className="text-[#545454] text-lg">{item.title}</p>
            <p className="text-center">{item.desc}</p>
          </SwiperSlide>
        ))}
        <span className="w-full h-1 border-dashed border-b-gray-950 border-2 top-[60px] z-[0] left-0 absolute"></span>
        <div className="flex justify-center my-5 gap-x-4">
          <div ref={navigationPrevRef} className="enrollment rounded-l-3xl">
            Prev
          </div>
          <div ref={navigationNextRef} className="enrollment rounded-r-3xl">
            Next
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default EnrollmentSlider;
