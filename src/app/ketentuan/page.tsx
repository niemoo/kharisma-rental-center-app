'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import Footer from '@/components/layout/Footer';
import Wave from '../../../public/wave.png';
import { useMediaQuery } from 'react-responsive';

export default function Ketentuan() {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1450px)' });
  return (
    <ReduxProvider>
      <title>Ketentuan | KRC</title>

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
          <div className="max-w-screen-md mx-auto md:pb-20 md:pt-5 p-5 grid gap-5">
            <div className="grid gap-5 py-3 px-5 bg-white border border-cyan-600 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold underline">Sebelum & Saat Pengambilan Mobil</h3>
              <div>
                <p>1. Wajib Memiliki Surat Izin Mengemudi (SIM) jenis A yang masih berlaku.</p>
                <p>2. Wajib Memiliki Kartu Tanda Penduduk (KTP).</p>
                <p>3. Memiliki STNK dengan pajak yang masih berlaku, minimal tahun 2013.</p>
                <p>4. Wajib melampirkan invoice pemesanan yang sudah di download.</p>
                <p>5. Wajib Memberikan Berkas Asli Kartu Tanda Penduduk (KTP), Kartu Keluarga (KK) dan salah satu dari dokumen berikut: KTM/NPWP/Kartu BPJS/KIS/ID Card/KK.</p>
              </div>
            </div>
            <div className="grid gap-5 py-3 px-5 bg-white border border-cyan-600 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold underline">Sesudah Pengembalian Mobil</h3>
              <div>
                <p>1. Wajib mengembalikan bahan bakar seperti pada saat pengambilan mobil. Jika bahan bakar lebih sedikit dari saat pengambilan mobil, maka akan dikenakan biaya tambahan.</p>
                <p>2. Wajib mengembalikan mobil dalam kondisi yang sama dengan kondisi saat mobil diterima.</p>
                <p>3. Pastikan waktu pengambilan dan pengembalian mobil sudah sesuai. Apabila melebihi waktu pengembalian mobil, maka akan dikenakan denda sebesar Rp 30.000</p>
                <p>4. Wajib bertanggung jawab untuk biaya penggantian atau perbaikan atas kehilangan atau kerusakan terhadap STNK, kunci mobil, aksesoris, dan alat mobil</p>
                <p>5. Wajib bertanggung jawab atas semua denda parkir, lalu lintas (termasuk tilang elektronik), dan lainnya yang terjadi akibat pelanggaran hukum selama periode rental.</p>
                <p></p>
              </div>
            </div>
            <div className="grid gap-5 py-3 px-5 bg-white border border-cyan-600 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold underline">Pengembalian Dana dan Penjadwalan Ulang</h3>
              <div>
                <p>1. Refund penuh akan diberikan jika Anda membatalkan pesanan lebih dari 24 jam sebelum waktu pengambilan.</p>
                <p>2. Refund tidak akan diberikan jika Anda membatalkan pesanan kurang dari 24 jam sebelum waktu pengambilan.</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </ReduxProvider>
  );
}
