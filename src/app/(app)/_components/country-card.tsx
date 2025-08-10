import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TCountry } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  country: TCountry;
};

export default function CountryCard({ country }: Props) {
  const { flags, name, population, region, capital, cca3 } = country;

  return (
    <Link href={cca3}>
      <Card className="gap-0 overflow-hidden py-0 transition-transform duration-200 hover:-translate-y-1">
        <CardHeader className="gap-0 px-0">
          <CardTitle className="sr-only">{name.common}</CardTitle>
          <CardDescription className="sr-only">{region}</CardDescription>
          <Image
            src={flags.svg}
            alt={flags.alt}
            width={0}
            height={0}
            sizes="100vw"
            className="h-40 w-full object-cover"
          />
        </CardHeader>
        <CardContent className="h-full pt-6 pb-12">
          <h2 className="mb-4 text-lg leading-[145%] font-bold">{name.common}</h2>
          <div className="space-y-2 text-sm leading-4">
            <p>
              <span className="mr-1 font-semibold">Population:</span>
              {population.toLocaleString()}
            </p>
            <p>
              <span className="mr-1 font-semibold">Region:</span>
              {region}
            </p>
            <p>
              <span className="mr-1 font-semibold">Capital:</span>
              {capital[0]}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
