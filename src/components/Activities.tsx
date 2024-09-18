import SectionTitle from "./SectionTitle";
import "../components/about/tailwind.css";
export default function Activities() {
  return (
    <>
      <SectionTitle title="Activities" desc="Here are the activities" />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-3 gap-6 justify-center items-center bg-[#FBFBFD] p-4">
        {/* First Activity */}
        <div className="activities">
          <div className="activities_child bg-[#FF4E31]">Arts</div>
          <div className="w-2/4 py-3 text-[#545454]">
            <h3 className="text-xl font-semibold mb-2">Art Courses</h3>
            <p>
              Develop creativity and expression through various art mediums.
            </p>
          </div>
        </div>
        {/* Second Activity */}
        <div className="activities">
          <div className="activities_child bg-[#002749]"> Sports</div>
          <div className="w-2/4 py-3 text-[#545454]">
            <h3 className="text-xl font-semibold mb-2">Sports Programs</h3>
            <p>
              Encouraging physical activity and teamwork through various sports.
            </p>
          </div>
        </div>
        {/* Third Activity */}
        <div className="activities">
          <div className="activities_child bg-[#FF4E31]"> Music</div>
          <div className="w-2/4 py-3 text-[#545454]">
            <h3 className="text-xl font-semibold mb-2">Music Classes</h3>
            <p>Learn and practice musical instruments and theory.</p>
          </div>
        </div>
        {/* Fourth Activity */}
        <div className="activities">
          <div className="activities_child bg-[#002749]">Language</div>
          <div className="w-2/4 py-3 text-[#545454]">
            <h3 className="text-xl font-semibold mb-2">Language Courses</h3>
            <p>Expand communication skills with new languages.</p>
          </div>
        </div>
        {/* Fifth Activity */}
        <div className="activities">
          <div className="activities_child bg-[#FF4E31]">Tech</div>
          <div className="w-2/4 py-3 text-[#545454]">
            <h3 className="text-xl font-semibold mb-2">Technology</h3>
            <p>Explore the world of coding, robotics, and more.</p>
          </div>
        </div>

        {/* Sixth Activity */}
        <div className="activities">
          <div className="activities_child bg-[#002749]"> Drama</div>
          <div className="w-2/4 py-3 text-[#545454]">
            <h3 className="text-xl font-semibold mb-2">Drama Classes</h3>
            <p>
              Build confidence and performance skills through acting and
              theater.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
