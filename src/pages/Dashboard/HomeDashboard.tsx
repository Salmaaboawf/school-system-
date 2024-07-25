import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar";
import AddTeacher from "./AddTeacher";

const HomeDashboard = () => {
  return (
    <div className="container flex gap-x-5  ">
      <div className="flex-[1]">
        <Sidebar />
      </div>
      <div className="flex-[4]">
        {/* Header of the section */}
        <div>
          <Header />
        </div>
        {/* Header of the section */}
        <div className="my-5">
          <AddTeacher />
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
