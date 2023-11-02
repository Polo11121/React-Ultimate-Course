import { CityItem, Message, Spinner } from "@/components";
import { useCitiesContext } from "@/contexts";
import styles from "@/components/CityList/CityList.module.css";

export const CityList = () => {
  const { cities, isLoading } = useCitiesContext();

  if (isLoading) {
    return <Spinner />;
  }

  if (!cities || !cities.length) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};
