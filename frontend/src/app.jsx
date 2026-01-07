import { useState } from "react";
import PortfolioPreview from "./components/PortfolioPreview";

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
    <div style={{ padding: "20px" }}>
      <button onClick={handleUpload}>Upload Resume</button>

      {/* 👇 YAHAN PORTFOLIO DIKHEGA */}
      <PortfolioPreview html={portfolioHTML} />
    </div>
  );
}

export default App;
