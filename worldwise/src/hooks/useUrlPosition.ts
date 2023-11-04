import { useSearchParams } from "react-router-dom";

export const useUrlPosition = () => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { lat, lng } = Object.fromEntries(params.entries());

  return { lat, lng };
};
