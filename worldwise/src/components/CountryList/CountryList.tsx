import { CountryItem, Message, Spinner } from "@/components";
import { City } from "@/types";
import { useCitiesContext } from "@/contexts";
import styles from "@/components/CountryList/CountryList.module.css";

export const CountryList = () => {
  const { cities, isLoading } = useCitiesContext();

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
