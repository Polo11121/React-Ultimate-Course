export type Country = {
  emoji: string;
  country: string;
};

export type City = {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: Position;
  id: number;
};

export type Position = {
  lat: number;
  lng: number;
};
