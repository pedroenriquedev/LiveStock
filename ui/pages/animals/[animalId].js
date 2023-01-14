import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api, handleError } from "../../utils/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/AnimalDetails.module.css";
import { formatDate, formateGrowth, formatePrice } from "../../utils/format";
import Link from "next/link";
import GoBackButton from "../../components/GoBackButton";

export default function AnimalDetails() {
  const router = useRouter();
  const { animalId } = router.query;
  const [animal, setAnimal] = useState("");

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
    console.log(animal);
  }, [router.isReady]);

  console.log(animal.weightLog);

  return (
    <div>
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

      <div>WEIGHT LOG</div>
    </div>
  );
}
