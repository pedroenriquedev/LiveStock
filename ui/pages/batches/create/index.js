import { useEffect } from "react";
import { useState } from "react";
import Modal from "../../../components/Modal";
import NewAnimal from "../../../components/NewAnimal";
import BatchAnimal from "../../../components/BatchAnimal";
import styles from "../../../styles/CreateBatch.module.css";
import { api, handleError } from "../../../utils/axios";
import { getTodayString } from "../../../utils/getTodayString";
import GoBackButton from "../../../components/GoBackButton";
import { useRouter } from "next/router";
import Button from "../../../components/Button";
import Layout from "../../../components/Layout";

const CreateNewBatch = () => {
  const todayString = getTodayString();

  const [isModalOpen, setModalOpen] = useState(false);
  const [rate, setRate] = useState(249);
  const [isFinalizingBatch, setIsFinalizingBatch] = useState(false);

  const [date, setDate] = useState(todayString);
  const [seller, setSeller] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const DUMMY = [
    {
      name: "Placeholder A",
      breed: "Nelore",
      initialWeight: 148,
      // date of purchase and price ratio could be hidden since it's a batch
      health: "healthy",
      description: "",
      priceRatio: 249,
      color: "malhado",
    },
    {
      name: "Placeholder B",
      breed: "Mascavo",
      birthdate: null,
      initialWeight: 130,
      health: "healthy",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      priceRatio: 249,
      color: "cinza",
    },
    {
      name: "Placeholder C",
      breed: "Nelore",
      initialWeight: 140,
      health: "poor",
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
      setIsFinalizingBatch(true);

      const batch = await api.post(`/api/v1/batch/createBatchWithAnimals`, {
        date,
        seller,
        animals,
      });

      resetUI();
    } catch (error) {
      handleError(error);
    }
    setIsFinalizingBatch(false);
  };

  return (
    <Layout>
      <GoBackButton router={router} />
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
        <div className={styles.marginTopBottom}>
          <Button onClick={handleOpenModal}>Add Animal</Button>
        </div>

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
        <div className={styles.marginTopBottom}>
          <Button color={animals.length > 0 ? "yellow" : "gray"}>
            {isFinalizingBatch ? `. . .` : "Finalize batch"}
          </Button>
        </div>
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
    </Layout>
  );
};

export default CreateNewBatch;
