import { useEffect, useState } from "react";
import { env } from "@/lib";

type UseFetchProps = {
  endpoint: string;
  enabled?: boolean;
};

export const useFetch = <T>({ endpoint, enabled = true }: UseFetchProps) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFunction = async () => {
      setIsLoading(true);
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

    if (enabled) {
      fetchFunction();
    }
  }, [endpoint, enabled]);

  return {
    data,
    isLoading,
  };
};
