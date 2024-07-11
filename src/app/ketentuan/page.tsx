'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import Footer from '@/components/layout/Footer';
import Wave from '../../../public/wave.png';

export default function Ketentuan() {
  return (
    <ReduxProvider>
      <title>Ketentuan | KRC</title>

      <Navbar />
      <main className="bg-slate-100">
        <div
          style={{
            backgroundImage: `url(${Wave.src})`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="max-w-screen-md mx-auto md:pb-20 md:pt-5 p-5">
            <p>asd</p>
          </div>
        </div>
        <Footer />
      </main>
    </ReduxProvider>
  );
}
