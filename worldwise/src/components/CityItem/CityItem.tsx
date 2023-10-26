import { City } from "@/types";
import { formatDate } from "@/lib";
import styles from "@/components/CityItem/CityItem.module.css";

type CityProps = {
  city: City;
};

export const CityItem = ({ city: { cityName, emoji, date } }: CityProps) => (
  <li className={styles.cityItem}>
    <span className={styles.emoji}>{emoji}</span>
    <span className={styles.name}>{cityName}</span>
    <time className={styles.date}>{formatDate(date)}</time>
    <button className={styles.deleteBtn}>&times;</button>
  </li>
);
