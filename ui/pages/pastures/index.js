import { useEffect, useState } from "react";
import { api, handleError } from "../../utils/axios";
import styles from "../../styles/Batches.module.css";
import Link from "next/link";
import { formatePrice } from "../../utils/format";

export default function Pasture() {
  const [pastures, setPastures] = useState([]);

  const getPastures = async () => {
    try {
      const res = await api.get("/api/v1/pasture");
      setPastures(res.data.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getPastures();
  }, []);

  return (
    <div>
      <h2>Pastures</h2>
      <button>Add Pasture</button>
      {pastures.length > 0 ? (
        <div>
          {pastures.map((pasture) => (
            <div key={pasture._id}>
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
                <span>quantity</span>
                <p>{pasture.herd && pasture.herd.length}</p>
              </div>

              <div>
                <Link href={`/pastures/${pasture._id}`} passHref>
                  <a>details</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span>No pastures</span>
      )}
    </div>
  );
}
