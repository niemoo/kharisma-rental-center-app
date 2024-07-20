'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import GetDate from '@/components/layout/GetDate';
import CarsList from '@/components/layout/CarsList';
import Wave from '../../../../public/wave.png';
import Footer from '@/components/layout/Footer';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';

export default function AvailableCars() {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1450px)' });
  return (
    <ReduxProvider>
      <title>Mobil | KRC</title>
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
          <div className="max-w-screen-md mx-auto md:pb-20 md:pt-5 p-5">
            <GetDate />
            <div className="grid gap-7 mt-10">
              <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-lg border border-cyan-600 shadow-lg">
                <IoMdInformationCircleOutline className="text-2xl text-blue-600 md:w-1/12 w-1/6" />
                <p className="text-sm md:w-full">Silahkan mengecek ketersediaan mobil terlebih dahulu dengan mengisi input tanggal mulai sewa dan akhir sewa.</p>
              </div>
              <CarsList />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </ReduxProvider>
  );
}
