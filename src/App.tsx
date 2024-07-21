import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Header from "./components/Header";
import Grades from "./pages/Grades";
function App() {
  return (
    <main className="p-10">
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Grades />} />
            <Route path="/contact" element={<Schedule />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
