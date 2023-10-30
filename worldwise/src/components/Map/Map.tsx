import { useNavigate } from "react-router-dom";
import styles from "@/components/Map/Map.module.css";

export const Map = () => {
  const navigate = useNavigate();

  const navigationHandler = () => navigate("/app/form");

  return (
    <div onClick={navigationHandler} className={styles.mapContainer}></div>
  );
};
