import "../styles/globals.css";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps, router }) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="main">
        {/* <Navbar /> */}
        <div className="contentContainer">
          <div className="sidebarContainer">
            <Sidebar />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <div className="pagesContainer" key={router.asPath}>
              <Component {...pageProps} />
            </div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default MyApp;
