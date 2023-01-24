import { useEffect, useState } from "react";
import Animal from "../../components/Animal";
import { api, handleError } from "../../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import MoveAnimals from "../../components/MoveAnimals";
import Modal from "../../components/Modal";
import styles from "../../styles/Animals.module.css";
import Button from "../../components/Button";

export default function Home() {
  const [animals, setAnimals] = useState([]);
  const [pastures, setPastures] = useState([]);
  const [batches, setBatches] = useState([]);
  const [pastCheckedState, setPastCheckedState] = useState("");
  const [batchesCheckedState, setBatchesCheckedState] = useState("");
  const [currentParams, setCurrentParams] = useState({});

  const [toBeChangedArray, setToBeChangedArray] = useState([]);
  const [canAddToPasture, setCanAddToPasture] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [sortOptions, setSortOptions] = useState([
    "-currentWeight",
    "-dateOfPurchase",
    "-growthRatio",
  ]);

  const getAnimals = async (params) => {
    try {
      if (!params) {
        const res = await api.get(`/api/v1/animal`);
        setAnimals(res.data.data.data);
        setCurrentParams(params);
      } else {
        const res = await api.get(`/api/v1/animal`, {
          params,
        });

        setAnimals(res.data.data.data);
        setCurrentParams(params);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const getSortedAnimals = async (sortValue, position) => {
    const params = { ...currentParams };
    params.sort = sortValue;

    const updatedSortState = sortOptions.map((item, index) => {
      if (index === position) {
        if (item.includes("-")) {
          return item.replace("-", "");
        } else {
          return `-${item}`;
        }
      } else {
        return item;
      }
    });

    setSortOptions(updatedSortState);

    try {
      const res = await api.get(`/api/v1/animal`, {
        params,
      });
      setAnimals(res.data.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  const getBatchesAndPastures = async () => {
    try {
      const res1 = await api.get(`/api/v1/batch?fields=seller`);
      const res2 = await api.get(`/api/v1/pasture?fields=name`);
      const pastures = res2.data.data.data;
      const batches = res1.data.data.data;
      pastures.push({ name: "Not in pasture", _id: "null" });
      batches.push({ seller: "Not in batch", _id: "null" });
      setBatches(batches);
      setPastures(pastures);
      setPastCheckedState(new Array(pastures.length).fill(false));
      setBatchesCheckedState(new Array(batches.length).fill(false));
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getAnimals();
    getBatchesAndPastures();
  }, []);

  const handlePastCheckbox = (position, value) => {
    if (value !== "null") {
      const updatedCheckState = pastCheckedState.map((item, index) =>
        index === position ? !item : item
      );

      updatedCheckState[updatedCheckState.length - 1] = false;
      setPastCheckedState(updatedCheckState);
    } else {
      const updatedCheckState = pastCheckedState.map((item, index) =>
        index === position ? !item : false
      );

      setPastCheckedState(updatedCheckState);
    }
  };

  const handleBatchesCheckbox = (position, value) => {
    if (value !== "null") {
      const updatedCheckState = batchesCheckedState.map((item, index) =>
        index === position ? !item : item
      );

      updatedCheckState[updatedCheckState.length - 1] = false;

      setBatchesCheckedState(updatedCheckState);
    } else {
      const updatedCheckState = batchesCheckedState.map((item, index) =>
        index === position ? !item : false
      );

      setBatchesCheckedState(updatedCheckState);
    }
  };

  const handleApplyFilter = () => {
    const selectedPastures = pastures
      .filter((item, index) => {
        if (pastCheckedState[index]) return item._id;
      })
      .map((item) => item._id);

    const selectedBatches = batches
      .filter((item, index) => {
        if (batchesCheckedState[index]) return item._id;
      })
      .map((item) => item._id);

    if (selectedBatches.length < 1 && selectedPastures.length < 1) return;

    setToBeChangedArray([]);

    const variable = batchesCheckedState.find((el) => el === true);

    if (
      pastCheckedState.at(-1) &&
      (variable === undefined || variable.length === 0)
    ) {
      setCanAddToPasture(true);
    } else {
      setCanAddToPasture(false);
      setIsEditing(false);
    }

    if (selectedBatches.length > 0 && selectedPastures.length > 0) {
      const paramObj = {
        pasture: selectedPastures[0] === "null" ? "null" : selectedPastures,
        batch: selectedBatches[0] === "null" ? "null" : selectedBatches,
        inclusive: true,
      };

      getAnimals(paramObj);
    } else if (selectedPastures.length > 0 && selectedBatches.length < 1) {
      const paramObj = {
        pasture: selectedPastures[0] === "null" ? "null" : selectedPastures,
      };

      getAnimals(paramObj);
    } else if (selectedPastures.length < 1 && selectedBatches.length > 0) {
      const paramObj = {
        batch: selectedBatches[0] === "null" ? "null" : selectedBatches,
      };

      getAnimals(paramObj);
    }
  };

  const manageToBeChangedArr = (animalId, isChecked) => {
    const newArr = [...toBeChangedArray];

    if (isChecked) {
      newArr.push(animalId);
      setToBeChangedArray(newArr);
      return;
    }

    setToBeChangedArray(newArr.filter((id) => id !== animalId));
  };

  const handleAddToPasture = () => {
    handleOpenModal();
  };

  return (
    <div>
      <h2>Animals</h2>
      <div>
        <h3>Filter by</h3>
        <div className={styles.filtersContainer}>
          <div>
            <h4>Pastures</h4>
            {pastures.map((pasture, index) => (
              <label htmlFor={pasture._id} key={pasture._id}>
                <input
                  id={pasture._id}
                  value={pasture._id}
                  name="pasture"
                  type="checkbox"
                  checked={pastCheckedState[index]}
                  onChange={(e) => {
                    handlePastCheckbox(index, e.target.value);
                  }}
                />
                {pasture.name}
              </label>
            ))}
          </div>

          <div>
            <h4>Batches</h4>
            {batches.map((batch, index) => (
              <label
                htmlFor={batch._id === "null" ? "batch_null" : batch._id}
                key={batch._id}
              >
                <input
                  id={batch._id === "null" ? "batch_null" : batch._id}
                  value={batch._id}
                  name="batch"
                  type="checkbox"
                  checked={batchesCheckedState[index]}
                  onChange={(e) => handleBatchesCheckbox(index, e.target.value)}
                />
                {batch.seller}
              </label>
            ))}
          </div>
          <Button onClick={handleApplyFilter}>Apply</Button>
        </div>

        <h3>Sort by</h3>
        {/* // sort by currentWeight, date of purchase, health, growth */}
        {sortOptions.map((option, index) => (
          <button
            className={styles.sortButton}
            value={option}
            key={index}
            onClick={(e) => {
              getSortedAnimals(e.target.value, index);
            }}
          >
            {option.includes("-") ? (
              <FontAwesomeIcon icon={faArrowUp} />
            ) : (
              <FontAwesomeIcon icon={faArrowDown} />
            )}
            {option.includes("current") && "weight"}
            {option.includes("date") && "date of purchase"}
            {option.includes("growth") && "growth"}
          </button>
        ))}
      </div>

      <div className={styles.animals}>
        {animals.map((animal) => (
          <Animal
            animal={animal}
            key={animal._id}
            showCheckbox={isEditing}
            manageToBeChangedArr={manageToBeChangedArr}
          />
        ))}
      </div>

      <div className={styles.actions}>
        {isEditing && (
          <div>
            <Button color="red" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddToPasture}
              color={toBeChangedArray.length > 0 ? "yellow" : "gray"}
            >
              Move to pasture
            </Button>
          </div>
        )}
        {!isEditing && canAddToPasture && (
          <div>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal visible={handleOpenModal} cancel={handleCloseModal}>
          <MoveAnimals animals={toBeChangedArray} />
        </Modal>
      )}
    </div>
  );
}
