import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonLoader() {
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
