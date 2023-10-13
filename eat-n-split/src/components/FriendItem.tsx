import { Friend } from "types";
import { Button } from "components";

type FriendProps = {
  onSelect: (friend: Friend) => void;
  isSelected: boolean;
} & Friend;

export const FriendItem = ({
  onSelect,
  id,
  name,
  image,
  balance,
  isSelected,
}: FriendProps) => {
  const selectHandler = () => onSelect({ id, name, image, balance });

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 && <p className="red">You owe ${Math.abs(balance)}</p>}
      {balance > 0 && <p className="green">Owes you ${Math.abs(balance)}</p>}
      {balance === 0 && <p className="gray">All settled up!</p>}
      <Button onClick={selectHandler}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
};
