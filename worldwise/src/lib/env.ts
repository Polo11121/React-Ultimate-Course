import { cleanEnv, str } from "envalid";

export const env = cleanEnv(import.meta.env, {
  VITE_API_KEY: str(),
  VITE_GEOLOCATION_API_KEY: str(),
});
