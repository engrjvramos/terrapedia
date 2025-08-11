'use client';

import { useCountriesContext } from '@/components/countries-provider';
import { motion } from 'motion/react';
import Image from 'next/image';
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
      flag: {
        svg: country ? country.flags.svg : null,
        alt: country ? country.flags.alt : null,
      },
    };
  });

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <p className="text-muted-foreground font-semibold whitespace-nowrap">Border Countries:</p>
      <motion.ul
        className="flex w-full flex-wrap items-center gap-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.3 },
          },
        }}
      >
        {borderLinks.length > 0 ? (
          borderLinks.map(({ code, name, flag }, index) => (
            <motion.li
              key={code}
              className="text-muted-foreground text-pretty capitalize"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            >
              <Link
                href={`/${code}`}
                className="bg-input/50 hover:bg-input/80 inline-flex items-center gap-2 truncate rounded px-4 py-1 text-sm capitalize"
              >
                {flag.svg && (
                  <Image
                    src={flag.svg}
                    alt={flag.alt || `Flag of ${name}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="size-5 object-contain"
                  />
                )}
                {name}
              </Link>
            </motion.li>
          ))
        ) : (
          <p className="text-muted-foreground">No border countries found.</p>
        )}
      </motion.ul>
    </div>
  );
}
