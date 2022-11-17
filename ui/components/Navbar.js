import React from "react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">
            <a className={styles.link}>Logo</a>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/">
            <a className={styles.link}>Contact</a>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link href="/">
            <a className={styles.link}>Picture</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
