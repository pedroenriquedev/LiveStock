import styles from "../styles/404page.module.css";
import Layout from "../components/Layout";
export default function Custom404() {
  return (
    <Layout>
      <div className={styles.container}>
        <div>
          <h2>Oops...</h2>
          <p>We're still working on this feature. Come back in the future!</p>
        </div>
      </div>
    </Layout>
  );
}
