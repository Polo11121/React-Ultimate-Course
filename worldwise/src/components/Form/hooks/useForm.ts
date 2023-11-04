import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useFetch, useUrlPosition } from "@/hooks";
import { env } from "@/lib";
import { City, Geolocation } from "@/types";
import { useCitiesContext } from "@/contexts";
import { useNavigate } from "react-router-dom";

const convertToEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export const useForm = () => {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Date | null>(() => new Date());
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [isAddCityLoading, setIsAddCityLoading] = useState(false);
  const { addCity } = useCitiesContext();
  const { lat, lng } = useUrlPosition();
  const navigate = useNavigate();
  const { data, isLoading } = useFetch<Geolocation>({
    endpoint: `${env.VITE_GEOLOCATION_API_KEY}?latitude=${lat}&longitude=${lng}`,
    enabled: Boolean(lat && lng),
  });

  const emoji = convertToEmoji(country);

  useEffect(() => {
    try {
      setError("");

      if (!data) {
        throw new Error("Pick a location on the map.");
      }
      if (!data?.countryCode) {
        throw new Error(
          "That doesn't look like a valid location. Click somewhere else on the map."
        );
      }
      if (data) {
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
      }
    } catch (error) {
      let message = "Unknown Error";

      if (error instanceof Error) {
        message = error.message;
      }

      setError(message);
      console.error(message);
    }
  }, [data]);

  const selectDateHandler = (date: Date) => setDate(date);

  const changeCityNameHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setCityName(event.target.value);

  const changeNotesHandler = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setNotes(event.target.value);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cityName || !date) {
      return;
    }

    try {
      setIsAddCityLoading(true);
      const newCity = {
        cityName,
        country,
        emoji,
        date,
        notes,
        position: {
          lat,
          lng,
        },
      };

      const response = await fetch(`${env.VITE_API_KEY}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });

      if (!response.ok) {
        throw new Error("Cannot save city.");
      }

      const createdCity: City = await response.json();

      console.log(createdCity);

      addCity(createdCity);
      navigate(`/app/cities`);
    } catch (error) {
      let message = "Unknown Error";

      if (error instanceof Error) {
        message = error.message;
      }

      setError(message);
      console.error(message);
    } finally {
      setIsAddCityLoading(false);
    }
  };

  return {
    cityName,
    date,
    notes,
    emoji,
    error,
    isLoading,
    selectDateHandler,
    changeCityNameHandler,
    changeNotesHandler,
    submitHandler,
    isAddCityLoading,
  };
};
