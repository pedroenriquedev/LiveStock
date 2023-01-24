import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api, handleError } from "../utils/axios";
import { getTodayString } from "../utils/getTodayString";
import styles from "../styles/AddWeightLog.module.css";
import Button from "./Button";

const AddWeightLog = (props) => {
  const router = useRouter();

  const todayString = getTodayString();
  const { animal, fireCloseModal } = props;
  const pasture = animal.pasture || "n/a";
  const [date, setDate] = useState(todayString);
  const [weight, setWeight] = useState(animal.currentWeight || 25);

  const APICall = async () => {
    if (weight < 25) {
      return;
    }

    try {
      const res = await api.patch(`/api/v1/animal/weightLog/${animal._id}`, {
        pasture,
        weight,
        date,
      });
    } catch (error) {
      handleError(error);
    }
    // close modal
    fireCloseModal();
    router.reload();
  };
  return (
    <div className={styles.container}>
      <h3>Weight Log</h3>
      <p>current weight: {animal.currentWeight}</p>
      <p>pasture: {pasture}</p>
      <div>
        <label>date of log</label>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
        />
      </div>

      <div>
        <label>weight (kg):</label>
        <input
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          type="number"
        />
      </div>

      <Button onClick={APICall} color={weight < 25 ? "gray" : "yellow"}>
        Submit{" "}
      </Button>
    </div>
  );
};

export default AddWeightLog;
