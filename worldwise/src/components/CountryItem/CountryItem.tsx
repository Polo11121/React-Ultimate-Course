import styles from "@/components/CountryItem/CountryItem.module.css";

type CountryItemProps = {
  country: {
    emoji: string;
    country: string;
  };
};

export const CountryItem = ({ country }: CountryItemProps) => (
  <li className={styles.countryItem}>
    <span>{country.emoji}</span>
    <span>{country.country}</span>
  </li>
);
