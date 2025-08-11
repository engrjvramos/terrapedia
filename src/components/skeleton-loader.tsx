'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { usePathname } from 'next/navigation';

export function SkeletonLoader() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  if (isHome) return <HomeSkeleton />;
  else return <CountrySkeleton />;
}

function HomeSkeleton() {
  return (
    <div className="flex flex-col gap-12">
      {/* Filters row */}
      <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:gap-10">
        {/* Search input skeleton */}
        <Skeleton className="h-10 w-full sm:w-64" />

        {/* Conditional region select skeleton (mobile) */}
        <Skeleton className="h-10 w-full max-w-full sm:hidden" />

        {/* Right-side controls */}
        <div className="flex w-full items-center gap-2 sm:justify-end">
          {/* Region select (desktop) */}
          <Skeleton className="hidden h-10 w-40 sm:block" />
          {/* Sort select */}
          <Skeleton className="h-10 w-32" />
          {/* Page size select */}
          <Skeleton className="h-10 w-28" />
        </div>
      </div>

      {/* Countries grid */}
      <div className="mx-auto w-full max-w-xs flex-1 sm:max-w-full">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(264px,1fr))] gap-18">
          {Array.from({ length: 12 }).map((_, i) => (
            <CountryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CountryCardSkeleton() {
  return (
    <div className="bg-card overflow-hidden rounded-lg border">
      {/* Flag */}
      <Skeleton className="h-40 w-full" />

      <div className="p-6 pb-12">
        {/* Country name */}
        <Skeleton className="mb-4 h-6 w-3/4" />

        {/* Details */}
        <div className="space-y-2 text-sm leading-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
}

function CountrySkeleton() {
  return (
    <div className="flex flex-col gap-16 sm:gap-20">
      <Skeleton className="h-10 w-24" />
      <div className="mx-auto grid w-full max-w-xl gap-12 lg:max-w-full lg:grid-cols-2">
        {/* Flag Skeleton */}
        <Skeleton className="h-[250px] w-full lg:h-[400px]" />

        <div>
          {/* Title */}
          <Skeleton className="mb-4 h-8 w-2/3" />

          {/* Details list */}
          <ul className="mb-8 space-y-3 sm:mb-6 lg:mb-16">
            {Array.from({ length: 8 }).map((_, i) => (
              <li key={i} className="flex gap-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-48" />
              </li>
            ))}
          </ul>

          {/* Border countries */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
