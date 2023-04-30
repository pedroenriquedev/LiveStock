import React, { useEffect, useState } from "react";
import { api, handleError } from "../utils/axios";
import Button from "./Button";
import { useRouter } from "next/router";
import styles from "../styles/NewPasture.module.css";
const NewPasture = () => {
  const conditions = ["good", "poor", "satisfactory"];
  const [name, setName] = useState("");
  const [pastureCondition, setPastureCondition] = useState("default");
  const [area, setArea] = useState(5);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  const handleAddPasture = async (e) => {
    e.preventDefault();
    try {
      const pasture = await api.post(`/api/v1/pasture`, {
        name,
        area,
        pastureCondition,
      });

      router.reload();
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (
      !name ||
      name.length < 1 ||
      area < 1 ||
      pastureCondition === "default"
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [name, area, pastureCondition]);

  return (
    <form className={styles.form} onSubmit={handleAddPasture}>
      <h3>Add Pasture</h3>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>

      <div>
        <label htmlFor="area">Area (m²)</label>
        <input
          className={styles.number}
          type="number"
          id="area"
          required
          min={1}
          value={area}
          onChange={(e) => setArea(e.target.value)}
        ></input>
      </div>

      <div>
        <label htmlFor="condition">Condition</label>
        <select
          name="pastures"
          onChange={(e) => setPastureCondition(e.target.value)}
          defaultValue={"default"}
          required
        >
          <option disabled value="default">
            select a codition
          </option>
          {conditions.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>
      </div>

      <Button color={isValid ? "yellow" : "gray"}>Submit</Button>
    </form>
  );
};

export default NewPasture;
