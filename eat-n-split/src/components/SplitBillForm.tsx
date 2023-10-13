import { useState } from "react";
import { Button } from "components";

type SplitBillFormProps = {
  onSplitBill: (value: number) => void;
  name: string;
};

export const SplitBillForm = ({ name, onSplitBill }: SplitBillFormProps) => {
  const [values, setValues] = useState({
    billValue: 0,
    yourExpense: 0,
    whoPays: "you",
  });

  const friendExpense = values.billValue - values.yourExpense;

  const changeValueHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prevState) => ({
      ...prevState,
      [event.target.id]:
        event.target.id === "yourExpense" &&
        Number(event.target.value) > prevState.billValue
          ? prevState.billValue
          : Number(event.target.value),
    }));

  const changeSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setValues((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.billValue || !values.yourExpense) return;

    onSplitBill(values.whoPays === "you" ? friendExpense : -values.yourExpense);
  };

  return (
    <form onSubmit={submitHandler} className="split-bill-form">
      <h2>Split a bill with {name}</h2>
      <label>Bill value</label>
      <input
        id="billValue"
        value={values.billValue}
        onChange={changeValueHandler}
        type="number"
      />
      <label>Your expense</label>
      <input
        id="yourExpense"
        type="number"
        value={values.yourExpense}
        onChange={changeValueHandler}
      />
      <label>{name}'s expense</label>
      <input id="friendExpense" disabled type="number" value={friendExpense} />
      <label>Who is paying the bill?</label>
      <select
        id="whoPays"
        value={values.whoPays}
        onChange={changeSelectHandler}
      >
        <option value="you">You</option>
        <option value="friend">{name}</option>
      </select>
      <Button type="submit">Split bill</Button>
    </form>
  );
};
