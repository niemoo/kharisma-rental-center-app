'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import KonfirmasiPembayaranCard from '@/components/layout/KonfirmasiPembayaranCard';

export default function KonfirmasiPembayaran() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="max-w-screen-sm mx-auto md:mt-10 md:p-0 my-14 p-5">
        <KonfirmasiPembayaranCard />
      </main>
    </ReduxProvider>
  );
}
