'use client';

import ReduxProvider from '@/store/redux-provider';
import PemesananForm from '@/components/layout/Form/PemesananForm';
import Navbar from '@/components/layout/Navbar/UserNavbar';

export default function Pemesanan() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="max-w-screen-xl mx-auto md:mt-10 md:p-0 my-14 p-5">
        <PemesananForm />
      </main>
    </ReduxProvider>
  );
}
