import { IoMdCheckmarkCircleOutline } from "react-icons/io";


export default function OurHistory() {
  return (
    <>
      <h2 className="text-3xl">OUR HISTORY</h2>
      <h3 className="text-2xl text-slate-700	font-normal leading-tight mt-2 ">
        QUALITY CHILDREN EDUCATION
      </h3>
      <p className="mt-3  text-slate-500">
        Our school was founded with a vision to provide quality education and
        foster a love for learning in every child. Over the years, we have grown
        from a small community school into a well-established institution, known
        for our commitment to academic excellence and the holistic development
        of students.
      </p>
      <p className="mt-3  text-slate-500">
        Our journey began [insert founding year], and since then, we have
        continuously evolved to meet the needs of our students and the demands
        of modern education. With a strong focus on innovation, we have
        integrated the latest teaching methods and technologies to ensure our
        students are prepared for the challenges of tomorrow.
      </p>

      <div className=" icondiv">
        <IoMdCheckmarkCircleOutline color="#ff4e31" className="mt-1 text-lg" />
        <span className="ml-2">Learning program with after-school</span>
      </div>
      <div className="icondiv">
        <IoMdCheckmarkCircleOutline color="#ff4e31" className="mt-1 text-lg" />
        <span className="ml-2">Positive learning environment</span>
      </div>
      <div className="icondiv">
        <IoMdCheckmarkCircleOutline color="#ff4e31" className="mt-1 text-lg" />
        <span className="ml-2">Learning through play</span>
      </div>
    </>
  );

}