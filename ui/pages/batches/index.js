import { useEffect, useState } from "react";
import { api, handleError } from "../../utils/axios";
import styles from "../../styles/Batches.module.css";
import Link from "next/link";
import { formatePrice } from "../../utils/format";
import CustomLink from "../../components/CustomLink";
import Layout from "../../components/Layout";

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
    <Layout>
      <h2>Batches</h2>
      <CustomLink href={`/batches/create`} text={`Create a new batch`} />
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
                <h3>total</h3>
                {`R$${formatePrice(batch.total)}` || "-"}
              </div>

              <div>
                <h3>quantity</h3>
                <span>{batch.cattle.length}</span>
              </div>
              <div>
                <CustomLink href={`/batches/${batch._id}`} text={`Details`} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span>No batches</span>
      )}
    </Layout>
  );
}
