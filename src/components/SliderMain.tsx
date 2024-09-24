import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-creative";
import "swiper/css/effect-cube";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import imgSliderOne from "../assets/images/slide_min_1.jpg";
import imgSliderTwo from "../assets/images/slide_min_2.jpg";
import headervideo from "../assets/video/header-video.mp4";
import {
  A11y,
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper/modules";
import { useRef } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const SliderMain = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  return (
    <>
      <Swiper
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        spaceBetween={30}
        effect={"fade"}
        speed={1500}
        autoplay={{ delay: 5500 }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay, A11y, EffectFade]}
        slidesPerView={1}
      >
        <SwiperSlide className="relative h-screen w-full">
          <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
          {/* Dark overlay */}
          {/* Video Background */}
          <video
            src={headervideo}
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="relative z-10 text-center text-white mt-[230px]">
            <h1 className="text-5xl text-white">
              Welcome to SCHOOLARSWAY School
            </h1>
            <p className="mt-5">Best gift for a child is a great education</p>
            <button className="mt-10 bg-[#ff4e31] hover:bg-[#002749] px-6 py-3 text-white rounded-lg">
              Enroll Now
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative h-screen w-full">
          <div className="absolute "></div> {/* Dark overlay */}
          <img
            src={imgSliderOne}
            alt="Slider Image"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 text-center text-white mt-[230px]">
            <h1 className="text-5xl text-white">
              Welcome to SCHOOLARSWAY School
            </h1>
            <p className="mt-5">Best gift for a child is a great education</p>
            <button className="mt-10 bg-red-500 px-6 py-3 text-white rounded-lg">
              Enroll Now
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative h-screen w-full">
          <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
          {/* Dark overlay */}
          <img
            src={imgSliderTwo}
            alt="Slider Image"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 text-center text-white mt-[230px]">
            <h1 className="text-5xl text-white">
              Welcome to Enfant Primary School
            </h1>
            <p className="mt-5">Best gift for a child is a great education</p>
            <button className="mt-10 bg-red-500 px-6 py-3 text-white rounded-lg">
              Enroll Now
            </button>
          </div>
        </SwiperSlide>

        <div
          ref={navigationPrevRef}
          className="bg-[#00000071] z-30  cursor-pointer absolute flex items-center justify-center rounded-full p-2 bottom-5 right-10"
        >
          <IoIosArrowForward color="white" size={30} />
        </div>
        <div
          ref={navigationNextRef}
          className="bg-[#00000071] z-30 cursor-pointer absolute flex items-center justify-center rounded-full p-2 bottom-5 left-10"
        >
          <IoIosArrowBack color="white" size={30} />
        </div>
      </Swiper>
    </>
  );
};

export default SliderMain;
