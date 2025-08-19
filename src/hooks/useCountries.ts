import { TCountry } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useCountries(rawData: TCountry[]) {
  const searchParams = useSearchParams();

  // const [pageSize, setPageSize] = useState(50);

  const searchParam = searchParams.get('search')?.toLowerCase().trim() || '';
  const regionParam = searchParams.get('region');
  const populationSort = searchParams.get('population');
  const nameSort = searchParams.get('name');
  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
  const pageSize = 28;

  const filteredData = useMemo(() => {
    const selectedRegions = regionParam ? regionParam.split(',').map((r) => r.toLowerCase().trim()) : [];

    return rawData.filter((item) => {
      const regionMatch = selectedRegions.length > 0 ? selectedRegions.includes(item.region.toLowerCase()) : true;

      const searchMatch = searchParam
        ? item.name.common.toLowerCase().includes(searchParam) ||
          (item.capital?.[0]?.toLowerCase().includes(searchParam) ?? false) ||
          item.region.toLowerCase().includes(searchParam)
        : true;

      return regionMatch && searchMatch;
    });
  }, [rawData, searchParam, regionParam]);

  const sortedData = useMemo(() => {
    if (!populationSort && !nameSort) {
      return filteredData;
    }

    const data = [...filteredData];

    if (populationSort) {
      data.sort((a, b) => (populationSort === 'asc' ? a.population - b.population : b.population - a.population));
    } else if (nameSort) {
      data.sort((a, b) =>
        nameSort === 'asc' ? a.name.common.localeCompare(b.name.common) : b.name.common.localeCompare(a.name.common),
      );
    }

    return data;
  }, [filteredData, populationSort, nameSort]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [currentPage, pageSize, sortedData]);

  return {
    paginatedData,
    filteredData: sortedData,
    totalItems: sortedData.length,
    totalPages: Math.ceil(sortedData.length / pageSize),
    pageSize,
  };
}
