import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api, handleError } from "../../utils/axios";
import GoBackButton from "../../components/GoBackButton";
import Link from "next/link";

export default function BatchDetails() {
  const router = useRouter();
  const { pastureId } = router.query;
  const [pasture, setPasture] = useState("");
  const [toBeChangedArray, SetToBeChangedArray] = useState([]);

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
      SetToBeChangedArray(newArr);
      return;
    }
    //console.log("remove animal from change list");
    const res = newArr.filter((id) => id !== animalId);
    SetToBeChangedArray(res);
  };

  // make request to update pasture with animals in the body request
  // in the back end, must update current and chosen pasture
  // option to select all animals

  console.log(toBeChangedArray);

  return (
    <div>
      <GoBackButton router={router} />
      {pasture.herd && (
        <div>
          <div>
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
            <div>
              <span>name</span>
              <span>color</span>
              <span>breed</span>
              <span>health</span>
              <span>weight</span>
              <span>growth</span>
            </div>
            {pasture.herd.map((animal) => (
              <label htmlFor={animal._id} key={animal._id}>
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
        </div>
      )}
    </div>
  );
}
