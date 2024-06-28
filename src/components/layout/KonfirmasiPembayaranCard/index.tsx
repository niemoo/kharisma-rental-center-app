'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import useSnap from '@/hooks/snap';
import { setAlamat, setCarName, setEndDate, setEndTime, setInstagram, setJaminan, setRute, setSelectedCarId, setStartDate, setStartTime, setTempatAmbil, setTotalDays, setTotalPrice, setTujuanSewa, setUserFullname } from '@/store/appSlice';

export default function KonfirmasiPembayaranCard() {
  const dispatch = useAppDispatch();
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
  const [snapShow, setSnapShow] = useState<boolean>(false);

  const { snapEmbed } = useSnap();

  const onBooking = async () => {
    try {
      const res = await fetch('http://localhost:3001/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
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
        const errorData = await res.json(); // Mengonversi responsenya menjadi objek JSON
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

      const response = await res.json();
      setSnapShow(true);

      snapEmbed(response.data.token, 'snap-container', {
        onSuccess: (result: any) => {
          console.log('success', result);
          setSnapShow(false);
        },
      });
    } catch (error) {
      console.error('Error : ', error);
    }
  };

  return (
    <>
      {!snapShow && (
        <div className="p-5 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold">Konfirmasi Pembayaran</h3>
          <hr className="my-3" />
          <div className="flex justify-between">
            <div className="md:w-1/2 mx-auto">
              <p>Nama Lengkap</p>
              <p>Nama Mobil</p>
              <p>Alamat Pemesan</p>
              <p>Instagram</p>
              <p>Tujuan Sewa</p>
              <p>Rute Perjalanan</p>
              <p>Jaminan</p>
              <p>Tanggal Mulai Sewa</p>
              <p>Tanggal Akhir Sewa</p>
              <p>Jam Mulai Sewa</p>
              <p>Jam Akhir Sewa</p>
              <p>Tempat Pengambilan Mobil</p>
            </div>
            <div className="md:w-1/2 mx-auto">
              <p>{userFullName}</p>
              <p>{carName}</p>
              <p>{alamat}</p>
              <p>{instagram}</p>
              <p>{tujuanSewa}</p>
              <p>{rute}</p>
              <p>{jaminan}</p>
              <p>{startDate}</p>
              <p>{endDate}</p>
              <p>{startTime}</p>
              <p>{endTime}</p>
              <p>{tempatAmbil}</p>
            </div>
          </div>
          <hr className="my-5" />
          <div className="flex justify-between">
            <p>Total Harga</p>
            <p>{parseInt(totalPrice).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
          </div>
          <div className="flex justify-end mt-10">
            <button onClick={onBooking} className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-5 rounded-lg">
              Bayar
            </button>
          </div>
        </div>
      )}
      <div className="md:w-1/2 mx-auto flex justify-center">
        <div id="snap-container"></div>
      </div>
    </>
  );
}
