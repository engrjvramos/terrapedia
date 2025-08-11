import { getCountryByCode } from '@/lib/utils';
import CountryDetails from './_components/country-details';

interface CountryPageProps {
  params: Promise<{ code: string }>;
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { code } = await params;

  const countryData = await getCountryByCode(code);

  if (!countryData) {
    return <div>Country not found.</div>;
  }

  return <CountryDetails countryData={countryData} />;
}
