import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api, handleError } from "../../utils/axios";
import GoBackButton from "../../components/GoBackButton";
import { formatDate, formateGrowth, formatePrice } from "../../utils/format";
import styles from "../../styles/BatchDetails.module.css";
import Link from "next/link";
import Layout from "../../components/Layout";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BatchAnimalSkeleton from "../../components/Batches/BatchAnimalSkeleton";

export default function BatchDetails() {
  const router = useRouter();
  const { batchId } = router.query;
  const [batch, setBatch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getBatch = async () => {
    try {
      const res = await api.get(`/api/v1/batch/id/${batchId}`);
      setBatch(res.data.data.data);
      setIsLoading(false);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    getBatch();
  }, [router.isReady]);

  return (
    <Layout>
      <GoBackButton router={router} />

      <div className={styles.main}>
        <div className={styles.details}>
          <div>
            <span>date of purchase</span>
            <p>{isLoading ? <Skeleton /> : formatDate(batch.date)}</p>
          </div>

          <div>
            <span>Vendor</span>
            <p>{isLoading ? <Skeleton /> : batch.seller}</p>
          </div>

          <div>
            <span>quantity</span>
            <p>{isLoading ? <Skeleton /> : batch.cattle.length}</p>
          </div>

          <div>
            <span>total</span>
            <p>
              {isLoading ? (
                <Skeleton />
              ) : (
                `R$${formatePrice(batch.total)}` || "-"
              )}
            </p>
          </div>

          <div>
            <span>description</span>
            <p>{isLoading ? <Skeleton /> : batch.description || "-"}</p>
          </div>

          <div>
            <span>status</span>
            <p>active</p>
          </div>
        </div>

        <div className={styles.animals}>
          <h3>animals</h3>
          {isLoading && (
            <BatchAnimalSkeleton classes={styles.animalSkeleton} animals={17} />
          )}
          {!isLoading &&
            batch.cattle.map((animal) => (
              <div key={animal._id}>
                <div>
                  <span>price</span>
                  <p>{formatePrice(animal.initialPrice)}</p>
                </div>

                <div>
                  <span>rate</span>
                  <p>{animal.priceRatio}</p>
                </div>

                <div>
                  <span>weight</span>
                  <p>{animal.initialWeight}</p>
                </div>

                <div>
                  <span>growth</span>
                  <p>{formateGrowth(animal.growthRatio) || "-"}</p>
                </div>

                <div>
                  <span>breed</span>
                  <p>{animal.breed}</p>
                </div>

                <div>
                  <Link href={`/animals/${animal._id}`} passHref>
                    <a>details</a>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
