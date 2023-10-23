import { ChangeEvent, useRef } from "react";
import { useClickKeyboardKey } from "hooks";

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export const Search = ({ value, onChange }: SearchProps) => {
  const ref = useRef<HTMLInputElement>(null);
  useClickKeyboardKey({
    type: "enter",
    callback: () => {
      ref.current?.focus();
      ref.current?.select();
    },
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <input
      ref={ref}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={value}
      onChange={changeHandler}
    />
  );
};
