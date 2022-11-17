import "../styles/globals.css";
import { useEffect, useState } from "react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <div className="main">
      {/* <Navbar /> */}
      <div className="contentContainer">
        <div className="sidebarContainer">
          <Sidebar />
        </div>

        <div className="pagesContainer">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
