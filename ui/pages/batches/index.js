import { useEffect, useState } from "react";
import { api, handleError } from "../../utils/axios";
import styles from "../../styles/Batches.module.css";
import { formatePrice } from "../../utils/format";
import CustomLink from "../../components/CustomLink";
import Layout from "../../components/Layout";
import BatchSkeleton from "../../components/Batches/BatchSkeleton";

export default function Batches() {
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getBatches = async () => {
    try {
      const res = await api.get("/api/v1/batch");
      setBatches(res.data.data.data);
      setIsLoading(false);
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

      <div>
        {isLoading && (
          <BatchSkeleton classes={styles.batchSkeleton} batches={4} />
        )}
        {batches.length > 0 &&
          batches.map((batch) => (
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
    </Layout>
  );
}
