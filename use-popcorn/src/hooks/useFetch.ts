import { useState, useEffect } from "react";

type UseFetchProps = {
  url: string;
  path?: string;
  query?: Record<string, string>;
  enabled?: boolean;
};

export const useFetch = <T>({ url, path, enabled = true }: UseFetchProps) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          signal: controller.signal,
        });

        const data = await response.json();
        if (path) {
          setData(data[path] || null);
        } else {
          setData(data || null);
        }
      } catch (error: any) {
        if (error.name === "AbortError") return;

        console.error(error);
        setError(error.message);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (enabled) {
      fetchData();
    }

    return () => controller.abort();
  }, [enabled, path, url]);

  return { data, isLoading, error };
};
