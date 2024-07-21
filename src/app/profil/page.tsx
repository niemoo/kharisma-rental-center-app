'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import UserHistoryTable from '@/components/layout/UserHistoryTable';
import UserProfilCard from '@/components/layout/UserProfilCard';
import Wave from '../../../public/wave.png';
import { BiSolidHelpCircle } from 'react-icons/bi';
import Footer from '@/components/layout/Footer';
import { useMediaQuery } from 'react-responsive';

export default function Profil() {
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
          <div className="md:pb-20 md:pt-5 p-5">
            <div className="mt-10">
              <UserProfilCard />
              {/* <h2 className="text-2xl font-semibold max-w-screen-lg mx-auto text-white">Riwayat Penyewaan</h2> */}
              <UserHistoryTable />
              <div className="max-w-screen-lg mx-auto grid gap-5 mt-5">
                <p className="underline font-semibold">Catatan </p>
                <div className="flex gap-3">
                  <BiSolidHelpCircle className="text-blue-500 text-xl mt-0.5" />
                  <p className="text-sm w-3/4">Anda dapat membayar uang muka (DP) terlebih dahulu sebesar 50%</p>
                </div>
                <hr />
                <div className="flex gap-3 w-full">
                  <BiSolidHelpCircle className="text-blue-500 text-xl mt-0.5" />
                  <p className="text-sm w-3/4">Apabila Anda membayar uang muka (DP) terlebih dahulu, maka pembayaran sisanya akan dilakukan ketika pengambilan mobil.</p>
                </div>
                <hr />
                <div className="flex gap-3 w-full">
                  <BiSolidHelpCircle className="text-blue-500 text-xl mt-0.5" />
                  <p className="text-sm w-3/4">Batas waktu untuk pembayaran adalah 24 jam, terhitung dari waktu pemesanan. Jika melebihi waktu yang telah ditentukan, maka pemesanan akan dibatalkan</p>
                </div>
                <hr />
                <div className="flex gap-3 w-full">
                  <BiSolidHelpCircle className="text-blue-500 text-xl mt-0.5" />
                  <p className="text-sm w-3/4">Berkas jaminan sewa yang diberikan harus berupa berkas asli. Pemberian jaminan sewa dilakukan pada waktu pengambilan mobil.</p>
                </div>
                <hr />
                <div className="flex gap-3 w-full">
                  <BiSolidHelpCircle className="text-blue-500 text-xl mt-0.5" />
                  <p className="text-sm w-3/4">Pastikan waktu pengambilan dan pengembalian mobil sudah sesuai. Apabila melebihi waktu pengembalian mobil, maka akan dikenakan denda sebesar Rp 30.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ReduxProvider>
  );
}
