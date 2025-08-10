import { getCountryByCode } from '@/lib/utils';
import Image from 'next/image';
import BackButton from './_components/back-button';
import CountryBorders from './_components/country-borders';

interface CountryPageProps {
  params: Promise<{ code: string }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { code } = await params;

  const countryData = await getCountryByCode(code);

  if (!countryData) {
    return <div>Country not found.</div>;
  }

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
  ].filter(({ value }) => Boolean(value)); // removes empty/null values

  return (
    <article className="flex flex-col gap-16 sm:gap-20">
      <BackButton />
      <section className="mx-auto grid w-full max-w-xl gap-12 lg:max-w-full lg:grid-cols-2">
        <Image
          src={flags.svg}
          alt={flags.alt || `Flag of ${name.common}`}
          width={0}
          height={0}
          sizes="100vw"
          className="mb-4 h-full w-full max-w-xl object-contain"
        />
        <div>
          <h1 className="mb-4 text-[clamp(24px,5vw,32px)] leading-[137.5%] font-bold sm:mb-6">{name.common}</h1>
          <ul className="mb-8 leading-8 sm:mb-6 lg:mb-16">
            {details.map(({ label, value }) => (
              <li key={label} className="text-muted-foreground text-pretty capitalize">
                <span className="mr-1 font-semibold capitalize">{label}:</span>
                {value}
              </li>
            ))}
          </ul>
          <CountryBorders borders={borders} />
        </div>
      </section>
    </article>
  );
}
