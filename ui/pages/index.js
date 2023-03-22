import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { api, handleError } from "../utils/axios";
import styles from "../styles/Home.module.css";
import DoughnutChart from "../components/DoughnutChart";
import { formateGrowth, formatePrice } from "../utils/format";
import Layout from "../components/Layout";

export default function Home() {
  const [generalStats, setGeneralStats] = useState([]);
  const [healthStats, setHealthStats] = useState([]);
  const router = useRouter();
  const getStats = async () => {
    try {
      const res = await api.post(`/api/v1/animal/stats`);
      const { stats } = res.data.data;
      setGeneralStats({ ...stats.generalStats[0] });
      setHealthStats(stats.healthStats);
    } catch (error) {
      handleError(error);
    }
  };

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    const welcomeTypes = ["Good morning", "Good afternoon", "Good evening"];
    let welcomeText = "";

    if (hour < 12) welcomeText = welcomeTypes[0];
    else if (hour < 18) welcomeText = welcomeTypes[1];
    else welcomeText = welcomeTypes[2];

    return `${welcomeText}, User!`;
  };
  console.log(generalStats);
  useEffect(() => {
    if (!router.isReady) return;
    getStats();
  }, [router.isReady]);

  return (
    <Layout>
      <div>
        <div>
          <h1>{getGreetingMessage()}</h1>
        </div>

        <div className={styles.stats}>
          <div className={styles.general}>
            <div>
              <span>active cattle</span>
              <p>{generalStats.count}</p>
            </div>

            <div>
              <span>average weight</span>
              <p>{generalStats.avgWeight}</p>
            </div>

            <div>
              <span>invesment</span>
              <p>{`R$${formatePrice(generalStats.initialPriceSum)}`}</p>
            </div>

            <div>
              <span>average monthly growth</span>
              <p>{`${formateGrowth(generalStats.avgMonthlyGrowth)}`}</p>
            </div>
          </div>
          <div className={styles.health}>
            <h3>Health Stats</h3>
            <DoughnutChart healthStats={healthStats} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
