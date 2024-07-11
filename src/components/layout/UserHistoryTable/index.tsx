'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAppSelector } from '@/store/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function formatRupiah(number: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

export default function UserHistoryTable() {
  const router = useRouter();
  const [datas, setData] = useState<any[]>([]);
  const userId = useAppSelector((state) => state.app.userId);
  const isLogin = useAppSelector((state) => state.app.isLogin);

  const fetchData = async () => {
    if (!userId) return; // Ensure userId is available

    try {
      const totalCarsResponse = await fetch(`http://localhost:3001/history/booking/${userId}`, {
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

  return (
    <>
      {isLogin ? (
        <>
          <div className="max-w-screen-lg mx-auto bg-white rounded-lg border border-blue-300 mt-5 shadow-md">
            <p className="py-3 px-2 font-semibold">Riwayat Penyewaan</p>
            <Table className="table-auto w-full border-collapse rounded-b-lg overflow-hidden">
              <TableHeader>
                <TableRow className="bg-blue-500">
                  <TableHead className="px-3 py-2 border text-white">Download Invoice</TableHead>
                  <TableHead className="px-3 py-2 border text-white">No Booking</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Nama Pemesan</TableHead>
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
                  {/* <TableHead className="px-3 py-2 border text-white">Bukti Pembayaran</TableHead> */}
                  <TableHead className="px-3 py-2 border text-white">Status</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Tanggal Pesan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datas?.map((data) => (
                  <TableRow key={data.id} className="odd:bg-white even:bg-slate-200">
                    <TableCell className="px-3 py-2 border">{data.id}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.id}</TableCell>
                    <TableCell className="px-3 py-2 border">{data.full_name}</TableCell>
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
                    {/* <TableCell className="px-3 py-2 border">
                      <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${data.image}`} alt="" width={1000} height={1000} className="mx-auto w-20 h-fit rounded-lg" />
                    </TableCell> */}
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
