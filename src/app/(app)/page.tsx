'use client';

import CountriesPagination from '@/components/countries-pagination';
import { useCountriesContext } from '@/components/countries-provider';
import RegionSelect from '@/components/region-select';
import SearchInput from '@/components/search-input';
import { useCountries } from '@/hooks/useCountries';

import SortSelect from '@/components/sort-select';
import { useWindowSize } from '@/hooks/useWindowSize';
import { use } from 'react';
import CountryCard from './_components/country-card';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export default function Home() {
  const { countriesPromise } = useCountriesContext();
  const countries = use(countriesPromise);
  const size = useWindowSize();

  const { paginatedData, totalItems, pageSize } = useCountries(countries);

  const noResults = paginatedData.length === 0;

  return (
    <div className="flex flex-col gap-12">
      <div className={cn('flex flex-col gap-5 md:flex-row md:justify-between md:gap-5', size.width)}>
        <SearchInput />

        <div className={cn('grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-2 md:flex md:items-center')}>
          <RegionSelect countries={countries} />
          <SortSelect />
        </div>
      </div>
      <div className="mx-auto w-full max-w-xs flex-1 sm:max-w-full">
        {noResults ? (
          <p className="text-muted-foreground mt-4 italic">No countries found matching your filters.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(264px,1fr))] gap-18">
            {paginatedData.map((country) => (
              <motion.div
                key={country.cca3}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <CountryCard country={country} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {!noResults && <CountriesPagination totalItems={totalItems} itemsPerPage={pageSize} />}
    </div>
  );
}
