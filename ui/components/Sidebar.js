import React, { useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import SidebarLink from "./SidebarLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar() {
  const [showSidebar, setShowSideBar] = useState(false);
  return (
    <div className={styles.sidebar}>
      <button
        className={styles.hamburger}
        onClick={() => {
          setShowSideBar((prevState) => !prevState);
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul>
        <li className={styles.active}>
          <SidebarLink
            path="/"
            text="home"
            icon={faHome}
            active={true}
            showText={showSidebar}
          />
        </li>
        <li>
          <SidebarLink
            showText={showSidebar}
            path="/animals"
            text="animals"
            icon={faCow}
          />
        </li>
        <li>
          <SidebarLink
            showText={showSidebar}
            path="/pastures"
            text="pastures"
            icon={faPanorama}
          />
        </li>
        <li>
          <SidebarLink
            showText={showSidebar}
            path="/batches"
            text="batches"
            icon={faFolderOpen}
          />
        </li>
      </ul>
      <ul>
        <li>
          <SidebarLink
            showText={showSidebar}
            path="/simulation"
            text="simulation"
            icon={faFlask}
          />
        </li>
        <li>
          <SidebarLink
            showText={showSidebar}
            path="/sell"
            text="sell"
            icon={faStamp}
          />
        </li>
      </ul>
      <ul>
        <li>
          <SidebarLink
            showText={showSidebar}
            path="/growth"
            text="growth"
            icon={faArrowUpRightDots}
          />
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
