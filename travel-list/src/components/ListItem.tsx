import { Item } from "types";

type ItemProps = {
  onTogglePackedStatus: (id: number) => void;
  onRemove: (id: number) => void;
} & Item;

export const ListItem = ({
  id,
  description,
  packed,
  quantity,
  onRemove,
  onTogglePackedStatus,
}: ItemProps) => {
  const removeItemHandler = () => onRemove(id);
  const togglePackedStatusHandler = () => onTogglePackedStatus(id);

  return (
    <li>
      <input
        type="checkbox"
        checked={packed}
        onChange={togglePackedStatusHandler}
      />
      <span
        style={
          packed
            ? {
                textDecoration: "line-through",
              }
            : {}
        }
      >
        {quantity} {description}
      </span>
      <button onClick={removeItemHandler}>❌</button>
    </li>
  );
};
