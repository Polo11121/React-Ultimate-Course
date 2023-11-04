import { useContext, createContext } from "react";
import { City } from "@/types";

type CitiesContextValue = {
  cities: City[] | null;
  isLoading: boolean;
  currentCity: City | null;
  getCity: (id: string) => void;
  addCity: (city: City) => void;
  removeCity: (id: number) => void;
};

export const CitiesContext = createContext<CitiesContextValue>({
  cities: [],
  isLoading: true,
  currentCity: null,
  getCity: () => {},
  addCity: () => {},
  removeCity: () => {},
});

export const useCitiesContext = () => {
  const context = useContext(CitiesContext);

  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }

  return context;
};
