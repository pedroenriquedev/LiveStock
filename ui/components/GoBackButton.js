import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/GoBackButton.module.css";
import React from "react";

const GoBackButton = ({ router }) => {
  return (
    <a className={styles.button} onClick={() => router.back()}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </a>
  );
};

export default GoBackButton;
