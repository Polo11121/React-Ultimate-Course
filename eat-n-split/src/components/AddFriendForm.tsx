import { useState } from "react";
import { Button } from "components";
import { Friend } from "types";

type AddFriendFormProps = {
  onAddFriend: (friend: Friend) => void;
};

export const AddFriendForm = ({ onAddFriend }: AddFriendFormProps) => {
  const [values, setValues] = useState({
    name: "",
    image: "https://i.pravatar.cc/48",
  });

  const changeValueHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.name || !values.image) return;

    onAddFriend({ ...values, id: Date.now(), balance: 0 });

    setValues({ name: "", image: "https://i.pravatar.cc/48" });
  };

  return (
    <form onSubmit={submitHandler} className="add-friend-form">
      <label>Friend name</label>
      <input
        id="name"
        value={values.name}
        onChange={changeValueHandler}
        type="text"
      />
      <label>Image URL</label>
      <input
        id="image"
        type="text"
        value={values.image}
        onChange={changeValueHandler}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};
