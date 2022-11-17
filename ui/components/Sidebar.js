import React from "react";
import styles from "../styles/Sidebar.module.css";

import {
  faHome,
  faCow,
  faPanorama,
  faFolderOpen,
  faFlask,
  faStamp,
  faArrowUpRightDots,
} from "@fortawesome/free-solid-svg-icons";
import SidebarLink from "./SidebarLink";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li className={styles.active}>
          <SidebarLink path="/" text="home" icon={faHome} active={true} />
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
          <SidebarLink path="/growth" text="growth" icon={faArrowUpRightDots} />
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
