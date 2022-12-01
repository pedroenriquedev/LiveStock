import { useEffect, useState } from "react";
import { api, handleError } from "../../utils/axios";
import styles from "../../styles/Batches.module.css";
import Link from "next/link";

export default function Batches() {
  const [batches, setBatches] = useState([]);

  const getBatches = async () => {
    try {
      const res = await api.get("/api/v1/batch");
      setBatches(res.data.data.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getBatches();
  }, []);

  const formatDate = (date) => {
    const str = new Date(date).toLocaleDateString("pt-BR");
    return str;
  };

  return (
    <div>
      <h2>Batches</h2>
      {batches.length > 0 ? (
        <div>
          {batches.map((batch) => (
            <div key={batch._id} className={styles.batch}>
              <div>
                <h3>Date</h3>
                <span>{formatDate(batch.date)}</span>
              </div>

              <div>
                <h3>vendor</h3>
                <span>{batch.seller}</span>
              </div>

              <div>
                <h3>quantity</h3>
                <span>{batch.cattle.length}</span>
              </div>
              <div>
                <Link href={`/batches/${batch._id}`} passHref>
                  <a className={styles.link}>Details</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span>No batches</span>
      )}
    </div>
  );
}
