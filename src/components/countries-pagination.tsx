'use client';

import { useWindowSize } from '@/hooks/useWindowSize';
import { cn } from '@/lib/utils';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type PaginationProps = {
  totalItems: number;
  itemsPerPage?: number;
  scrollToTop?: boolean;
};

export default function CountriesPagination({ totalItems, itemsPerPage = 50 }: PaginationProps) {
  const size = useWindowSize();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1', 10);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getHrefWithPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [searchParams]);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push('...');

      pages.push(totalPages);
    }

    return pages.map((page, i) => {
      if (page === '...') {
        return (
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400 select-none">
            ...
          </span>
        );
      }

      return (
        <Link
          key={page}
          href={getHrefWithPage(page as number)}
          // scroll={false}
          className={cn(
            'sm:hover:border-primary sm:hover:text-primary dark:bg-input/30 flex h-9 w-9 items-center justify-center border bg-white transition',
            currentPage === page && 'border-primary text-primary font-semibold',
          )}
        >
          {page}
        </Link>
      );
    });
  };

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-[5px]">
      <Link
        href={getHrefWithPage(currentPage - 1)}
        // scroll={false}
        className={cn(
          'sm:hover:border-primary sm:hover:text-primary dark:bg-input/30 flex h-9 items-center justify-center rounded-l-full border bg-white px-3 py-2',
          isFirstPage && 'pointer-events-none opacity-50',
        )}
        aria-disabled={isFirstPage}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        {size.width >= 480 && 'Prev'}
      </Link>

      {renderPageNumbers()}

      <Link
        href={getHrefWithPage(currentPage + 1)}
        // scroll={false}
        className={cn(
          'sm:hover:border-primary sm:hover:text-primary dark:bg-input/30 flex h-9 items-center justify-center rounded-r-full border bg-white px-3 py-2',
          isLastPage && 'pointer-events-none opacity-50',
        )}
        aria-disabled={isLastPage}
      >
        {size.width >= 480 && 'Next'}
        <ChevronRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
