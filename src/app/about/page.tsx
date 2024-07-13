'use client';

import ReduxProvider from '@/store/redux-provider';
import about from '../../../public/about.jpg';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

export default function About() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="bg-slate-100">
        <div className="max-w-screen-lg mx-auto md:py-20 p-5">
          <div className="md:flex grid gap-5 items-center justify-between">
            <div className="md:w-1/2 grid gap-5">
              <div className="flex items-center">
                <div className="border-l-4 rounded border-cyan-600 h-8 mr-2"></div>
                <h2 className="text-3xl font-bold text-zinc-800">Kharisma Rental Center</h2>
              </div>
              <p className="text-justify">
                Kharisma Rental Center adalah penyedia jasa rental mobil terpercaya di area Solo Raya yang siap memenuhi kebutuhan transportasi Anda. Dengan berbagai pilihan kendaraan yang selalu terawat dan dalam kondisi prima, kami
                memastikan kenyamanan dan keamanan perjalanan Anda. Didukung oleh layanan pelanggan yang ramah dan profesional, Kharisma Rental Center berkomitmen memberikan pengalaman rental mobil yang terbaik, baik untuk keperluan bisnis,
                liburan keluarga, atau acara khusus. Percayakan perjalanan Anda kepada kami dan rasakan kemudahan serta kenyamanan berkendara bersama Kharisma Rental Center.
              </p>
            </div>
            <Image src={about} alt="" width={500} height={500} className="md:w-1/3 rounded-lg" />
          </div>
        </div>
      </main>
      <Footer />
    </ReduxProvider>
  );
}
