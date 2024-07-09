'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import UserHistoryTable from '@/components/layout/UserHistoryTable';

export default function Dashboard() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="max-w-screen-lg mx-auto">
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Riwayat Penyewaan</h2>
          <UserHistoryTable />
          <p className="">note pembayaran 1. customer yg baru DP, bayar sisanya dibayar waktu pas pengambilan</p>
          <p className="">note pembayaran 2. berkas jaminan sewa diberikan pas pengambilan, harus berupa berkas asli</p>
          <p className="">note pembayaran pastikan jam pengambilan mobil sesuai waktu pinjaman</p>
          <p className="">note pembayaran pastikan pengembalian mobil sesuai waktu pinjaman</p>
        </div>
      </main>
    </ReduxProvider>
  );
}
