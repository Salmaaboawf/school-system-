import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <main className="p-10">
      <div className="container flex gap-x-5  ">
        <div className="flex-[1]">
          <Sidebar />
        </div>
        <div className="flex-[4]">
          {/* Header of the section */}
          <div></div>
          {/* Header of the section */}
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/" element={<Schedule />} />
            </Routes>
          </Router>
        </div>
      </div>
    </main>
  );
}

export default App;
