import { useEffect, useState } from "react";
import { env } from "@/lib";

export const useFetch = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFunction = async () => {
      try {
        const response = await fetch(`${env.VITE_API_KEY}/${endpoint}`);

        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFunction();
  }, [endpoint]);

  return {
    data,
    isLoading,
  };
};
