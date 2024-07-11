'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import InvoiceCard from '@/components/layout/InvoiceCard';

interface SpecifiedPageProps {
  params: { id: number };
}

export default function Pembayaran({ params: { id } }: SpecifiedPageProps) {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="max-w-screen-sm mx-auto p-5 py-5 md:px-0 md:mt-10">
        <InvoiceCard />
      </main>
    </ReduxProvider>
  );
}
