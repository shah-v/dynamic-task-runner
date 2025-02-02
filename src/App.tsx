import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import DynamicTaskRunner from "./pages/DynamicTaskRunner/DynamicTaskRunner";
import BouncingBalls from "./pages/BouncingBalls/BouncingBalls";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<DynamicTaskRunner />} />
          <Route path="/bb" element={<BouncingBalls />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
