import { ReactNode, useState } from "react";
import { useFetch } from "@/hooks";
import { City } from "@/types";
import { CitiesContext } from "@/contexts/useCitiesContext";

type CitiesProviderProps = {
  children: ReactNode;
};

export const CitiesProvider = ({ children }: CitiesProviderProps) => {
  const [currentCityId, setCurrentCityId] = useState<string | null>(null);
  const { data: currentCity, isLoading: isCityLoading } = useFetch<City>({
    endpoint: `cities/${currentCityId}`,
    enabled: Boolean(currentCityId),
  });

  const { data: cities, isLoading } = useFetch<City[]>({
    endpoint: "cities",
  });

  const getCity = (id: string) => setCurrentCityId(id);

  const value = {
    cities,
    isLoading: isLoading || isCityLoading,
    currentCity,
    getCity,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
};
