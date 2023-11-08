import { useAppSelector } from "hooks";

export const Customer = () => {
  const { fullName } = useAppSelector((state) => state.customer);

  return <h2>👋 Welcome, {fullName}</h2>;
};
