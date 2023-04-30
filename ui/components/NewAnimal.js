import React, { useState, useEffect } from "react";
import styles from "../styles/NewAnimal.module.css";
import Button from "./Button";

const NewAnimal = ({
  showDateOfPurchase = true,
  showPriceRatio = true,
  rate,
  getAnimal,
  closeModal,
}) => {
  const [date, setDate] = useState(undefined);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState(0);
  const [customRate, setCustomRate] = useState(rate);
  const [health, setHealth] = useState("healthy");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();

    if (date === undefined) {
      date = new Date();
    }

    const animal = {
      name,
      color,
      breed,
      initialWeight: weight,
      priceRatio: customRate,
      health,
      description,
      dateOfPurchase: date,
    };
    getAnimal(animal);
    closeModal();
  };

  useEffect(() => {
    if (
      !breed ||
      breed.length < 1 ||
      !color ||
      color.length < 1 ||
      weight < 30 ||
      customRate < 1
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [weight, breed, customRate, color]);

  return (
    <div>
      <h2>Cattle information</h2>

      <form className={styles.form} onSubmit={handleForm}>
        <div>
          <label htmlFor="name">name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="color">color</label>
          <input
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="breed">breed</label>
          <input
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="weight">weight (kg)</label>
          <input
            className={styles.number}
            id="weight"
            type="number"
            min={30}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>

        {showDateOfPurchase && (
          <div>
            <label>date of purchase</label>
            <input
              placeholder="date of purchase"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        )}

        {showPriceRatio && (
          <div>
            <label htmlFor="rate">rate</label>
            <input
              className={styles.number}
              defaultValue={rate ? rate : 1}
              id="rate"
              type="number"
              step="0.01"
              min={1}
              onChange={(e) => setCustomRate(e.target.value)}
              required
            />
          </div>
        )}

        <div className={styles.health}>
          <label>health condition</label>
          <select
            name="health"
            id="health"
            onChange={(e) => setHealth(e.target.value)}
          >
            <option value="healthy">healthy</option>
            <option value="poor">poor</option>
            <option value="good">good</option>
            <option value="critical">critical</option>
          </select>
        </div>

        {/* critical, poor, good, healthy */}
        <div>
          <label htmlFor="description">description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.full}
          />
        </div>

        <Button color={isValid ? "yellow" : "gray"}>Submit</Button>
        {/* when hit submit, send all data out via props */}
      </form>
    </div>
  );
};

NewAnimal.defaultProps;

export default NewAnimal;
