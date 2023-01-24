import React from "react";
import Link from "next/link";
import styles from "../styles/CustomLink.module.css";
const CustomLink = ({ text, href }) => {
  return (
    <Link href={`${href}`} passHref>
      <a className={styles.link}>{text}</a>
    </Link>
  );
};

export default CustomLink;
