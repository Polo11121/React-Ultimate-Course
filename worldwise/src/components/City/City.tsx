import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "@/lib";
import { Spinner, Message, Button } from "@/components";
import styles from "@/components/City/City.module.css";
import { useCitiesContext } from "@/contexts";

export const City = () => {
  const { id } = useParams() as { id: string };
  const { currentCity, isLoading, getCity } = useCitiesContext();

  useEffect(() => {
    getCity(id);
  }, [id]);

  const navigate = useNavigate();

  if (isLoading || currentCity?.id !== Number(id)) {
    return <Spinner />;
  }

  if (!currentCity) {
    return <Message message="City not found" />;
  }

  const { cityName, emoji, date, notes } = currentCity;

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
