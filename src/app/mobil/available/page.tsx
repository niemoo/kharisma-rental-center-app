'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import GetDate from '@/components/layout/GetDate';
import CarsList from '@/components/layout/CarsList';
import Wave from '../../../../public/wave.png';
import Footer from '@/components/layout/Footer';

export default function AvailableCars() {
  return (
    <ReduxProvider>
      <title>Mobil | KRC</title>
      <Navbar />
      <main className="bg-slate-100">
        <div
          style={{
            backgroundImage: `url(${Wave.src})`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="max-w-screen-md mx-auto md:pb-20 md:pt-5 p-5">
            <GetDate />
            <div className="grid gap-5 mt-10">
              <CarsList />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </ReduxProvider>
  );
}
