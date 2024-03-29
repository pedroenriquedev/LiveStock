import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api, handleError } from "../../utils/axios";
import GoBackButton from "../../components/GoBackButton";
import styles from "../../styles/PastureDetails.module.css";
import Modal from "../../components/Modal";
import MoveAnimals from "../../components/MoveAnimals";
import { formateGrowth } from "../../utils/format";
import CustomLink from "../../components/CustomLink";
import Button from "../../components/Button";
import Layout from "../../components/Layout";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BatchDetails() {
  const router = useRouter();
  const { pastureId } = router.query;
  const [pasture, setPasture] = useState("");
  const [toBeChangedArray, setToBeChangedArray] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [avgGrowth, setAvgGrowth] = useState(1);
  const [avgMonthlyGrowth, setAvgMonthlyGrowth] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getPasture = async () => {
    try {
      const res = await api.get(`/api/v1/pasture/${pastureId}`);
      setPasture(res.data.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  const getStats = async () => {
    try {
      const res = await api.post(`/api/v1/animal/stats`, {
        pastureID: pastureId,
      });
      setAvgGrowth(res.data.data.stats.generalStats[0].avgGrowth);
      setAvgMonthlyGrowth(res.data.data.stats.generalStats[0].avgMonthlyGrowth);
    } catch (error) {
      handleError(error);
    }
  };

  const fetchData = async () => {
    try {
      await getPasture();
      await getStats();
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchData();
  }, [router.isReady]);

  const handleCheckbox = (e) => {
    const animalId = e.target.value;
    const newArr = [...toBeChangedArray];
    if (e.target.checked) {
      newArr.push(animalId);
      setToBeChangedArray(newArr);
      return;
    }

    const res = newArr.filter((id) => id !== animalId);
    setToBeChangedArray(res);
  };

  const handleRemoveAnimals = async (e) => {
    if (toBeChangedArray.length < 1) return;

    const res = await api.patch(`/api/v1/pasture/removeanimals/${pastureId}`, {
      animals: toBeChangedArray,
    });

    router.reload();
  };

  const handleMoveAnimals = async () => {
    if (toBeChangedArray.length < 1) return;

    handleOpenModal();

    return;
  };

  const getGrowthClass = (animalGrowth) => {
    if (animalGrowth < avgGrowth && animalGrowth < avgGrowth * 0.8) {
      return `${styles.red}`;
    } else if (animalGrowth < avgGrowth) {
      return `${styles.yellow}`;
    } else {
      return `${styles.none}`;
    }
  };

  return (
    <Layout>
      <GoBackButton router={router} />
      <div>
        <div className={styles.details}>
          <div>
            <span>name</span>
            <p>{isLoading ? <Skeleton /> : pasture.name}</p>
          </div>

          <div>
            <span>condition</span>
            <p>{isLoading ? <Skeleton /> : pasture.condition}</p>
          </div>

          <div>
            <span>status</span>
            <p>{isLoading ? <Skeleton /> : pasture.status}</p>
          </div>

          <div>
            <span>area</span>
            <p>{isLoading ? <Skeleton /> : pasture.area}</p>
          </div>

          <div>
            <span>quantity</span>
            <p>{isLoading ? <Skeleton /> : pasture.herd.length}</p>
          </div>

          <div>
            <span>average growth</span>
            <p>
              {isLoading ? <Skeleton /> : formateGrowth(avgGrowth) || "N/A"}
            </p>
          </div>

          <div>
            <span>average monthly growth</span>
            <p>
              {isLoading ? (
                <Skeleton />
              ) : (
                formateGrowth(avgMonthlyGrowth) || "N/A"
              )}
            </p>
          </div>
        </div>

        <div>
          <h3>Herd</h3>

          <div className={styles.animalsContainer}>
            <div className={styles.animalLabels}>
              <div></div>
              <span>name</span>
              <span>color</span>
              <span>breed</span>
              <span>health</span>
              <span>weight</span>
              <span>growth</span>
            </div>
            <div className={styles.animals}>
              {isLoading &&
                Array(7)
                  .fill(0)
                  .map((item, i) => (
                    <div key={i}>
                      <Skeleton height={"100%"} />
                    </div>
                  ))}
              {!isLoading &&
                pasture.herd.map((animal) => (
                  <label
                    htmlFor={animal._id}
                    key={animal._id}
                    className={styles.label}
                  >
                    <input
                      type="checkbox"
                      value={animal._id}
                      onChange={handleCheckbox}
                      id={animal._id}
                    />
                    <p>{animal.name || "-"}</p>
                    <p>{animal.color}</p>
                    <p>{animal.breed}</p>
                    <p>{animal.health}</p>
                    <p>{animal.currentWeight}</p>
                    <p className={getGrowthClass(animal.growthRatio)}>
                      {formateGrowth(animal.growthRatio)}
                    </p>

                    <CustomLink
                      href={`/animals/${animal._id}`}
                      text={`Details`}
                    />
                  </label>
                ))}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            color={toBeChangedArray.length < 1 ? "gray" : "red"}
            onClick={handleRemoveAnimals}
          >
            Remove
          </Button>

          <Button
            color={toBeChangedArray.length < 1 ? "gray" : "yellow"}
            onClick={handleMoveAnimals}
          >
            Move
          </Button>

          <CustomLink href={"/animals"} text={"Add"} />
          {isModalOpen && (
            <Modal visible={handleOpenModal} cancel={handleCloseModal}>
              <MoveAnimals animals={toBeChangedArray} pasture={pasture} />
            </Modal>
          )}
        </div>
      </div>
    </Layout>
  );
}
