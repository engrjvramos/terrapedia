export type TCountry = {
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  area: number;
  capital: string[];
  cca3: string;
  timezones: string[];
  continents: string[];
  latlng: [number, number];
  subregion: string;
  tld: string[];
  borders: string[];
  languages: Record<string, string>;
  currencies: Record<string, TCurrency>;
};

type TCurrency = {
  symbol: string;
  name: string;
};

export type TLocationData = {
  offset: string;
  capital: string;
  country: string;
};
