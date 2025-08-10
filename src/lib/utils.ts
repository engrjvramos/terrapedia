import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TCountry } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCountries() {
  const fields = ['name', 'capital', 'area', 'population', 'flags', 'region', 'cca3'].join(',');

  const response = await fetch(`https://restcountries.com/v3.1/all?fields=${fields}`, {
    next: {
      revalidate: 86400,
    },
  });
  const countries: TCountry[] = await response.json();

  return countries;
}

export async function getCountryByCode(code: string) {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  const country: TCountry[] = await response.json();

  return country[0] || null;
}
