'use client';

import CountriesPagination from '@/components/countries-pagination';
import { useCountriesContext } from '@/components/countries-provider';
import RegionSelect from '@/components/region-select';
import SearchInput from '@/components/search-input';
import { useCountries } from '@/hooks/useCountries';

import PageSizeSelect from '@/components/page-size-select';
import SortSelect from '@/components/sort-select';
import { useWindowSize } from '@/hooks/useWindowSize';
import { use } from 'react';
import CountryCard from './_components/country-card';

import { motion } from 'motion/react';

export default function Home() {
  const { countriesPromise } = useCountriesContext();
  const countries = use(countriesPromise);
  const size = useWindowSize();

  const { paginatedData, totalItems, pageSize } = useCountries(countries);

  const noResults = paginatedData.length === 0;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:gap-10">
        <SearchInput />
        {size.width < 360 && <RegionSelect countries={countries} className="max-w-full" />}
        <div className="flex w-full items-center gap-2 sm:justify-end">
          {size.width >= 360 && <RegionSelect countries={countries} />}
          <SortSelect />
          <PageSizeSelect />
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
