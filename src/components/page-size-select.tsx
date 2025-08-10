'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { useId } from 'react';

const PAGE_SIZES = [10, 20, 30, 40, 50];

export default function PageSizeSelect() {
  const id = useId();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageSizeParam = parseInt(searchParams.get('pageSize') || '30', 10);

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('pageSize', value);
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-20">
      <Label htmlFor={id} className="sr-only">
        Items per page
      </Label>
      <Select onValueChange={handleChange} value={String(pageSizeParam)}>
        <SelectTrigger id={id} className="dark:bg-input/30 h-10 bg-white">
          <SelectValue placeholder="Items per page" />
        </SelectTrigger>
        <SelectContent>
          {PAGE_SIZES.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
