import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCountries() {
  const fields = ['name', 'capital', 'area', 'population', 'flags', 'region'].join(',');

  const response = await fetch(`https://restcountries.com/v3.1/all?fields=${fields}`, {
    next: {
      revalidate: 86400,
    },
  });
  const countries = await response.json();

  return countries;
}
