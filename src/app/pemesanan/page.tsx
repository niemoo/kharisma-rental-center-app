'use client';

import ReduxProvider from '@/store/redux-provider';
import PemesananForm from '@/components/layout/Form/PemesananForm';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import Wave from '../../../public/wave.png';
import Footer from '@/components/layout/Footer';

export default function Pemesanan() {
  return (
    <ReduxProvider>
      <title>Pemesanan | KRC</title>
      <Navbar />
      <main className="bg-slate-100">
        <div
          style={{
            backgroundImage: `url(${Wave.src})`,
            backgroundRepeat: 'no-repeat',
          }}
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
