'use client';

import ReduxProvider from '@/store/redux-provider';
import PemesananForm from '@/components/layout/Form/PemesananForm';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import Wave from '../../../public/wave.png';
import Footer from '@/components/layout/Footer';
import { useMediaQuery } from 'react-responsive';

export default function Pemesanan() {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1450px)' });
  return (
    <ReduxProvider>
      <title>Pemesanan | KRC</title>
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
          <div className="max-w-screen-xl mx-auto md:pb-20 md:pt-5 p-5">
            <PemesananForm />
          </div>
        </div>
      </main>
      <Footer />
    </ReduxProvider>
  );
}
