'use client';

import ReduxProvider from '@/store/redux-provider';
import Hero1 from '../../public/carparkir.jpg';
import verticalCar from '../../public/verticalcar.jpg';
import blurry_background from '../../public/blurry_background.png';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import { MdOutlineDirectionsCarFilled, MdNavigateNext } from 'react-icons/md';
import { LuClipboardList } from 'react-icons/lu';
import { FaMoneyBill1Wave, FaCarOn } from 'react-icons/fa6';
import { PiSealCheckFill } from 'react-icons/pi';
import { Ri24HoursLine } from 'react-icons/ri';
import { GiClick } from 'react-icons/gi';
import { IoLogoWhatsapp } from 'react-icons/io';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <ReduxProvider>
      <Navbar />
      <section id="home" className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Hero1.src})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center h-full max-w-screen-xl mx-auto">
          <div className="md:w-1/2 px-5">
            <h1 className="text-zinc-100 text-4xl md:text-6xl font-bold z-10">
              Rental Mobil <span className="text-stone-400">Solo Raya</span>
            </h1>
            <p className="my-5 text-zinc-100">Temukan Petualangan Baru dengan Rental Mobil yang Mudah.</p>
          </div>
        </div>
      </section>
      <section
        className="py-10"
        style={{
          backgroundImage: `url(${blurry_background.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover', // Menyesuaikan ukuran background image dengan ukuran form
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-screen-lg mx-auto md:p-0 p-5">
          <div>
            <p className="text-center text-sky-700 font-semibold">- Cara Menyewa -</p>
            <h3 className="text-center text-2xl text-stone-900 font-semibold mt-3">Pesan Mobil dengan 4 Langkah</h3>
          </div>
          <div className="md:flex grid justify-center gap-20 py-10">
            <div className="md:w-1/4 w-full">
              <div className="flex justify-center p-10 border border-sky-500 rounded-lg bg-white shadow-lg">
                <MdOutlineDirectionsCarFilled className="text-5xl text-sky-700" />
              </div>
              <p className="mt-5 text-lg font-semibold text-sky-900 text-center">Temukan Mobil Impianmu</p>
            </div>
            <div className="md:w-1/4 w-full">
              <div className="flex justify-center p-10 border border-fuchsia-500 rounded-lg bg-white shadow-lg">
                <LuClipboardList className="text-5xl text-fuchsia-700" />
              </div>
              <p className="mt-5 text-lg font-semibold text-fuchsia-900 text-center">Pesan dan Isi Data Pribadi</p>
            </div>
            <div className="md:w-1/4 w-full">
              <div className="flex justify-center p-10 border border-amber-500 rounded-lg bg-white shadow-lg">
                <FaMoneyBill1Wave className="text-5xl text-amber-700" />
              </div>
              <p className="mt-5 text-lg font-semibold text-amber-900 text-center">Bayar dengan Mudah</p>
            </div>
            <div className="md:w-1/4 w-full">
              <div className="flex justify-center p-10 border border-green-500 rounded-lg bg-white shadow-lg">
                <FaCarOn className="text-5xl text-green-700" />
              </div>
              <p className="mt-5 text-lg font-semibold text-green-900 text-center">Nikmati Perjalanan Mewah</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="md:flex justify-between w-full relative max-w-screen-xl mx-auto md:p-0 p-5">
          <div className="relative">
            <div className="absolute top-0 left-0 w-full h-full bg-sky-400 rounded-xl transform -translate-x-3 translate-y-4 z-0"></div>
            <img src={verticalCar} alt="" width={300} height={300} className="h-fit rounded-xl z-10 relative" />
          </div>
          <div className="md:w-2/3">
            <div className="flex items-center md:mt-0 mt-20">
              <div className="border-l-4 border-red-500 md:h-8 h-14 rounded mr-2"></div>
              <h3 className="text-4xl font-bold text-cyan-900">Kenapa Harus Kami ?</h3>
            </div>
            <h1 className="text-6xl font-extrabold"></h1>
            <div className="mt-10">
              <div className="md:flex justify-between gap-10">
                <div className="flex gap-5 md:w-1/2 w-full items-start">
                  <FaMoneyBill1Wave className="text-5xl text-sky-600" />
                  <div className="grid gap-3 w-2/3">
                    <p className="text-xl font-semibold text-sky-800">Harga yang Bersahabat</p>
                    <p>Dapatkan penawaran terbaik untuk setiap penyewaan mobil. Harga yang terjangkau dan kompetitif.</p>
                  </div>
                </div>
                <div className="flex gap-5 md:w-1/2 w-full items-start">
                  <PiSealCheckFill className="text-5xl text-sky-600" />
                  <div className="grid gap-3 w-2/3">
                    <p className="text-xl font-semibold text-sky-800">Tempat Rental Terpercaya</p>
                    <p>Kami adalah pilihan utama dengan reputasi yang telah teruji. Kepuasan pelanggan adalah prioritas kami.</p>
                  </div>
                </div>
              </div>
              <div className="md:flex justify-between gap-10 mt-16">
                <div className="flex gap-5 md:w-1/2 w-full items-start">
                  <GiClick className="text-5xl text-sky-600" />
                  <div className="grid gap-3 w-2/3">
                    <p className="text-xl font-semibold text-sky-800">Kemudahan Menyewa</p>
                    <p>Proses penyewaan yang cepat dan mudah, tanpa ribet. Kami memudahkan Anda untuk segera berkendara.</p>
                  </div>
                </div>
                <div className="flex gap-5 md:w-1/2 w-full items-start">
                  <Ri24HoursLine className="text-5xl text-sky-600" />
                  <div className="grid gap-3 w-2/3">
                    <p className="text-xl font-semibold text-sky-800">24 / 7 Support</p>
                    <p>Layanan pelanggan kami siap membantu Anda kapan saja, setiap hari, sepanjang waktu.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white pt-10 pb-20">
        <div className="max-w-screen-sm mx-auto">
          <div className="md:w-2/3 md:flex gap-5 mx-auto items-center">
            <div className="flex justify-center">
              <IoLogoWhatsapp className="text-green-600 text-9xl" />
            </div>
            <div className="grid gap-5 text-center md:mt-0 mt-5">
              <h3 className="text-3xl text-green-600 font-bold">Hubungi Kami</h3>
              <Link href={'https://wa.me/6285647108657'} target="_blank" className="font-semibold text-green-600 hover:text-green-950 underline transition duration-300 ease-in-out">
                WhatsApp : +6285647108657
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </ReduxProvider>
  );
}
