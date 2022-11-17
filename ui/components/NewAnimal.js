import React, { useState } from "react";
import styles from "../styles/NewAnimal.module.css";

const NewAnimal = ({
  showDateOfPurchase = true,
  showPriceRatio = true,
  rate,
  getAnimal,
  closeModal,
}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState(0);
  const [customRate, setCustomRate] = useState(rate);
  const [health, setHealth] = useState("healthy");
  const [description, setDescription] = useState("");

  const handleForm = (e) => {
    e.preventDefault();

    const animal = {
      name,
      color,
      breed,
      initialWeight: weight,
      priceRatio: customRate,
      health,
      description,
    };
    getAnimal(animal);
    closeModal();
  };
  return (
    <div>
      <h2>Cattle information</h2>

      <form className={styles.form} onSubmit={handleForm}>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
        <input
          placeholder="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
        <input
          placeholder="weight (kg)"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        {showDateOfPurchase && (
          <div>
            <label>date of purchase</label>
            <input placeholder="date of purchase" type="date" />
          </div>
        )}

        {showPriceRatio && (
          <input
            defaultValue={rate ? rate : 0}
            type="number"
            step="0.01"
            onChange={(e) => setCustomRate(e.target.value)}
            required
          />
        )}

        <div>
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
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.full}
        />

        <button>submit</button>
        {/* when hit submit, send all data out via props */}
      </form>
    </div>
  );
};

NewAnimal.defaultProps;

export default NewAnimal;
