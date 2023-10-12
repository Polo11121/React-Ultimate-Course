import { Item } from "types";

type Stats = {
  items: Item[];
};

export const Stats = ({ items }: Stats) => {
  if (!items.length) {
    return (
      <p className="stats">
        <em>👜 Start adding some items yo your packing list!</em>
      </p>
    );
  }

  const numberOfItems = items.length;
  const numberOfPackedItems = items.filter((item) => item.packed).length;
  const percentage =
    numberOfItems && Math.round((numberOfPackedItems / numberOfItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go 🎉"
          : `👜 You have ${numberOfItems} items on your list,and you already
            packed
            ${numberOfPackedItems} (${percentage}%)`}
      </em>
    </footer>
  );
};
