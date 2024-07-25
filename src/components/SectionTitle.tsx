type SetionTitleProp = {
  title: string;
  desc: string;
};

const SectionTitle = ({ title, desc }: SetionTitleProp) => {
  return (
    <div className="relative flex flex-col justify-center items-center py-5">
      <h2 className=" text-4xl font-bold text-[#545454]">{title}</h2>
      <p className="text-[#545454] text-base text-center md:text-lg mt-2">
        {desc}
      </p>
      <div className="w-[260px] h-1 bg-[#545454] mt-8 relative">
        <span className=" absolute w-6 h-6 border-4 border-[#545454] rounded-full right-[120px] top-[-10px] bg-white"></span>
      </div>
    </div>
  );
};

export default SectionTitle;
