import { HiOutlineArrowTrendingUp } from "react-icons/hi2";

function Contact() {
  return (
    <div className=" flex flex-col md:flex-row justify-between items-center mt-5 bg-violet-600 py-10">
      <div className="flex flex-col md:flex-row items-center md:pl-[10rem] mb-6 md:mb-0">
        <div className="p-4 bg-white rounded-full mr-0 md:mr-3 ml-0 md:ml-3 mb-4 md:mb-0">
          <HiOutlineArrowTrendingUp className="text-5xl" color="#ff4e31" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">FIND OUT MORE</h3>
          <p className="text-sm text-white">
            We'll be happy to answer any questions
          </p>
        </div>
      </div>
      <div className=" flex justify-center md:justify-end md:pr-[10rem]">
        <button className="contact_button">Contact us</button>
      </div>
    </div>
  );
}

export default Contact;
