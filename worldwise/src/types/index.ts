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
export type Geolocation = {
  latitude: number;
  lookupSource: string;
  longitude: number;
  localityLanguageRequested: string;
  continent: string;
  continentCode: string;
  countryName: string;
  countryCode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  city: string;
  locality: string;
  postcode: string;
  plusCode: string;
  fips: FIPS;
  localityInfo: LocalityInfo;
};

type FIPS = {
  state: string;
  county: string;
  countySubdivision: string;
  place: string;
};

type LocalityInfo = {
  administrative: Ative[];
  informative: Ative[];
};

type Ative = {
  name: string;
  description: string;
  isoName?: string;
  order: number;
  adminLevel?: number;
  isoCode?: string;
  wikidataId?: string;
  geonameId?: number;
};
