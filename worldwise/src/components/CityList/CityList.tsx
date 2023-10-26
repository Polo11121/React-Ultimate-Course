import { CityItem, Message, Spinner } from "@/components";
import { City } from "@/types";
import styles from "@/components/CityList/CityList.module.css";

type CityListProps = {
  cities: City[];
  isLoading: boolean;
};

export const CityList = ({ cities, isLoading }: CityListProps) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
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
