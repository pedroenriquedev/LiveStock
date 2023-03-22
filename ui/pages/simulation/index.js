import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api, handleError } from "../../utils/axios";
import { formatDate } from "../../utils/format";
import SimulatedSale from "../../components/SimulatedSale";
import styles from "../../styles/Simulation.module.css";
import Button from "../../components/Button";

export default function Simulation() {
  const router = useRouter();
  const [allPastures, setAllPastures] = useState([]);
  const [allBatches, setAllBatches] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [sellingRate, setSellingRate] = useState(255);
  const [showSimulatedSale, setShowSimulatedSale] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const getPastures = async () => {
    try {
      const res = await api.get("/api/v1/pasture", {
        params: {
          fields: "name,herd",
        },
      });
      setAllPastures(res.data.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  const getBatches = async () => {
    try {
      const res = await api.get("/api/v1/batch", {
        params: {
          fields: "seller,cattle, date",
        },
      });
      setAllBatches(res.data.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  const getAnimals = async (type, typeId) => {
    try {
      const res = await api.get(`/api/v1/animal`, {
        params: {
          [type]: typeId,
        },
      });
      const resAnimals = res.data.data.data.map((animal) => ({
        ...animal,
        sellingRate: sellingRate,
      }));

      setAnimals(resAnimals);
      setShowFilters(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleAnimalRateChange = (rate, index) => {
    const animalsCopy = [...animals];

    animalsCopy[index].sellingRate = rate;

    setAnimals(animalsCopy);
  };

  const handleSimulate = (show) => {
    setShowSimulatedSale(!show);
  };

  useEffect(() => {
    if (!router.isReady) return;
    getPastures();
    getBatches();
  }, [router.isReady]);

  return (
    <div>
      <h2>Simulate a sale</h2>

      {!showSimulatedSale && (
        <div>
          {showFilters && (
            <div>
              <div className={styles.simulationRate}>
                <label htmlFor="rate">Simulation rate:</label>
                <input
                  type="number"
                  value={sellingRate}
                  onChange={(e) => setSellingRate(e.target.value)}
                  min={1}
                  max={999}
                  id="rate"
                ></input>
              </div>
              <h4>Simulate by:</h4>
              <div>
                <h4>Batches</h4>
                <div className={styles.filterElementsContainer}>
                  {allBatches.map((batch) => (
                    <button
                      key={batch._id}
                      onClick={() => getAnimals("batch", batch._id)}
                      className={styles.filterElement}
                    >
                      <h4>{batch.seller}</h4>
                      <p>{formatDate(batch.date)}</p>
                      <p>{`qty: ${batch.cattle.length}`}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4>Pastures</h4>
                <div className={styles.filterElementsContainer}>
                  {allPastures.map((pasture) => (
                    <button
                      key={pasture._id}
                      onClick={() => getAnimals("pasture", pasture._id)}
                      className={styles.filterElement}
                    >
                      <h4>{pasture.name}</h4>
                      <p>{`qty: ${pasture.herd.length}`}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className={styles.preSimulate}>
            {animals.length > 0 && (
              <>
                <Button
                  onClick={() => {
                    setShowFilters(true);
                    setAnimals([]);
                  }}
                >
                  Return
                </Button>
                <div className={styles.animalLabels}>
                  <div>
                    <span>Name</span>
                  </div>

                  <div>
                    <span>Color</span>
                  </div>

                  <div>
                    <span>Breed</span>
                  </div>

                  <div>
                    <span>Weight(kg)</span>
                  </div>

                  <div>
                    <span>Rate(R$)</span>
                  </div>
                </div>
              </>
            )}

            {animals.map((animal, i) => (
              <div key={animal._id} className={styles.animal}>
                <div>
                  <p>{animal.name || "-"}</p>
                </div>

                <div>
                  <p>{animal.color || "-"}</p>
                </div>

                <div>
                  <p>{animal.breed || "-"}</p>
                </div>

                <div>
                  <p>{animal.currentWeight}</p>
                </div>

                <div>
                  <input
                    defaultValue={sellingRate}
                    type="number"
                    id={i}
                    onChange={(e) => {
                      handleAnimalRateChange(
                        parseFloat(e.target.value),
                        e.target.id
                      );
                    }}
                  ></input>
                </div>
              </div>
            ))}
            {!showFilters && (
              <Button onClick={() => handleSimulate(showSimulatedSale)}>
                Simulate
              </Button>
            )}
          </div>
        </div>
      )}
      {showSimulatedSale && (
        <SimulatedSale
          animals={animals}
          handleShowSimulation={() => handleSimulate(showSimulatedSale)}
        />
      )}
    </div>
  );
}
