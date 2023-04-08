import React, { useState, useEffect } from "react";
import styles from "../styles/Sidebar.module.css";
import {
  faHome,
  faCow,
  faPanorama,
  faFolderOpen,
  faFlask,
  faStamp,
  faArrowUpRightDots,
  faBars,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import SidebarLink from "./SidebarLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

function Sidebar() {
  const [showSidebar, setShowSideBar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setShowSideBar(false);
    }, 800);
  }, [router.asPath]);

  return (
    <div className={styles.sidebar}>
      <button
        className={styles.hamburger}
        onClick={() => {
          setShowSideBar((prevState) => !prevState);
        }}
      >
        {!showSidebar ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faClose} />
        )}
      </button>
      <div className={`${!showSidebar && styles.hidden}`}>
        <ul>
          <li className={styles.active}>
            <SidebarLink path="/" text="home" icon={faHome} />
          </li>
          <li>
            <SidebarLink path="/animals" text="animals" icon={faCow} />
          </li>
          <li>
            <SidebarLink path="/pastures" text="pastures" icon={faPanorama} />
          </li>
          <li>
            <SidebarLink path="/batches" text="batches" icon={faFolderOpen} />
          </li>
        </ul>
        <ul>
          <li>
            <SidebarLink path="/simulation" text="simulation" icon={faFlask} />
          </li>
          <li>
            <SidebarLink path="/sell" text="sell" icon={faStamp} />
          </li>
        </ul>
        <ul>
          <li>
            <SidebarLink
              path="/growth"
              text="growth"
              icon={faArrowUpRightDots}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
