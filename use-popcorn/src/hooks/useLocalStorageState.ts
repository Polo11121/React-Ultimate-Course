import { useState, useEffect, SetStateAction, Dispatch } from "react";

type UseLocalStorageStateProps<T> = {
  key: string;
  initialValue: T;
};

type UseLocalStorageState<T> = [T, Dispatch<SetStateAction<T>>];

export const useLocalStorageState = <T>({
  key,
  initialValue,
}: UseLocalStorageStateProps<T>): UseLocalStorageState<T> => {
  const [localStorageState, setLocalStorageState] = useState<T>(() => {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(localStorageState)),
    [localStorageState, key]
  );

  return [localStorageState, setLocalStorageState];
};
