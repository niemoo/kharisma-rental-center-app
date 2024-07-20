'use client';

import { MdOutlineTrendingUp } from 'react-icons/md';
import { FaUsers, FaCarSide, FaClipboardList } from 'react-icons/fa';
import DashboardCard from '@/components/layout/DashboardCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';

interface Booking {
  id: number;
  full_name: string;
  car_name: string;
  tempat_ambil: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  booking_date: string;
  payment_status: string;
}

interface Cars {
  id: number;
  nama_mobil: string;
  kategori_mobil: string;
  transmission: string;
  capacity: string;
  color: string;
  price_12: number;
  price_24: number;
  price_fullday: number;
}

interface CarsBooking {
  nama_mobil: string;
  total_bookings: number;
}

function formatRupiah(number: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

export default async function AdminDashboard() {
  const router = useRouter();
  const isAdmin = useAppSelector((state) => state.app.isAdmin);

  const totalCarsResponse = await fetch('https://api.kharisma-rental-center.my.id/dashboard/cars-total', {
    cache: 'no-cache',
  });
  const totalUsersResponse = await fetch('https://api.kharisma-rental-center.my.id/dashboard/users-total', {
    cache: 'no-cache',
  });
  const totalBookingsResponse = await fetch('https://api.kharisma-rental-center.my.id/dashboard/bookings-total', {
    cache: 'no-cache',
  });
  const totalProfitResponse = await fetch('https://api.kharisma-rental-center.my.id/dashboard/profit-total', {
    cache: 'no-cache',
  });
  const historyBookingsResponse = await fetch('https://api.kharisma-rental-center.my.id/dashboard/bookings/last-history', {
    cache: 'no-cache',
  });
  const carsResponse = await fetch('https://api.kharisma-rental-center.my.id/dashboard/cars/table', {
    cache: 'no-cache',
  });
  const carsBookingResponse = await fetch('https://api.kharisma-rental-center.my.id/dashboard/cars/most-booking-table', {
    cache: 'no-cache',
  });
  const totalCars = await totalCarsResponse.json();
  const totalUsers = await totalUsersResponse.json();
  const totalBookings = await totalBookingsResponse.json();
  const totalProfit = await totalProfitResponse.json();
  const historyBookings = await historyBookingsResponse.json();
  const cars = await carsResponse.json();
  const carsBooking = await carsBookingResponse.json();

  return (
    <>
      {isAdmin ? (
        <main className="bg-slate-100 w-full py-10 md:px-20 px-5 h-full overflow-auto">
          <h2 className="text-2xl text-slate-800 font-semibold underline underline-offset-8">Halo, Admin!</h2>

          <div className="md:flex grid gap-10 mt-10">
            <DashboardCard total={totalCars?.data[0].total_cars} text="Total Mobil" icon={<FaCarSide className="text-5xl text-blue-500" />} />
            <DashboardCard total={totalBookings?.data[0].total_bookings} text="Total Sewa" icon={<FaClipboardList className="text-5xl text-blue-500" />} />
            <DashboardCard total={totalUsers?.data[0].total_users} text="Pengguna" icon={<FaUsers className="text-5xl text-blue-500" />} />
            <DashboardCard total={Number(totalProfit?.data[0].total_sum)} text="Pendapatan" icon={<MdOutlineTrendingUp className="text-5xl text-blue-500" />} />
          </div>

          <hr className="my-10 border border-slate-300" />
          <div className="md:flex gap-5">
            <div className="bg-white rounded-lg border border-blue-300 md:w-2/3">
              <p className="py-3 px-2 font-semibold">Daftar Mobil</p>
              <Table className="table-auto w-full border-collapse rounded-b-lg overflow-hidden">
                <TableHeader>
                  <TableRow className="bg-blue-500">
                    <TableHead className="px-3 py-2 border text-white">Nama Mobil</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Kategori Mobil</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Transmisi</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Kapasitas</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Warna</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Harga 12 Jam</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Harga 24 Jam</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Harga Fullday</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cars?.data.map((car: Cars) => (
                    <TableRow key={car.id} className="odd:bg-white even:bg-slate-200">
                      <TableCell className="px-3 py-2 border">{car.nama_mobil}</TableCell>
                      <TableCell className="px-3 py-2 border">{car.kategori_mobil}</TableCell>
                      <TableCell className="px-3 py-2 border">{car.transmission}</TableCell>
                      <TableCell className="px-3 py-2 border">{car.capacity}</TableCell>
                      <TableCell className="px-3 py-2 border">{car.color}</TableCell>
                      <TableCell className="px-3 py-2 border">{formatRupiah(car.price_12)}</TableCell>
                      <TableCell className="px-3 py-2 border">{formatRupiah(car.price_24)}</TableCell>
                      <TableCell className="px-3 py-2 border">{formatRupiah(car.price_fullday)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="bg-white rounded-lg border border-blue-300 md:w-2/3 md:mt-0 mt-10 h-fit">
              <p className="py-3 px-2 font-semibold">Total Sewa Tiap Mobil</p>
              <Table className="table-auto w-full border-collapse rounded-b-lg overflow-hidden">
                <TableHeader>
                  <TableRow className="bg-blue-500">
                    <TableHead className="px-3 py-2 border text-white">Nama Mobil</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Total Sewa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {carsBooking?.data.map((car: CarsBooking) => (
                    <TableRow key={car.nama_mobil} className="odd:bg-white even:bg-slate-200">
                      <TableCell className="px-3 py-2 border">{car.nama_mobil}</TableCell>
                      <TableCell className="px-3 py-2 border">{car.total_bookings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <hr className="my-10 border border-slate-300" />

          <div className="bg-white rounded-lg border border-blue-300">
            <p className="py-3 px-2 font-semibold">Riwayat Terakhir Penyewaan</p>
            <Table className="table-auto w-full border-collapse rounded-b-lg overflow-hidden">
              <TableHeader>
                <TableRow className="bg-blue-500">
                  <TableHead className="px-3 py-2 border text-white">No Booking</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Nama Pemesan</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Nama Mobil</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Tempat Pengambilan</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Tanggal Sewa</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Jam Mulai</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Jam Kembali</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Status</TableHead>
                  <TableHead className="px-3 py-2 border text-white">Tanggal Pesan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyBookings?.data.map((booking: Booking) => (
                  <TableRow key={booking.id} className="odd:bg-white even:bg-slate-200">
                    <TableCell className="px-3 py-2 border">{booking.id}</TableCell>
                    <TableCell className="px-3 py-2 border">{booking.full_name}</TableCell>
                    <TableCell className="px-3 py-2 border">{booking.car_name}</TableCell>
                    <TableCell className="px-3 py-2 border">{booking.tempat_ambil}</TableCell>
                    <TableCell className="px-3 py-2 border">{`${new Date(booking.start_date).toLocaleDateString()} - ${new Date(booking.end_date).toLocaleDateString()}`}</TableCell>
                    <TableCell className="px-3 py-2 border">{booking.start_time}</TableCell>
                    <TableCell className="px-3 py-2 border">{booking.end_time}</TableCell>
                    <TableCell className="px-3 py-2 border">{booking.payment_status}</TableCell>
                    <TableCell className="px-3 py-2 border">{`${new Date(booking.booking_date).toLocaleDateString()}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      ) : (
        router.push('/login')
      )}
    </>
  );
}
