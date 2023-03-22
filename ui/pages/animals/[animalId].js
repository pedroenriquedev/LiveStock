import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api, handleError } from "../../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/AnimalDetails.module.css";
import { formatDate, formateGrowth, formatePrice } from "../../utils/format";
import Link from "next/link";
import GoBackButton from "../../components/GoBackButton";
import Modal from "../../components/Modal";
import AddWeightLog from "../../components/AddWeightLog";
import LineChart from "../../components/LineChart";
import Button from "../../components/Button";
import Layout from "../../components/Layout";

export default function AnimalDetails() {
  const router = useRouter();
  const { animalId } = router.query;
  const [animal, setAnimal] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getAnimal = async () => {
    try {
      const res = await api.get(`/api/v1/animal/${animalId}`);
      setAnimal(res.data.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    getAnimal();
  }, [router.isReady]);

  return (
    <Layout>
      <GoBackButton router={router} />
      <div className={styles.details}>
        <div>
          <span>name</span>
          <p>{animal.name || "N/A"}</p>
        </div>

        <div>
          <span>color</span>
          <p>{animal.color}</p>
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
          <span>breed</span>
          <p>{animal.breed || "N/A"}</p>
        </div>

        <div>
          <span>initial weight</span>
          <p>{animal.initialWeight}kg</p>
        </div>

        <div>
          <span>rate</span>
          <p>{`R$${animal.priceRatio}`}</p>
        </div>

        <div>
          <span>initial price</span>
          <p>{`R$${formatePrice(animal.initialPrice)}`}</p>
        </div>

        <div>
          <span>current weight</span>
          <p>{animal.currentWeight || animal.initialWeight}kg</p>
        </div>

        <div>
          <span>growth</span>
          <p>{formateGrowth(animal.growthRatio)}</p>
        </div>

        <div>
          <span>avg monthly growth</span>
          <p>{formateGrowth(animal.averageMonthlyGrowth)}</p>
        </div>

        <div>
          <span className={styles.specialField}>
            pasture
            {animal.pasture && (
              <Link href={`/pastures/${animal.pasture}`} passHref>
                <a>
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </Link>
            )}
          </span>
          <p>{animal.pasture || "N/A"}</p>
        </div>

        <div>
          <span className={styles.specialField}>
            vendor
            {animal.batch && (
              <Link href={`/batches/${animal.batch}`} passHref>
                <a>
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </Link>
            )}
          </span>
          <p>{animal.batch || "N/A"}</p>
        </div>

        <div>
          <span>notes</span>
          <p>{animal.description || "N/A"}</p>
        </div>
      </div>

      {animal.weightLog && <LineChart weightLog={animal.weightLog} />}

      <div className={styles.action}>
        <Button onClick={handleOpenModal}>Add Weight Log</Button>
      </div>

      {isModalOpen && (
        <Modal visible={handleOpenModal} cancel={handleCloseModal}>
          <AddWeightLog animal={animal} fireCloseModal={handleCloseModal} />
        </Modal>
      )}
      <div className={styles.weightLogContainer}>
        {animal.weightLog &&
          animal.weightLog
            .slice(0)
            .reverse()
            .map((log) => (
              <div key={log._id}>
                <h4>{`Date: ${formatDate(log.date)}`}</h4>
                <p>{`Weight: ${log.weight}`}</p>
                <p>{`Growth: ${formateGrowth(log.growthRatio)}`}</p>
              </div>
            ))}
      </div>
    </Layout>
  );
}
