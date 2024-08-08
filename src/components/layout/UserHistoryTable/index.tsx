'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAppDispatch, useAppSelector } from '@/store/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaDownload } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';
import { setBookingId } from '@/store/appSlice';

function formatRupiah(number: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

export default function UserHistoryTable() {
  const router = useRouter();
  const [datas, setData] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.app.userId);
  const isLogin = useAppSelector((state) => state.app.isLogin);

  const fetchData = async () => {
    if (!userId) return; // Ensure userId is available

    try {
      const totalCarsResponse = await fetch(`https://api.kharisma-rental-center.my.id/history/booking/${userId}`, {
        cache: 'no-cache',
      });
      const totalCars = await totalCarsResponse.json();
      setData(totalCars.data);
      console.log(totalCars.data); // Log data here after state update
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]); // Fetch data only when userId is available

  const handlePembayaran = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const bookId = event.currentTarget.getAttribute('data-book-id');
    if (bookId) {
      dispatch(setBookingId(Number(bookId)));
    }
  };

  return (
    <>
      {isLogin ? (
        <>
          <div className="max-w-screen-lg mx-auto bg-white rounded-lg border border-blue-300 mt-5 shadow-md">
            <p className="py-3 px-2 font-semibold">Riwayat Penyewaan</p>
            <Table className="table-auto w-full border-collapse rounded-b-lg overflow-hidden">
              <TableHeader>
                <TableRow className="bg-blue-500">
                  <TableHead className="px-3 py-2 border text-white">Aksi</TableHead>
                  <TableHead className="px-3 py-2 border text-white">No Booking</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Nama Pemesan</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Nama Mobil</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Tempat Pengambilan</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Alamat Pemesan</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Instagram</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Tujuan Sewa</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Rute Sewa</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Jaminan Sewa</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Tanggal Sewa</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Jam Mulai</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Jam Kembali</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Total Tagihan</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Terbayar</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Metode Pembayaran</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Status</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Tanggal Pesan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datas?.map((data) => (
                  <TableRow key={data.id} className="odd:bg-white even:bg-slate-200 h-full">
                    <TableCell className="px-3 py-2 h-full">
                      <div className="flex flex-col items-center justify-center gap-5 h-full">
                        <div>
                          <Link href={`/print-invoice/${data.id}`} className="text-xl text-sky-700 hover:text-sky-900">
                            <FaDownload />
                          </Link>
                        </div>
                        {data.amount > 0 ? (
                          ''
                        ) : (
                          <div>
                            <Link href={`/pembayaran/`} onClick={handlePembayaran} className="text-xl text-sky-700 hover:text-sky-900">
                              <GiTakeMyMoney />
                            </Link>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-2 border">{data.id}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.full_name}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.car_name}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.tempat_ambil}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.alamat}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.instagram}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.tujuan_sewa}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.rute}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.jaminan}</TableCell>
                    <TableCell className="px-3 py-2 border">{`${new Date(data.start_date).toLocaleDateString()} - ${new Date(data.end_date).toLocaleDateString()}`}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.start_time}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.end_time}</TableCell>
                    <TableCell className="px-3 py-2 border">{formatRupiah(data.total_price)}</TableCell>
                    <TableCell className="px-3 py-2 border">{formatRupiah(data.amount)}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.payment_method}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.payment_status}</TableCell>
                    <TableCell className="px-3 py-2 border">{`${new Date(data.booking_date).toLocaleDateString()}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        router.push('/login')
      )}
    </>
  );
}
