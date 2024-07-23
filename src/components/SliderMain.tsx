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
        <SwiperSlide className="h-[300px] md:h-[600px] relative flex items-center px-10">
          <div className="relative z-40 w-full md:w-2/3 px-5 container">
            <h1 className="text-white text-lg md:text-5xl">
              Enfant Primary School
            </h1>
            <h1 className="text-white font-bold text-xl md:text-6xl my-5">
              Best Gift For a child is a great education
            </h1>
            <button className=" bg-red-500 text-white px-5 py-2 rounded-3xl hover:bg-red-400 transition-all">
              Enroll now
            </button>
          </div>
          <span className=" absolute w-full h-full right-0 top-0 animate-bg">
            <img
              src={imgSliderOne}
              alt="img-slider"
              className="w-full h-full"
            />
          </span>
        </SwiperSlide>
        <SwiperSlide className="h-[300px] md:h-[600px] relative flex items-center px-10">
          <div className="relative z-40 w-full md:w-2/3 px-5 container ">
            <h1 className="text-white text-lg md:text-5xl">
              Enfant Primary School
            </h1>
            <h1 className="text-white font-bold text-xl md:text-6xl my-5">
              We are making every child world's better
            </h1>
            <button className=" bg-red-500 text-white px-5 py-2 rounded-3xl hover:bg-red-400 transition-all">
              Contact Us
            </button>
          </div>
          <span className=" absolute w-full h-full right-0 top-0 animate-bg">
            <img
              src={imgSliderTwo}
              alt="img-slider"
              className="w-full h-full"
            />
          </span>
        </SwiperSlide>
        <div
          ref={navigationPrevRef}
          className="bg-[#00000071] cursor-pointer absolute z-[400] flex items-center justify-center rounded-full p-2 bottom-5 right-10"
        >
          <IoIosArrowForward color="white" size={30} />
        </div>
        <div
          ref={navigationNextRef}
          className="bg-[#00000071] cursor-pointer absolute z-[400] flex items-center justify-center rounded-full p-2 bottom-5 left-10"
        >
          <IoIosArrowBack color="white" size={30} />
        </div>
      </Swiper>
    </>
  );
};

export default SliderMain;
