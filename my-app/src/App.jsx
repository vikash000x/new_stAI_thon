import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import "./App.css";
import SearchPage from "./pages/SearchPage";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // 3s splash
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="splash-container">
          <div className="blur-bg"></div>
          <div className="loader-box">
            <h1 className="splash-text">Discover Your Competition Like a Pro</h1>
            <ClipLoader color="#ffffff" size={60} />
          </div>
        </div>
      ) : (
        <SearchPage />
      )}
    </div>
  );
}

export default App;
