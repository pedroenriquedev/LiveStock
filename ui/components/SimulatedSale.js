import React, { useState } from "react";
import { formateGrowth, formatePrice } from "../utils/format";
import styles from "../styles/SimulatedSale.module.css";
import Button from "./Button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SimulatedSale = ({ animals, handleShowSimulation }) => {
  const getPrice = (currentWeight, sellingRate) => {
    const actualWeight = currentWeight / 2;
    return sellingRate * (actualWeight / 15);
  };

  const getProfit = (initialPrice, price) => {
    return `R$${formatePrice(price - initialPrice)} (${formateGrowth(
      ((price - initialPrice) / initialPrice) * 100
    )})`;
  };

  const getTimeSpan = (dateOfPurchase) => {
    const today = new Date();
    const dayOfPurchase = new Date(dateOfPurchase);

    let difference = today.getTime() - dayOfPurchase.getTime();
    let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return totalDays;
  };

  const getTotalProfit = (animals) => {
    let total = 0;
    let initialTotal = 0;
    console.log(animals);
    animals.forEach((animal) => {
      total = total + getPrice(animal.currentWeight, animal.sellingRate);
      initialTotal = initialTotal + animal.initialPrice;
    });
    return {
      total,
      investment: initialTotal,
      profit: total - initialTotal,
      margin: ((total - initialTotal) / initialTotal) * 100,
    };
  };

  const total = getTotalProfit(animals);

  return (
    <div className={styles.mainContainer}>
      <Button onClick={handleShowSimulation}>Return</Button>
      <div className={styles.animalsContainer}>
        {animals.map((animal) => {
          animal.price = getPrice(animal.currentWeight, animal.sellingRate);

          return (
            <div key={animal._id} className={styles.container}>
              <h4>
                {animal._id}{" "}
                <Link href={`/animals/${animal._id}`} passHref>
                  <a>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </Link>
              </h4>
              <div className={styles.animal}>
                <div>
                  <span>weight</span>
                  <p>{`${animal.initialWeight} > ${
                    animal.currentWeight
                  } (${formateGrowth(animal.growthRatio)})`}</p>
                </div>

                <div>
                  <span>Rate</span>
                  <p>{`${animal.priceRatio} > ${animal.sellingRate} `}</p>
                </div>

                <div>
                  <span>Price</span>
                  <p>{`${formatePrice(animal.initialPrice)} > ${formatePrice(
                    animal.price
                  )}`}</p>
                </div>

                <div>
                  <span>Time span</span>
                  <p>{getTimeSpan(animal.dateOfPurchase) + " days."}</p>
                </div>

                <div>
                  <span>Profit</span>
                  <p>{getProfit(animal.initialPrice, animal.price)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {total && (
        <div className={styles.saleDetails}>
          <div>
            <span>total</span>
            <p>{`R$${formatePrice(total.total)}`}</p>
          </div>

          <div>
            <span>investment</span>
            <p>{`R$${formatePrice(total.investment)}`}</p>
          </div>

          <div>
            <span>profit</span>
            <p>{`R$${formatePrice(total.profit)} (${formateGrowth(
              total.margin
            )})`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimulatedSale;
