import styles from "../styles/Modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faXmark,
  faXmarkCircle,
  faXRay,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

const Modal = (props) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the modal is open and the clicked target is not within the modal,
      //then close the modal
      if (
        props.visible &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        props.cancel();
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [props.visible]);

  return (
    <div ref={modalRef} className={styles.container}>
      <button className={styles.button} onClick={props.cancel}>
        <FontAwesomeIcon icon={faClose} />
      </button>
      {props.children}
    </div>
  );
};

export default Modal;
