import React from "react";
import styles from "../styles/BatchAnimal.module.css";
import { faTrash, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatePrice } from "../utils/format";
const BatchAnimal = (props) => {
  const { name, breed, initialWeight, priceRatio } = props.animal;

  const { handleDeleteAnimal, index } = props;

  const deleteAnimal = (e) => {
    e.preventDefault();
    handleDeleteAnimal(index);
  };

  const getAnimalPrice = (weight) => {
    const actualWeight = weight / 2;
    return priceRatio * (actualWeight / 15);
  };
  return (
    <div className={styles.animalContainer}>
      {name ? <span>{name}</span> : <span>-</span>}

      <span>{breed}</span>

      <span>{priceRatio}</span>

      <span>{initialWeight}</span>

      <span>{formatePrice(getAnimalPrice(initialWeight))}</span>

      <button className={styles.button} onClick={deleteAnimal}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  );
};

export default BatchAnimal;
