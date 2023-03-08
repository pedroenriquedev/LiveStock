import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "../styles/NavbarLink.module.css";
import { useRouter } from "next/router";

const SidebarLink = (props) => {
  const router = useRouter();

  return (
    <Link href={props.path} passHref>
      <a
        className={`${styles.link} ${
          router.pathname === props.path ? styles.active : ""
        } ${props.showText === true ? styles.fullWidth : ""} `}
      >
        <FontAwesomeIcon
          icon={props.icon}
          className={`${props.showText === true ? styles.marginRight : ""}`}
        />
        {props.showText && props.text}
      </a>
    </Link>
  );
};

export default SidebarLink;
