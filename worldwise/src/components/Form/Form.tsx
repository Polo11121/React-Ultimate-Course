import { useNavigate } from "react-router-dom";
import { Button, Message, Spinner } from "@/components";
import { useForm } from "@/components/Form/hooks";
import DatePicker from "react-datepicker";
import styles from "@/components/Form/Form.module.css";

export const Form = () => {
  const {
    cityName,
    date,
    notes,
    emoji,
    isLoading,
    error,
    selectDateHandler,
    changeCityNameHandler,
    changeNotesHandler,
    submitHandler,
    isAddCityLoading,
  } = useForm();
  const navigate = useNavigate();

  const goBackHandler = () => navigate(-1);

  if (isLoading) {
    return (
      <div className={styles.form}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.form}>
        <Message message={error} />
      </div>
    );
  }

  return (
    <form
      className={`${styles.form}${
        isAddCityLoading ? " " + styles.loading : ""
      }`}
      onSubmit={submitHandler}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={changeCityNameHandler}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>
      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          autoComplete="off"
          onKeyDown={(event) => {
            event.preventDefault();
          }}
          popperPlacement="bottom"
          id="date"
          dateFormat="dd/MM/yyyy"
          onChange={selectDateHandler}
          selected={date}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={changeNotesHandler} value={notes} />
      </div>
      <div className={styles.buttons}>
        <Button
          styleType="primary"
          type="submit"
          disabled={isAddCityLoading}
          isLoading={isAddCityLoading}
        >
          Add
        </Button>
        <Button styleType="back" onClick={goBackHandler}>
          Back
        </Button>
      </div>
    </form>
  );
};
