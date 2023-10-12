import { FormEvent, useState, ChangeEvent } from "react";
import { Item } from "types";

type FormProps = {
  onAddItem: (item: Item) => void;
};

export const Form = ({ onAddItem }: FormProps) => {
  const [values, setValues] = useState({ description: "", quantity: 1 });

  const selectOptions = Array.from({ length: 20 });

  const changeQuantityHandler = (event: ChangeEvent<HTMLSelectElement>) =>
    setValues((prevValues) => ({
      ...prevValues,
      quantity: Number(event.target.value),
    }));

  const changeDescriptionHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setValues((prevValues) => ({
      ...prevValues,
      description: event.target.value,
    }));

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.description) return;

    const newItem = {
      ...values,
      packed: false,
      id: Date.now(),
    };

    onAddItem(newItem);
    setValues({ description: "", quantity: 0 });
  };

  return (
    <form onSubmit={submitHandler} className="add-form">
      <h3>What do you need for your 😍 trip?</h3>
      <select value={values.quantity} onChange={changeQuantityHandler}>
        {selectOptions.map((_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <input
        value={values.description}
        onChange={changeDescriptionHandler}
        type="text"
        placeholder="Item..."
      />
      <button type="submit">Add</button>
    </form>
  );
};
