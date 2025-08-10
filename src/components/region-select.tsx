'use client';

import { Checkbox } from '@/components/ui/checkbox'; // from shadcn/ui
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TCountry } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useId, useState } from 'react';

export default function RegionSelect({ countries, className }: { countries: TCountry[]; className?: string }) {
  const id = useId();

  const router = useRouter();
  const searchParams = useSearchParams();

  const initialRegions = searchParams.get('region')?.split(',') || [];
  const [selectedRegions, setSelectedRegions] = useState<string[]>(initialRegions);

  const handleToggle = (region: string) => {
    let updatedRegions: string[];

    if (selectedRegions.includes(region)) {
      updatedRegions = selectedRegions.filter((r) => r !== region);
    } else {
      updatedRegions = [...selectedRegions, region];
    }

    setSelectedRegions(updatedRegions);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedRegions.length > 0) {
      params.set('region', updatedRegions.join(',').toLowerCase());
    } else {
      params.delete('region');
    }

    params.delete('page');

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const regionCounts = countries.reduce(
    (acc, country) => {
      const region = country.region || 'Other';
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const REGIONS = Object.keys(regionCounts);

  return (
    <div className={cn('w-full max-w-[200px]', className)}>
      <Label htmlFor={id} className="sr-only">
        Select Regions
      </Label>
      <Select>
        <SelectTrigger id={id} className="dark:bg-input/30 h-10 bg-white whitespace-nowrap">
          <SelectValue placeholder="Select Regions" />
        </SelectTrigger>
        <SelectContent>
          {REGIONS.map((region) => (
            <div
              key={region}
              className="hover:bg-accent flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1"
              onClick={() => handleToggle(region)}
            >
              <Checkbox checked={selectedRegions.includes(region)} onCheckedChange={() => handleToggle(region)} />
              <span className="text-sm">{region}</span>
              <span className="text-muted-foreground ml-auto inline-block font-mono text-sm">
                {regionCounts[region]}
              </span>
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
