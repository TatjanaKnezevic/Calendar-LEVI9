import App from "../src/components/App";
import styles from "../styles/globals.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.background}>
        <App></App>
      </div>
    </>
  );
}
