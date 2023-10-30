// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components";
import styles from "@/components/Form/Form.module.css";

// const convertToEmoji = (countryCode: string) => {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt(0));
//   return String.fromCodePoint(...codePoints);
// };

export const Form = () => {
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const selectDateHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setDate(event.target.value);

  const goBackHandler = () => navigate(-1);

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>
      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input id="date" onChange={selectDateHandler} value={date} />
      </div>
      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      <div className={styles.buttons}>
        <Button styleType="primary" onClick={() => {}}>
          Add
        </Button>
        <Button styleType="back" onClick={goBackHandler}>
          Back
        </Button>
      </div>
    </form>
  );
};
