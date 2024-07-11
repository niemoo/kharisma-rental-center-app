'use client';

import ReduxProvider from '@/store/redux-provider';
import PrintInvoice from '@/components/layout/PrintInvoice';
import Link from 'next/link';

interface SpecifiedPageProps {
  params: { id: number };
}

export default function Invoice({ params: { id } }: SpecifiedPageProps) {
  return (
    <ReduxProvider>
      <div className="p-5">
        <Link href="/" className="px-4 py-2 border border-cyan-600 rounded-lg hover:bg-cyan-600 hover:text-white">
          Kembali ke Halaman Utama
        </Link>
        <PrintInvoice />
      </div>
    </ReduxProvider>
  );
}
