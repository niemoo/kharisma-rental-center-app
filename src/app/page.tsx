'use client';

import ReduxProvider from '@/store/redux-provider';
import Hero1 from '../../public/hero-1.jpg';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar/UserNavbar';

export default function Home() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="max-w-screen-xl mx-auto md:p-0 md:pt-24 p-5">
        <div className="md:flex justify-between w-full">
          <Image src={Hero1} alt="" width={5000} height={5000} className="h-80 w-fit rounded-xl" />
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold text-blue-600">Rental Mobil Solo Raya</h3>
            <h1 className="text-6xl font-extrabold">Temukan Petualangan Baru dengan Rental Mobil yang Mudah</h1>
          </div>
        </div>
      </main>
    </ReduxProvider>
  );
}
