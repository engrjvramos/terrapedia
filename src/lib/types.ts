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
};
