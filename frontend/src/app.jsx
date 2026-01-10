import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfileDashboard from "./pages/ProfileDashboard";
import PortfolioPreview from "./components/PortfolioPreview";
import "./App.css";

function App() {
  const [portfolioHTML, setPortfolioHTML] = useState("");

  const handleUpload = async () => {
    // backend / AI response
    const response = {
      html: "<h1>Shivansh Gupta</h1><p>AI Generated Portfolio</p>",
    };

    console.log(response.html); // ✅ console me aa raha
    setPortfolioHTML(response.html); // ✅ screen ke liye
  };

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <Navbar />
        <button onClick={handleUpload}>Upload Resume</button>

        {/* 👇 YAHAN PORTFOLIO DIKHEGA */}
        <PortfolioPreview html={portfolioHTML} />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:id" element={<ProfileDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
