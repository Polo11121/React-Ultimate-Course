import { ChangeEvent } from "react";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export const Search = ({ value, onChange }: SearchProps) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={value}
      onChange={changeHandler}
    />
  );
};
