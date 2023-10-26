import styles from "@/components/Footer/Footer.module.css";

export const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.copyright}>
      &copy; Copyright {new Date().getFullYear()}
      by WorldWise Inc.
    </p>
  </footer>
);
