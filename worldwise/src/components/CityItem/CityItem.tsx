import { Link } from "react-router-dom";
import { City } from "@/types";
import { formatDate } from "@/lib";
import styles from "@/components/CityItem/CityItem.module.css";

type CityProps = {
  city: City;
};

export const CityItem = ({
  city: { cityName, emoji, date, id, position },
}: CityProps) => (
  <li>
    <Link
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      className={styles.cityItem}
    >
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.name}>{cityName}</span>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </Link>
  </li>
);
