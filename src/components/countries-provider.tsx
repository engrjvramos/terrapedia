'use client';

import { TCountry } from '@/lib/types';
import { createContext, ReactNode, useContext } from 'react';

type CountryContextType = {
  countriesPromise: Promise<TCountry[]>;
};

const CountriesContext = createContext<CountryContextType | null>(null);

export function useCountriesContext() {
  const context = useContext(CountriesContext);
  if (!context) throw new Error('useCountriesContext must be used within a CountriesContextProvider');
  return context;
}

export function CountriesProvider({
  children,
  countriesPromise,
}: {
  children: ReactNode;
  countriesPromise: Promise<TCountry[]>;
}) {
  return (
    <CountriesContext.Provider value={{ countriesPromise: countriesPromise }}>{children}</CountriesContext.Provider>
  );
}
