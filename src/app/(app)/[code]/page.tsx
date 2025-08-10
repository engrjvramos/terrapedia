import { getCountryByCode } from '@/lib/utils';
import Image from 'next/image';

interface CountryPageProps {
  params: Promise<{ code: string }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { code } = await params;
  const countryData = await getCountryByCode(code);

  if (!countryData) {
    return <div>Country not found.</div>;
  }

  const { flags, name } = countryData;

  return (
    <div className="container py-8">
      <h1 className="mb-4 text-3xl font-bold">{name.common}</h1>
      <Image src={flags.svg} alt={flags.alt || ''} width={0} height={0} sizes="100vw" className="mb-4 w-64" />
    </div>
  );
}
