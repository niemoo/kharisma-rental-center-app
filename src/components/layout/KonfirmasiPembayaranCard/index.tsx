'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { BiSolidHelpCircle } from 'react-icons/bi';
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

export default function KonfirmasiPembayaranCard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.app.isLogin);
  const userId = useAppSelector((state) => state.app.userId);
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
      toast.success('Data Berhasil Terupdate');
      router.push('/pemesanan/pembayaran');
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
              <div className="p-5 border border-gray-300 rounded-lg">
                <h3 className="text-xl font-semibold">Konfirmasi Pembayaran</h3>
                <hr className="my-3" />
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <p className="font-semibold w-1/2">Nama Lengkap</p>
                    <p className="font-semibold w-1/2 text-right">{userFullName}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold w-1/2">Nama Mobil</p>
                    <p className="font-semibold w-1/2 text-right">{carName}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold w-1/2">Alamat Pemesan</p>
                    <p className="font-semibold w-1/2 text-right">{alamat}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold w-1/2">Instagram</p>
                    <p className="font-semibold w-1/2 text-right">{instagram}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold w-1/2">Tujuan Sewa</p>
                    <p className="font-semibold w-1/2 text-right">{tujuanSewa}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold w-1/2">Rute Perjalanan</p>
                    <p className="font-semibold w-1/2 text-right">{rute}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold w-1/2">Jaminan</p>
                    <p className="font-semibold w-1/2 text-right">{jaminan}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold w-1/2">Tanggal Mulai Sewa</p>
                    <p className="font-semibold w-1/2 text-right">{startDate}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold w-1/2">Tanggal Akhir Sewa</p>
                    <p className="font-semibold w-1/2 text-right">{endDate}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold w-1/2">Jam Mulai Sewa</p>
                    <p className="font-semibold w-1/2 text-right">{startTime}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold w-1/2">Jam Akhir Sewa</p>
                    <p className="font-semibold w-1/2 text-right">{endTime}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold w-1/2">Tempat Pengambilan Mobil</p>
                    <p className="font-semibold w-1/2 text-right">{tempatAmbil}</p>
                  </div>
                </div>
                <hr className="my-5" />
                <div className="flex justify-between">
                  <div className="grid gap-3">
                    <p className="font-semibold">Total Harga</p>
                    <div className="flex items-center gap-3">
                      <BiSolidHelpCircle className="text-blue-500" />
                      <p className="text-sm">Anda dapat membayar DP terlebih dahulu sebesar 50%</p>
                    </div>
                  </div>
                  <p className="font-semibold">{parseInt(totalPrice).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
                </div>
                <div className="flex justify-end mt-10">
                  <button onClick={onBooking} className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-5 rounded-lg">
                    Bayar
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
