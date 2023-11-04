import styles from "@/components/Spinner/Spinner.module.css";

type SpinnerProps = {
  small?: boolean;
};
export const Spinner = ({ small = false }: SpinnerProps) => (
  <div className={styles.spinnerContainer}>
    <div
      className={`${styles.spinner}${small ? " " + styles.spinnerSmall : ""}`}
    />
  </div>
);
