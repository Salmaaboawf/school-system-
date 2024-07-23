import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

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
        <h1>Hello from dashboard</h1>
      </div>
    </div>
  );
};

export default HomeDashboard;
