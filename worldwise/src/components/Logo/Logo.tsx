import { Link } from "react-router-dom";
import styles from "@/components/Logo/Logo.module.css";

export const Logo = () => (
  <Link to="/">
    <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
  </Link>
);
