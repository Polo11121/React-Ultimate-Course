import { useEffect } from "react";

type UseClickKeyboardKeyProps = {
  type: string;
  callback: () => void;
};

export const useClickKeyboardKey = ({
  callback,
  type,
}: UseClickKeyboardKeyProps) => {
  useEffect(() => {
    const clickKeyboardKeyHandler = () =>
      document.addEventListener("keydown", (event) => {
        if (event.code.toLocaleLowerCase() === type.toLocaleLowerCase()) {
          callback();
        }
      });

    clickKeyboardKeyHandler();

    return () => document.removeEventListener(type, clickKeyboardKeyHandler);
  });
};
