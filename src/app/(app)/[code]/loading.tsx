import { Skeleton } from '@/components/ui/skeleton';

export default function DetailsLoading() {
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
