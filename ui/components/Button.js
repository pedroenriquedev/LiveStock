import React from "react";
import styles from "../styles/Button.module.css";

const Button = ({ onClick, children, color }) => {
  if (color === "gray") {
    return (
      <button className={`${styles.button}  ${styles.gray}`} onClick={onClick}>
        {children}
      </button>
    );
  } else {
    return (
      <button
        className={`${styles.button}  ${
          color === "red" ? styles.red : styles.yellow
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
};

export default Button;
