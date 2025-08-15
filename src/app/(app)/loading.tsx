import { Skeleton } from '@/components/ui/skeleton';

export default function HomeLoading() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:gap-10">
        <Skeleton className="h-10 w-full sm:w-64" />
        <Skeleton className="h-10 w-full max-w-full sm:hidden" />

        <div className="flex w-full items-center gap-2 sm:justify-end">
          <Skeleton className="hidden h-10 w-40 sm:block" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-xs flex-1 sm:max-w-full">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(264px,1fr))] gap-18">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-card overflow-hidden rounded-lg border">
              <Skeleton className="h-40 w-full" />

              <div className="p-6 pb-12">
                <Skeleton className="mb-4 h-6 w-3/4" />

                <div className="space-y-2 text-sm leading-4">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
