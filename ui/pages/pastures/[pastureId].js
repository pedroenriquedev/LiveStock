import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api, handleError } from "../../utils/axios";
import GoBackButton from "../../components/GoBackButton";
import Link from "next/link";

export default function BatchDetails() {
  const router = useRouter();
  const { pastureId } = router.query;
  const [pasture, setPasture] = useState("");

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
              <div key={animal._id}>
                <p>{animal.name || "-"}</p>
                <p>{animal.color}</p>
                <p>{animal.breed}</p>
                <p>{animal.health}</p>
                <p>{animal.currentWeight}</p>
                <p>{animal.growthRatio || "N/A"}</p>
                <Link href={`/animals/${animal._id}`}>
                  <a>Details</a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
