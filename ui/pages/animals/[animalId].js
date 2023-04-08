import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api, handleError } from "../../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/AnimalDetails.module.css";
import { formatDate, formateGrowth, formatePrice } from "../../utils/format";
import Link from "next/link";
import GoBackButton from "../../components/GoBackButton";
import Modal from "../../components/Modal";
import AddWeightLog from "../../components/AddWeightLog";
import LineChart from "../../components/LineChart";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AnimalDetails() {
  const router = useRouter();
  const { animalId } = router.query;
  const [animal, setAnimal] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
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
          <p>{isLoading ? <Skeleton /> : animal.name}</p>
        </div>

        <div>
          <span>color</span>
          <p>{isLoading ? <Skeleton /> : animal.color}</p>
        </div>

        <div>
          <span>date of purchase</span>
          <p> {isLoading ? <Skeleton /> : formatDate(animal.dateOfPurchase)}</p>
        </div>

        <div>
          <span>health</span>
          <p>{isLoading ? <Skeleton /> : animal.health}</p>
        </div>

        <div>
          <span>breed</span>
          <p>{isLoading ? <Skeleton /> : animal.breed}</p>
        </div>

        <div>
          <span>initial weight</span>
          <p>{!isLoading ? `${animal.initialWeight}kg` : <Skeleton />}</p>
        </div>

        <div>
          <span>rate</span>
          <p>{!isLoading ? `R$${animal.priceRatio}` : <Skeleton />}</p>
        </div>

        <div>
          <span>initial price</span>
          <p>
            {isLoading ? (
              <Skeleton />
            ) : (
              `R$${formatePrice(animal.initialPrice)}`
            )}
          </p>
        </div>

        <div>
          <span>current weight</span>
          <p>
            {animal.currentWeight ? `${animal.currentWeight}kg` : <Skeleton />}
          </p>
        </div>

        <div>
          <span>growth</span>
          <p>{!isLoading ? formateGrowth(animal.growthRatio) : <Skeleton />}</p>
        </div>

        <div>
          <span>avg monthly growth</span>
          <p>
            {!isLoading ? (
              formateGrowth(animal.averageMonthlyGrowth)
            ) : (
              <Skeleton />
            )}
          </p>
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
          <p>{isLoading ? <Skeleton /> : animal.pasture || "N/A"}</p>
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
          <p>{isLoading ? <Skeleton /> : animal.batch || "N/A"}</p>
        </div>

        <div>
          <span>notes</span>
          <p>{animal.description || "N/A"}</p>
        </div>
      </div>

      {isLoading ? (
        <Skeleton height={250} />
      ) : (
        <LineChart weightLog={animal.weightLog} />
      )}

      <div className={styles.action}>
        <Button onClick={handleOpenModal}>Add Weight Log</Button>
      </div>

      {isModalOpen && (
        <Modal visible={handleOpenModal} cancel={handleCloseModal}>
          <AddWeightLog animal={animal} fireCloseModal={handleCloseModal} />
        </Modal>
      )}
      <div className={styles.weightLogContainer}>
        {isLoading && (
          <>
            <Skeleton height={80} />
            <Skeleton height={80} />
            <Skeleton height={80} />
          </>
        )}
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
