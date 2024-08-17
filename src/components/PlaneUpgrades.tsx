import SectionTitle from "./SectionTitle";

export default function PlanUpgrades() {
  return (
    <>
      <SectionTitle title="Activites" desc="Here is the activities" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-3 justify-center items-center bg-slate-200">
        {/* first div */}
        <div className="flex gap-4 p-4 ">
          <div className="border rounded-full w-28 h-28 bg-[#002749] text-center pt-9 text-white text-3xl ">
            Arts
          </div>
          <div className="w-2/4 py-3 text-[#545454]">
            <h3 className="text-xl xl:mb-2">Art Courses</h3>
            <p>
              Develop creativity and expression through various art mediums.
            </p>
          </div>
        </div>

        {/* second div */}
        <div className="flex gap-4 p-4">
          <div className="border rounded-full w-28 h-28 bg-[#FF4E31] text-center pt-9 text-white text-3xl ">
            Sports
          </div>
          <div className="w-2/4 py-3 text-[#545454]">
            <h3 className="text-xl xl:mb-2">Sports Programs</h3>
            <p>
              Encouraging physical activity and teamwork through various sports.
            </p>
          </div>
        </div>

        {/* third div */}
        <div className="flex gap-4 p-4">
          <div className="border rounded-full w-28 h-28 bg-[#002749] text-center pt-9 text-white text-3xl ">
            Music
          </div>
          <div className="w-2/4 py-3 text-[#545454]">
            <h3 className="text-xl xl:mb-2">Music Classes</h3>
            <p>Learn and practice musical instruments and theory.</p>
          </div>
        </div>

        {/* fourth div */}
        <div className="flex gap-4 p-4">
          <div className="border rounded-full w-28 h-28 bg-[#FF4E31] text-center pt-9 text-white text-2xl ">
            Language
          </div>
          <div className="w-2/4 py-3 text-[#545454]">
            <h3 className="text-xl xl:mb-2">Language Courses</h3>
            <p>Expand communication skills with new languages.</p>
          </div>
        </div>

        {/* fifth div */}
        <div className="flex gap-4 p-4">
          <div className="border rounded-full w-28 h-28 bg-[#002749] text-center pt-9 text-white text-3xl ">
            Tech
          </div>
          <div className="w-2/4 py-3 text-[#545454]">
            <h3 className="text-xl xl:mb-2">Technology</h3>
            <p>Explore the world of coding, robotics, and more.</p>
          </div>
        </div>

        {/* sixth div */}
        <div className="flex gap-4 p-4">
          <div className="border rounded-full w-28 h-28 bg-[#FF4E31] text-center pt-9 text-white text-3xl ">
            Drama
          </div>
          <div className="w-2/4 py-3 text-[#545454]">
            <h3 className="text-xl xl:mb-2">Drama Classes</h3>
            <p>
              Build confidence and performance skills through acting and theater
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
