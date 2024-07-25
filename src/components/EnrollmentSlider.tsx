import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-creative";
import "swiper/css/effect-cube";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";

import {
  A11y,
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper/modules";
import { useRef } from "react";
import SectionTitle from "./SectionTitle";

const enrollArr = [
  {
    title: "Contact",
    desc: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque la udantium, totam rem aperiam.",
  },
  {
    title: "Application",
    desc: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque la udantium, totam rem aperiam.",
  },
  {
    title: "Counseling",
    desc: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque la udantium, totam rem aperiam.",
  },
  {
    title: "Admission",
    desc: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque la udantium, totam rem aperiam.",
  },
  {
    title: "Registration",
    desc: "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque la udantium, totam rem aperiam.",
  },
];

const EnrollmentSlider = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  return (
    <div>
      <SectionTitle
        title="Enrollment"
        desc="Steps done with heart, soul, mind & strength"
      />
      <Swiper
        className="w-full relative py-5"
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        spaceBetween={30}
        modules={[Navigation, Pagination, Autoplay, A11y, EffectFade]}
        slidesPerView={1}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
          },
        }}
      >
        {enrollArr.map((item, index) => (
          <SwiperSlide
            className="flex flex-col items-center py-3 px-3 z-[20] relative"
            key={item.title}
          >
            <p
              className={`relative z-40 w-14 h-14 flex items-center justify-center font-bold rounded-full ${
                index % 2 == 0 ? "bg-[#FF4E31]" : "bg-[#002749]"
              } shadow-lg text-white text-xl mb-4`}
            >
              {index + 1}
            </p>
            <p className="text-[#545454] text-lg">{item.title}</p>
            <p className="text-center">{item.desc}</p>
          </SwiperSlide>
        ))}
        <span className="w-full h-1 border-dashed border-b-gray-950 border-2 top-[60px] z-[0] left-0 absolute"></span>
        <div className="flex justify-center my-5 gap-x-4 z-30">
          <div
            ref={navigationPrevRef}
            className="select-none z-30 cursor-pointer border-2 border-[#FF4E31] px-3 py-1 flex items-center justify-center rounded-l-3xl font-bold hover:bg-[#FF4E31] hover:text-white transition-all"
          >
            Prev
          </div>
          <div
            ref={navigationNextRef}
            className="select-none z-30 cursor-pointer border-2 border-[#FF4E31] px-3 py-1 flex items-center justify-center rounded-r-3xl font-bold hover:bg-[#FF4E31] hover:text-white transition-all"
          >
            Next
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default EnrollmentSlider;
