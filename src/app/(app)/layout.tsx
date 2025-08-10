import Footer from '@/components/footer';
import Header from '@/components/header';
import { SkeletonLoader } from '@/components/skeleton-loader';
import { ReactNode, Suspense } from 'react';

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[90rem] flex-1 px-5 py-8 sm:py-12">
        <Suspense fallback={<SkeletonLoader />}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}
