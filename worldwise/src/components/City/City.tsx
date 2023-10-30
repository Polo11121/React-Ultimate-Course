import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "@/lib";
import { useFetch } from "@/hooks";
import { Spinner, Message, Button } from "@/components";
import { City as CityType } from "@/types";
import styles from "@/components/City/City.module.css";

export const City = () => {
  const { id } = useParams();
  const { data: city, isLoading } = useFetch<CityType>(`cities/${id}`);
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  if (!city) {
    return <Message message="City not found" />;
  }

  const { cityName, emoji, date, notes } = city;

  const goBackHandler = () => navigate(-1);

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <Button styleType="back" onClick={goBackHandler}>
          Back
        </Button>
      </div>
    </div>
  );
};
