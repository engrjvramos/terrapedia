import Footer from '@/components/footer';
import Header from '@/components/header';
import { Loader2 } from 'lucide-react';
import { ReactNode, Suspense } from 'react';

function LandingLoader() {
  return (
    <div className="grid h-full w-full flex-1 place-items-center">
      <Loader2 className="size-10 animate-spin" />
    </div>
  );
}

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[90rem] flex-1 px-5 py-8 sm:py-12">
        <Suspense fallback={<LandingLoader />}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}
