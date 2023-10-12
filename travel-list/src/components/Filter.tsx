import { ChangeEvent } from "react";
import { SortBy } from "types";

type FilterProps = {
  sortBy: SortBy;
  onSort: (sortBy: SortBy) => void;
};

export const Filter = ({ sortBy, onSort }: FilterProps) => {
  const sortByHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onSort(event.target.value as SortBy);
  };

  return (
    <select onChange={sortByHandler} value={sortBy}>
      <option value="quantity">Sort by Quantity</option>
      <option value="description">Sort by Description</option>
      <option value="packed">Sort by packed status</option>
    </select>
  );
};
