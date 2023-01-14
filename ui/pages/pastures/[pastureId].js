import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api, handleError } from "../../utils/axios";
import GoBackButton from "../../components/GoBackButton";
import Link from "next/link";
import styles from "../../styles/PastureDetails.module.css";
import Modal from "../../components/Modal";
import MoveAnimals from "../../components/MoveAnimals";

export default function BatchDetails() {
  const router = useRouter();
  const { pastureId } = router.query;
  const [pasture, setPasture] = useState("");
  const [toBeChangedArray, setToBeChangedArray] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

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

  useEffect(() => {
    if (!router.isReady) return;
    getPasture();
    console.log(pasture);
  }, [router.isReady]);

  const handleCheckbox = (e) => {
    const animalId = e.target.value;
    const newArr = [...toBeChangedArray];
    if (e.target.checked) {
      //console.log("add animal to change list");
      newArr.push(animalId);
      setToBeChangedArray(newArr);
      return;
    }
    //console.log("remove animal from change list");
    const res = newArr.filter((id) => id !== animalId);
    setToBeChangedArray(res);
  };

  const handleRemoveAnimals = async (e) => {
    if (toBeChangedArray.length < 1) return;

    const res = await api.patch(`/api/v1/pasture/removeanimals/${pastureId}`, {
      animals: toBeChangedArray,
    });

    console.log(res.data);

    router.reload();
  };

  const handleMoveAnimals = async () => {
    if (toBeChangedArray.length < 1) return;

    handleOpenModal();

    return;
  };

  return (
    <div>
      <GoBackButton router={router} />
      {pasture.herd && (
        <div>
          <div className={styles.details}>
            <div>
              <span>name</span>
              <p>{pasture.name}</p>
            </div>

            <div>
              <span>condition</span>
              <p>{pasture.condition}</p>
            </div>

            <div>
              <span>status</span>
              <p>{pasture.status}</p>
            </div>

            <div>
              <span>area</span>
              <p>{pasture.area}</p>
            </div>

            <div>
              <span>quantity</span>
              <p>{pasture.herd && pasture.herd.length}</p>
            </div>
          </div>

          <div>
            <h3>Herd</h3>
            <div>
              <span>name</span>
              <span>color</span>
              <span>breed</span>
              <span>health</span>
              <span>weight</span>
              <span>growth</span>
            </div>
            {pasture.herd.map((animal) => (
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
                <p>{animal.growthRatio || "N/A"}</p>
                <Link href={`/animals/${animal._id}`}>
                  <a>Details</a>
                </Link>
              </label>
            ))}
          </div>

          <div>
            {/* remove from, move from this to another, add animals */}
            {/* only update this pasture with animals + update animals reference to pasture:null */}
            <button onClick={handleRemoveAnimals}>Remove</button>
            {/* only update this pasture with animals + update animals reference to pasture + update other pasture */}
            <button onClick={handleMoveAnimals}>Move</button>
            {/* two different requests, add animals to this pastures for animals not referenced with a pasture, and movetopasture for animals already on a pasture update this pasture with animals + update animals reference to pasture, could be a link to animals page to make things simplier, then default pasture on page load */}
            <Link href={`/animals/`}>Add</Link>
            {isModalOpen && (
              <Modal visible={handleOpenModal} cancel={handleCloseModal}>
                <MoveAnimals animals={toBeChangedArray} pasture={pasture} />
              </Modal>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
