import { useState } from "react";
import { Filter, ListItem } from "components";
import { Item, SortBy } from "types";

type PackingListProps = {
  items: Item[];
  onRemoveItem: (id: number) => void;
  onTogglePackedStatus: (id: number) => void;
  onClearList: () => void;
};

export const PackingList = ({
  items,
  onRemoveItem,
  onTogglePackedStatus,
  onClearList,
}: PackingListProps) => {
  const [sortBy, setSortBy] = useState<SortBy>("quantity");

  const sortByHandler = (sortBy: SortBy) => setSortBy(sortBy);

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "quantity") {
      return a.quantity - b.quantity;
    }
    if (sortBy === "description") {
      return a.description.localeCompare(b.description);
    }
    return Number(a.packed) - Number(b.packed);
  });

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <ListItem
            {...item}
            key={item.id}
            onRemove={onRemoveItem}
            onTogglePackedStatus={onTogglePackedStatus}
          />
        ))}
      </ul>
      <div className="actions">
        <Filter sortBy={sortBy} onSort={sortByHandler} />
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
};
