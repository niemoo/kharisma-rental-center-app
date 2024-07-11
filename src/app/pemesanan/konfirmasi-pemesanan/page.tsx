'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import KonfirmasiPemesananCard from '@/components/layout/KonfirmasiPemesananCard';
import Wave from '../../../../public/wave.png';
import Footer from '@/components/layout/Footer';

export default function KonfirmasiPembayaran() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="bg-slate-100">
        <div
          style={{
            backgroundImage: `url(${Wave.src})`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="max-w-screen-lg mx-auto md:pt-5 p-5">
            <KonfirmasiPemesananCard />
          </div>
        </div>
      </main>
      <Footer />
    </ReduxProvider>
  );
}
