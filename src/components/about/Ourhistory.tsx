import { IoMdCheckmarkCircleOutline } from "react-icons/io";


export default function OurHistory() {
  return (
    <>
      <h2 className="text-3xl">OUR HISTORY</h2>
      <h3 className="text-2xl text-slate-700	font-normal leading-tight mt-2 ">
        QUALITY CHILDREN EDUCATION
      </h3>
      <p className="mt-3  text-slate-500">
        Alterum accommodare duo cu. Ius labore luptatum efficiendi ex, ne vim
        enim rebum honestatis, ad his consulatu pertinacia deterruisset. Te
        bonorum ancillae nec. Mea errem alterum in, harum iudico vel et, nec
        atqui propriae id.
      </p>
      <p className="mt-3  text-slate-500">
        Alterum accommodare duo cu. Ius labore luptatum efficiendi ex, ne vim
        enim rebum honestatis, ad his consulatu pertinacia deterruisset. Te
        bonorum ancillae nec. Mea errem alterum in, harum iudico vel et, nec
        atqui propriae id.
      </p>

      <div className=" icondiv">
        <IoMdCheckmarkCircleOutline
          color="#ff4e31"
          className="mt-1 text-lg"
        />
        <span className="ml-2">Learning program with after-school</span>
      </div>
      <div className="icondiv">
        <IoMdCheckmarkCircleOutline
          color="#ff4e31"
          className="mt-1 text-lg"
        />
        <span className="ml-2">Positive learning environment</span>
      </div>
      <div className="icondiv">
        <IoMdCheckmarkCircleOutline
          color="#ff4e31"
          className="mt-1 text-lg"
        />
        <span className="ml-2">Learning through play</span>
      </div>
    </>
  );

}