import { CountryItem, Message, Spinner } from "@/components";
import { City } from "@/types";
import styles from "@/components/CountryList/CountryList.module.css";

type CountryListProps = {
  cities: City[] | null;
  isLoading: boolean;
};

export const CountryList = ({ cities, isLoading }: CountryListProps) => {
  if (isLoading) {
    return <Spinner />;
  }

  const countries = cities?.reduce(
    (arr, city) =>
      !arr.map((item) => item.country).includes(city.country)
        ? [...arr, city]
        : arr,
    [] as City[]
  );

  if (!countries || !countries.length) {
    return <Message message="No countries found" />;
  }

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};
