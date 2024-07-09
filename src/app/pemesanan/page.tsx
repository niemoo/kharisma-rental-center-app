'use client';

import ReduxProvider from '@/store/redux-provider';
import PemesananForm from '@/components/layout/Form/PemesananForm';
import Navbar from '@/components/layout/Navbar/UserNavbar';

export default function Pemesanan() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="bg-slate-100 md:py-14">
        <div className="max-w-screen-xl mx-auto">
          <PemesananForm />
        </div>
      </main>
    </ReduxProvider>
  );
}
