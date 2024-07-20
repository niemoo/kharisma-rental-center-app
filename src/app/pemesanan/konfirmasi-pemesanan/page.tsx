'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import KonfirmasiPemesananCard from '@/components/layout/KonfirmasiPemesananCard';
import Wave from '../../../../public/wave.png';
import Footer from '@/components/layout/Footer';
import { useMediaQuery } from 'react-responsive';

export default function KonfirmasiPembayaran() {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1450px)' });
  return (
    <ReduxProvider>
      <Navbar />
      <main className="bg-slate-100">
        <div
          style={
            isLargeScreen
              ? {
                  backgroundImage: `url(${Wave.src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {
                  backgroundImage: `url(${Wave.src})`,
                  backgroundRepeat: 'no-repeat',
                }
          }
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
