import React from "react";
import styles from "../styles/BatchAnimal.module.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BatchAnimal = (props) => {
  const {
    name,
    breed,
    birthdate,
    initialWeight,
    health,
    description,
    priceRatio,
  } = props.animal;

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

      <span>{getAnimalPrice(initialWeight)}</span>

      <button className={styles.button} onClick={deleteAnimal}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
};

export default BatchAnimal;
