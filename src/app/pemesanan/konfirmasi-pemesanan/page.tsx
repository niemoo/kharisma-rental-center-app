'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import KonfirmasiPembayaranCard from '@/components/layout/KonfirmasiPembayaranCard';

export default function KonfirmasiPembayaran() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="bg-slate-100">
        <div className="max-w-screen-lg mx-auto py-10 md:px-0 px-5">
          <KonfirmasiPembayaranCard />
        </div>
      </main>
    </ReduxProvider>
  );
}
