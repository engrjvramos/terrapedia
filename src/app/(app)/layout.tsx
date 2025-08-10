import Footer from '@/components/footer';
import Header from '@/components/header';
import { ReactNode } from 'react';

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[90rem] flex-1 px-5 py-16">{children}</main>
      <Footer />
    </div>
  );
}
