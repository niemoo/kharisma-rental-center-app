'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

interface Booking {
  id: number;
  full_name: string;
  booking_date: string;
  alamat: string;
  instagram: string;
  tujuan_sewa: string;
  rute: string;
  jaminan: string;
  tempat_ambil: string;
  total_price: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  amount: number;
  payment_method: string;
  payment_status: string;
}

function formatRupiah(number: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

export default function AdminDashboardUsers() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<String | null>(null);
  const [datas, setDatas] = useState<Booking[]>([]);

  const fetchData = async () => {
    try {
      const historyBookingsResponse = await fetch('http://localhost:3001/dashboard/bookings/all-history', {
        cache: 'no-cache',
      });

      if (!historyBookingsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const historyBookings = await historyBookingsResponse.json();
      setDatas(historyBookings?.data || []); // Menetapkan data ke state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log(paymentStatus);
  }, [paymentStatus]);

  const handleEditClick = (booking: Booking) => {
    setSelectedBooking(booking.id);
  };

  const handleSubmitUpdate = async () => {
    const updateResponse = await fetch('http://localhost:3001/payment/update-status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: paymentStatus,
        booking_id: selectedBooking,
      }),
    });

    const response = await updateResponse.json();
    setSelectedBooking(null);
    window.location.reload();
  };

  const handleDelete = async () => {
    const deleteResponse = await fetch(`http://localhost:3001/bookings/${selectedBooking}`, {
      method: 'DELETE',
    });

    const response = await deleteResponse.json();
    setSelectedBooking(null);
    window.location.reload();
  };

  return (
    <main className="bg-slate-100 w-full py-10 md:px-20 px-5 h-full overflow-auto">
      <h2 className="text-2xl text-slate-800 font-semibold underline underline-offset-8">Halo, Admin!</h2>

      <div className="bg-white rounded-lg border border-blue-300 mt-20">
        <p className="py-3 px-2 font-semibold">Riwayat Penyewaan</p>
        <Table className="table-auto w-full border-collapse rounded-b-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-blue-500">
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
              <TableHead className="px-3 py-2 border text-white">Status</TableHead>
              <TableHead className="px-3 py-2 border text-white">Tanggal Pesan</TableHead>
              <TableHead className="px-3 py-2 border text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas.map((booking: Booking) => (
              <TableRow key={booking.id} className="odd:bg-white even:bg-slate-200">
                <TableCell className="px-3 py-2 border">{booking.id}</TableCell>
                <TableCell className="px-3 py-2 border">{booking.full_name}</TableCell>
                <TableCell className="px-3 py-2 border">{booking.tempat_ambil}</TableCell>
                <TableCell className="px-3 py-2 border">{booking.alamat}</TableCell>
                <TableCell className="px-3 py-2 border">{booking.instagram}</TableCell>
                <TableCell className="px-3 py-2 border">{booking.tujuan_sewa}</TableCell>
                <TableCell className="px-3 py-2 border">{booking.rute}</TableCell>
                <TableCell className="px-3 py-2 border">{booking.jaminan}</TableCell>
                <TableCell className="px-3 py-2 border">{`${new Date(booking.start_date).toLocaleDateString()} - ${new Date(booking.end_date).toLocaleDateString()}`}</TableCell>
                <TableCell className="px-3 py-2 border">{booking.start_time}</TableCell>
                <TableCell className="px-3 py-2 border">{booking.end_time}</TableCell>
                <TableCell className="px-3 py-2 border">{formatRupiah(booking.total_price)}</TableCell>
                <TableCell className="px-3 py-2 border">{formatRupiah(booking.amount)}</TableCell>
                <TableCell className="px-3 py-2 border">{booking.payment_method}</TableCell>
                <TableCell className="px-3 py-2 border">{booking.payment_status}</TableCell>
                <TableCell className="px-3 py-2 border">{`${new Date(booking.booking_date).toLocaleDateString()}`}</TableCell>
                <TableCell className="px-3 py-2 border text-center">
                  <AlertDialog>
                    <AlertDialogTrigger onClick={() => handleEditClick(booking)}>
                      <MdEdit className="text-3xl text-white bg-green-500 hover:bg-green-600 p-1 rounded" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Update Status Pembayaran</AlertDialogTitle>
                        <AlertDialogDescription>
                          {selectedBooking && (
                            <div className="grid gap-2 mb-4 mt-5">
                              <Label className="block text-gray-700">Status Pembayaran</Label>
                              {/* <Input type="text" placeholder={selectedBooking.payment_status} /> */}
                              <Select onValueChange={(value) => setPaymentStatus(value)} required>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Pilih Status Pembayaran" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Status Pembayaran</SelectLabel>

                                    <SelectItem value="Selesai">Selesai</SelectItem>
                                    <SelectItem value="Sedang Proses Penyewaan">Sedang Proses Penyewaan</SelectItem>
                                    <SelectItem value="Lunas">Lunas</SelectItem>
                                    <SelectItem value="Menunggu Pembayaran">Menunggu Pembayaran</SelectItem>
                                    <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmitUpdate}>Update</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger onClick={() => handleEditClick(booking)}>
                      <MdDeleteForever className="text-3xl text-zinc-100 bg-red-500 hover:bg-red-600 p-1 rounded" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Data</AlertDialogTitle>
                        <AlertDialogDescription>Apakah anda yakin ingin menghapus data ini?</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleDelete}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
