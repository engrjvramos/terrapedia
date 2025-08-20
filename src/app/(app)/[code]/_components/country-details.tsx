'use client';
import { Button } from '@/components/ui/button';
import { TCountry } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CountryBorders from './country-borders';
import CountryTime from './country-time';

type Props = {
  countryData: TCountry;
};

export default function CountryDetails({ countryData }: Props) {
  const router = useRouter();

  const {
    flags,
    name,
    capital = [],
    population,
    region,
    subregion,
    tld = [],
    currencies = {},
    languages = {},
    borders = [],
    timezones = [],
  } = countryData;

  const details = [
    { label: 'Official Name', value: name?.official },
    { label: 'Population', value: population?.toLocaleString() },
    { label: 'Region', value: region },
    { label: 'Sub Region', value: subregion },
    { label: 'Capital', value: capital.join(', ') },
    { label: 'Top Level Domain', value: tld.join(', ') },
    {
      label: 'Currencies',
      value: Object.values(currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(', '),
    },
    { label: 'Languages', value: Object.values(languages).join(', ') },
  ].filter(({ value }) => Boolean(value));

  return (
    <motion.article
      className="mx-auto flex max-w-xl flex-col gap-10 pb-10 xl:max-w-full xl:gap-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex flex-col gap-10">
        <Button variant={'outline'} className="max-w-24" onClick={() => router.back()}>
          <ArrowLeftIcon /> Back
        </Button>
        <CountryTime capital={capital[0]} countryName={name.common} timeZone={timezones[0]} />
      </div>

      <section className="grid w-full gap-12 xl:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src={flags.svg}
            alt={flags.alt || `Flag of ${name.common}`}
            width={0}
            height={0}
            sizes="100vw"
            className="mb-4 h-full w-full max-w-xl object-contain"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.3 },
            },
          }}
        >
          <motion.h1
            className="mb-4 text-[clamp(24px,5vw,32px)] leading-[137.5%] font-bold sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {name.common}
          </motion.h1>

          <ul className="mb-8 leading-8 sm:mb-6 xl:mb-16">
            {details.map(({ label, value }, index) => (
              <motion.li
                key={label}
                className={cn('text-muted-foreground text-pretty capitalize', label.includes('Domain') && 'lowercase')}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              >
                <span className="mr-1 font-semibold capitalize">{label}:</span>
                {value}
              </motion.li>
            ))}
          </ul>

          <CountryBorders borders={borders} />
        </motion.div>
      </section>
    </motion.article>
  );
}
