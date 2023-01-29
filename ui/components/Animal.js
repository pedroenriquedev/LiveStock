import Link from "next/link";
import React from "react";
import styles from "../styles/Animal.module.css";
import { formatDate, formateGrowth } from "../utils/format";
import CustomLink from "./CustomLink";

const Animal = ({ animal, showCheckbox, manageToBeChangedArr }) => {
  const handleCheckbox = (e) => {
    manageToBeChangedArr(animal._id, e.target.checked);
  };
  return (
    <>
      <label className={styles.animal} htmlFor={animal._id}>
        {showCheckbox && (
          <input
            type="checkbox"
            value={animal._id}
            id={animal._id}
            onChange={handleCheckbox}
          ></input>
        )}

        <div className={styles.animalDetails}>
          <div>
            <span>name</span>
            <p>{animal.name || "-"}</p>
          </div>

          <div>
            <span>date of purchase</span>
            <p>{formatDate(animal.dateOfPurchase)}</p>
          </div>

          <div>
            <span>health</span>
            <p>{animal.health}</p>
          </div>

          <div>
            <span>weight</span>
            <p>{animal.currentWeight || animal.initialWeight}</p>
          </div>

          <div>
            <span>growth</span>
            <p>{formateGrowth(animal.growthRatio)}</p>
          </div>
        </div>
        <CustomLink text={`Details`} href={`animals/${animal._id}`} />
      </label>
    </>
  );
};

export default Animal;
