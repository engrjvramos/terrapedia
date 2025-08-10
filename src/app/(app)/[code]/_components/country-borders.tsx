'use client';

import { useCountriesContext } from '@/components/countries-provider';
import Link from 'next/link';
import { use } from 'react';

export default function CountryBorders({ borders }: { borders: string[] }) {
  const { countriesPromise } = useCountriesContext();
  const countries = use(countriesPromise);

  const borderLinks = borders.map((code) => {
    const country = countries.find((c) => c.cca3 === code);
    return {
      code,
      name: country ? country.name.common : code,
    };
  });

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <p className="text-muted-foreground font-semibold whitespace-nowrap">Border Countries:</p>
      <div className="flex w-full flex-wrap items-center gap-2">
        {borderLinks.length > 0 ? (
          borderLinks.map(({ code, name }) => (
            <Link
              key={code}
              href={`/${code}`}
              className="bg-input/50 hover:bg-input/80 inline-flex truncate rounded px-4 py-1 text-sm capitalize"
            >
              {name}
            </Link>
          ))
        ) : (
          <p className="text-muted-foreground">No border countries found.</p>
        )}
      </div>
    </div>
  );
}
