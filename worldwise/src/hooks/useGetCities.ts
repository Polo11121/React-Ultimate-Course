import { useEffect, useState } from "react";
import { City } from "@/types";
import { env } from "@/lib";

export const useGetCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${env.VITE_API_KEY}/cities`);

        if (response.ok) {
          const data = await response.json();
          setCities(data);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  return {
    cities,
    isLoading,
  };
};
