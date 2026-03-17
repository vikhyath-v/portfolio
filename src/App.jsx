import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Edits from "./pages/Edits";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function MainPage() {
  return (
    <>
      <Home />
      <Work />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <div className="bg-custom-bg text-custom-text font-sans">
      <Router>
        <PageTransition />
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/edits" element={<Edits />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Router>
    </div>
  );
}