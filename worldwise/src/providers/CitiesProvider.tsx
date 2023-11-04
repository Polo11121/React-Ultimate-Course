import { ReactNode, useState } from "react";
import { useFetch } from "@/hooks";
import { City } from "@/types";
import { CitiesContext } from "@/contexts/useCitiesContext";
import { env } from "@/lib";

type CitiesProviderProps = {
  children: ReactNode;
};

export const CitiesProvider = ({ children }: CitiesProviderProps) => {
  const [currentCityId, setCurrentCityId] = useState<string | null>(null);
  const { data: currentCity, isLoading: isCityLoading } = useFetch<City>({
    endpoint: `${env.VITE_API_KEY}/cities/${currentCityId}`,
    enabled: Boolean(currentCityId),
  });

  const {
    data: cities,
    isLoading,
    setData,
  } = useFetch<City[]>({
    endpoint: `${env.VITE_API_KEY}/cities`,
  });

  const getCity = (id: string) => setCurrentCityId(id);

  const addCity = (city: City) =>
    setData((data) => (data ? [...data, city] : data));

  const removeCity = async (id: number) => {
    const currentCity = cities?.find((city) => city.id === id);
    const currentCityIndex = cities?.indexOf(currentCity as City);

    try {
      setData((data) => (data ? data?.filter((city) => city.id !== id) : data));
      const response = await fetch(`${env.VITE_API_KEY}/cities/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Cannot delete city.");
      }
    } catch (error) {
      if (currentCity && currentCityIndex !== undefined) {
        setData((data) =>
          data ? data.splice(currentCityIndex, 0, currentCity) : data
        );
      }
      let message = "Unknown Error";

      if (error instanceof Error) {
        message = error.message;
      }

      console.error(message);
    }
  };

  const value = {
    cities,
    isLoading: isLoading || isCityLoading,
    currentCity,
    getCity,
    addCity,
    removeCity,
  };

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
};
