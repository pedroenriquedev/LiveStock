import { useEffect } from "react";
import { useState } from "react";
import Modal from "../../../components/Modal";
import NewAnimal from "../../../components/NewAnimal";
import BatchAnimal from "../../../components/BatchAnimal";
import styles from "../../../styles/CreateBatch.module.css";
import { api, handleError } from "../../../utils/axios";

const CreateNewBatch = () => {
  const today = new Date(Date.now()).toLocaleDateString().split("/");
  const todayString = `${today[2]}-${today[0]}-${today[1]}`;

  const [isModalOpen, setModalOpen] = useState(false);
  const [rate, setRate] = useState(249);
  const [isFinalizingBatch, setIsFinalizingBatch] = useState(false);

  const [date, setDate] = useState(todayString);
  const [seller, setSeller] = useState("");
  const [description, setDescription] = useState("");

  const DUMMY = [
    {
      name: "boi cara preta",
      breed: "Gelbvieh",
      birthdate: "4/4/2019",
      initialWeight: 140,
      // date of purchase and price ratio could be hidden since it's a batch
      health: "healthy",
      description: "",
      priceRatio: 249,
      color: "malhado",
    },
    {
      name: "b",
      breed: "Belgian Blue",
      birthdate: null,
      initialWeight: 137,
      health: "healthy",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offic ia deserunt mollit anim id est laborum.",
      priceRatio: 249,
      color: "cinza",
    },
    {
      name: null,
      breed: "Brangus",
      birthdate: "5/4/2020",
      initialWeight: 152,
      health: "poor",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      priceRatio: 249,
      color: "vermelho",
    },
  ];

  const [animals, setAnimals] = useState(DUMMY);

  const resetUI = () => {
    setDate(todayString);
    setSeller("");
    setDescription("");
    setAnimals([]);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleNewAnimal = (animal) => {
    const newAnimals = [...animals, animal];
    setAnimals(newAnimals);
  };

  const handleDeleteAnimal = (index) => {
    const newAnimals = [...animals];
    newAnimals.splice(index, 1);
    setAnimals(newAnimals);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      if (animals.length === 0)
        // make button unclickable instead and gray
        throw new Error("Must have at least one animal");
      const animalsIds = [];
      setIsFinalizingBatch(true);

      for (const index in animals) {
        animals[index].dateOfPurchase = date;
        const res = await api.post(`/api/v1/animal`, animals[index]);
        animalsIds.push(res.data.newDoc._id);
      }

      // animals.forEach(async (animal) => {
      //   // animals are created

      // });

      const newBatch = {
        date,
        seller,
      };
      // new batch is created
      const res = await api.post(`/api/v1/batch`, newBatch);
      const id = res.data.data._id;
      // batch is updated with animals
      const batch = await api.patch(`/api/v1/batch/${id}`, {
        cattle: animalsIds,
      });
      // redo all this logic in the back end, user should not be responsible to update batch with animals.
      // user should simply create a new batch passing new animals data into it
      console.log(batch.data.data);
      resetUI();
    } catch (error) {
      handleError(error);
    }
    setIsFinalizingBatch(false);
  };

  return (
    <div>
      <h2>Batch information</h2>
      <form onSubmit={handleForm}>
        <div className={styles.batchInfo}>
          <div>
            <label>date of purchase</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="date of purchase"
              type="date"
            />
          </div>
          <div>
            <label>seller</label>
            <input
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
              required
            />
          </div>
          <div>
            <label>default rate</label>
            <input
              type="number"
              required
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>
          <div>
            <label>notes</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              cols="40"
            />
          </div>
        </div>
        <button className={styles.button} onClick={handleOpenModal}>
          Add animal
        </button>
        <div>
          <h2>Animals</h2>
          <div className={styles.labels}>
            <label>name</label>
            <label>breed</label>
            <label>rate (R$/@)</label>
            <label>weight (Kg)</label>
            <label>price (R$)</label>
          </div>
          <div className={styles.animals}>
            {animals.map((animal, index) => {
              return (
                <div key={index}>
                  <BatchAnimal
                    animal={animal}
                    handleDeleteAnimal={handleDeleteAnimal}
                    index={index}
                  ></BatchAnimal>
                </div>
              );
            })}
          </div>
        </div>
        <button
          className={
            animals.length > 0
              ? styles.button
              : `${styles.button} ${styles.disabled}`
          }
        >
          {isFinalizingBatch ? `. . .` : "Finalize batch"}
        </button>
      </form>
      <div>
        {isModalOpen && (
          <Modal visible={handleOpenModal} cancel={handleCloseModal}>
            <NewAnimal
              showDateOfPurchase={false}
              showPriceRatio={true}
              rate={rate}
              getAnimal={handleNewAnimal}
              closeModal={handleCloseModal}
            />
            {/* have an handler for each new animal component,
            this one will save right away in the db.
            the new animal in the batches screen will stack
            up until all animals are saved.
            */}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CreateNewBatch;
