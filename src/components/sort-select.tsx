'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const populationSort = searchParams.get('population');
  const nameSort = searchParams.get('name');

  const currentValue = populationSort ? `population-${populationSort}` : nameSort ? `name-${nameSort}` : '';

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === 'default') {
      params.delete('population');
      params.delete('name');
    }

    if (value !== 'default') {
      const [field, direction] = value.split('-');
      params.delete('population');
      params.delete('name');
      params.set(field, direction);
    }

    params.delete('page');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const OPTIONS = [
    { value: 'default', label: 'Default' },
    { value: 'population-asc', label: 'Population ↑' },
    { value: 'population-desc', label: 'Population ↓' },
    { value: 'name-asc', label: 'Name A–Z' },
    { value: 'name-desc', label: 'Name Z–A' },
  ];

  return (
    <div className="w-full md:w-40">
      <Label className="sr-only">Sort Options</Label>
      <Select value={currentValue} onValueChange={handleChange}>
        <SelectTrigger id="sort-select" className="dark:bg-input/30 h-10 truncate bg-white">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((opt) => (
            <SelectItem key={opt.value || 'default'} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
