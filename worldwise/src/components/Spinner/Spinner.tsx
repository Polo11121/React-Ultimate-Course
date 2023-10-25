import styles from "@/components/Spinner/Spinner.module.css";

export const Spinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
  </div>
);
