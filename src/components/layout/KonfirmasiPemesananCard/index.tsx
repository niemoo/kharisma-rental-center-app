'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { BiSolidHelpCircle } from 'react-icons/bi';
import { FaCircleDot } from 'react-icons/fa6';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import {
  setAlamat,
  setBookingId,
  setCarName,
  setEndDate,
  setEndTime,
  setInstagram,
  setIsBook,
  setJaminan,
  setRute,
  setSelectedCarId,
  setStartDate,
  setStartTime,
  setTempatAmbil,
  setTotalDays,
  setTotalPrice,
  setTujuanSewa,
  setUserFullname,
} from '@/store/appSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function KonfirmasiPemesananCard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.app.isLogin);
  const userId = useAppSelector((state) => state.app.userId);
  const bookingId = useAppSelector((state) => state.app.bookingId);
  const isBook = useAppSelector((state) => state.app.isBook);
  const userFullName = useAppSelector((state) => state.app.userFullname);
  const selectedCarId = useAppSelector((state) => state.app.selectedCarId);
  const carName = useAppSelector((state) => state.app.carName);
  const alamat = useAppSelector((state) => state.app.alamat);
  const instagram = useAppSelector((state) => state.app.instagram);
  const tujuanSewa = useAppSelector((state) => state.app.tujuanSewa);
  const rute = useAppSelector((state) => state.app.rute);
  const jaminan = useAppSelector((state) => state.app.jaminan);
  const startDate = useAppSelector((state) => state.app.startDate);
  const endDate = useAppSelector((state) => state.app.endDate);
  const startTime = useAppSelector((state) => state.app.startTime);
  const endTime = useAppSelector((state) => state.app.endTime);
  const tempatAmbil = useAppSelector((state) => state.app.tempatAmbil);
  const totalPrice = useAppSelector((state) => state.app.totalPrice);

  const onBooking = async () => {
    try {
      const res = await fetch('http://localhost:3001/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          user_fullname: userFullName,
          car_id: selectedCarId,
          car_name: carName,
          alamat: alamat,
          instagram: instagram,
          tujuan_sewa: tujuanSewa,
          rute: rute,
          jaminan: jaminan,
          total_price: totalPrice,
          tempat_ambil: tempatAmbil,
          start_time: startTime,
          end_time: endTime,
          start_date: startDate,
          end_date: endDate,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || 'Registration failed');
      }

      dispatch(setUserFullname(''));
      dispatch(setCarName(''));
      dispatch(setAlamat(''));
      dispatch(setInstagram(''));
      dispatch(setTujuanSewa(''));
      dispatch(setRute(''));
      dispatch(setJaminan(''));
      dispatch(setTotalPrice(''));
      dispatch(setStartTime(''));
      dispatch(setEndTime(''));
      dispatch(setStartDate(''));
      dispatch(setEndDate(''));
      dispatch(setTempatAmbil(''));
      dispatch(setTotalDays(0));
      dispatch(setSelectedCarId(0));
      dispatch(setIsBook(false));

      const response = await res.json();

      dispatch(setBookingId(response.data.booking_id));
      toast.success('Pemesanan Berhasil');
      router.push(`/pembayaran/${bookingId}`);
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  return (
    <>
      {!isLogin ? (
        router.push('/login')
      ) : (
        <>
          {!isBook ? (
            router.push('/pemesanan')
          ) : (
            <>
              <ToastContainer />
              <div className="mb-5">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink className="text-zinc-100" href="/mobil">
                        Mobil
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink className="text-zinc-100" href={`/mobil/${selectedCarId}`}>
                        Detail Mobil
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink className="text-zinc-100" href={`/pemesanan`}>
                        Form Pemesanan
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-zinc-200">Konfirmasi Pemesanan</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="p-5 mb-20 bg-white border border-gray-300 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-blue-900">Konfirmasi Pemesanan</h3>
                <hr className="border border-r-2 border-gray-200 mt-5" />
                <div className="md:flex">
                  <div className="border border-transparent border-r-2 md:border-r-gray-200 md:w-2/3">
                    <div className="grid gap-3 md:px-3 py-5 w-full">
                      <div className="grid gap-1 w-full">
                        <p className="font-semibold text-lg text-zinc-950">Nama Lengkap</p>
                        <div className="flex items-center">
                          <FaCircleDot className="text-blue-600" />
                          <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{userFullName}</p>
                        </div>
                      </div>
                      <hr className="border border-r-2" />
                      <div className="grid gap-1 w-full">
                        <p className="font-semibold text-lg text-zinc-950">Nama Mobil</p>
                        <div className="flex items-center">
                          <FaCircleDot className="text-blue-600" />
                          <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{carName}</p>
                        </div>
                      </div>
                      <hr className="border border-r-2" />
                      <div className="grid gap-1 w-full">
                        <p className="font-semibold text-lg text-zinc-950">Alamat Pemesan</p>
                        <div className="flex items-center">
                          <FaCircleDot className="text-blue-600" />
                          <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{alamat}</p>
                        </div>
                      </div>
                      <hr className="border border-r-2" />
                      <div className="grid gap-1 w-full">
                        <p className="font-semibold text-lg text-zinc-950">Instagram</p>
                        <div className="flex items-center">
                          <FaCircleDot className="text-blue-600" />
                          <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{instagram}</p>
                        </div>
                      </div>
                      <hr className="border border-r-2" />
                      <div className="grid gap-1 w-full">
                        <p className="font-semibold text-lg text-zinc-950">Tujuan Sewa</p>
                        <div className="flex items-center">
                          <FaCircleDot className="text-blue-600" />
                          <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{tujuanSewa}</p>
                        </div>
                      </div>
                      <hr className="border border-r-2" />
                      <div className="grid gap-1 w-full">
                        <p className="font-semibold text-lg text-zinc-950">Rute Perjalanan</p>
                        <div className="flex items-center">
                          <FaCircleDot className="text-blue-600" />
                          <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{rute}</p>
                        </div>
                      </div>
                      <hr className="border border-r-2" />
                      <div className="grid gap-1 w-full">
                        <p className="font-semibold text-lg text-zinc-950">Jaminan</p>
                        <div className="flex items-center">
                          <FaCircleDot className="text-blue-600" />
                          <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{jaminan}</p>
                        </div>
                      </div>
                      <hr className="border border-r-2" />
                      <div className="grid gap-1 w-full">
                        <p className="font-semibold text-lg text-zinc-950">Tanggal Mulai Sewa</p>
                        <div className="flex items-center">
                          <FaCircleDot className="text-blue-600" />
                          <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{startDate}</p>
                        </div>
                      </div>
                      <hr className="border border-r-2" />
                      <div className="grid gap-1 w-full">
                        <p className="font-semibold text-lg text-zinc-950">Tanggal Akhir Sewa</p>
                        <div className="flex items-center">
                          <FaCircleDot className="text-blue-600" />
                          <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{endDate}</p>
                        </div>
                      </div>
                      <hr className="border border-r-2" />
                      <div className="grid gap-1 w-full">
                        <p className="font-semibold text-lg text-zinc-950">Jam Mulai Sewa</p>
                        <div className="flex items-center">
                          <FaCircleDot className="text-blue-600" />
                          <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{startTime}</p>
                        </div>
                      </div>
                      <hr className="border border-r-2" />
                      <div className="grid gap-1 w-full">
                        <p className="font-semibold text-lg text-zinc-950">Jam Akhir Sewa</p>
                        <div className="flex items-center">
                          <FaCircleDot className="text-blue-600" />
                          <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{endTime}</p>
                        </div>
                      </div>
                      <hr className="border border-r-2" />
                      <div className="grid gap-1 w-full">
                        <p className="font-semibold text-lg text-zinc-950">Tempat Pengambilan Mobil</p>
                        <div className="flex items-center">
                          <FaCircleDot className="text-blue-600" />
                          <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{tempatAmbil}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between md:px-3 py-5 md:w-1/3">
                    <div className="grid gap-3 h-fit">
                      <hr className="md:border-transparent border border-r-2" />
                      <div className="flex justify-between">
                        <p className="font-semibold">Total Harga :</p>
                        <p className="font-semibold">{parseInt(totalPrice).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                      </div>
                      <div className="mt-5">
                        <button onClick={onBooking} className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-5 rounded-lg">
                          Bayar
                        </button>
                      </div>
                      <hr className="mt-10" />
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
            </>
          )}
        </>
      )}
    </>
  );
}
