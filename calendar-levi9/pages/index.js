import App from "../src/components/App";
import styles from "../styles/globals.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.background}>
        <h1 className={styles.planer}> Planer</h1>
        <App></App>
      </div>
    </>
  );
}
