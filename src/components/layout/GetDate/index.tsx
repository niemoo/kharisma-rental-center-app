'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setStartDate, setEndDate, setTotalDays } from '@/store/appSlice';
import { useRouter } from 'next/navigation';

export default function GetDate() {
  const router = useRouter();
  const [startDate, setStartDateState] = useState('');
  const [endDate, setEndDateState] = useState('');
  const currentPath = usePathname();
  const dispatch = useAppDispatch();
  const start_date = useAppSelector((state) => state.app.startDate);
  const end_date = useAppSelector((state) => state.app.endDate);

  const start_dateRef = useRef<HTMLInputElement>(null);
  const end_dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (start_dateRef.current?.value && end_dateRef.current?.value) {
      const start = new Date(start_dateRef.current?.value);
      const end = new Date(end_dateRef.current?.value);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 0) {
        diffDays = 1;
      }
      dispatch(setTotalDays(diffDays));
    } else {
      dispatch(setTotalDays(1));
    }
  }, [startDate, endDate, dispatch]);

  const setDate = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setStartDate(start_dateRef.current?.value ?? ''));
    dispatch(setEndDate(end_dateRef.current?.value ?? ''));
    if (currentPath == '/mobil/available') {
      window.location.reload();
    } else {
      router.push('/mobil/available');
    }
  };

  return (
    <div className="md:w-1/2 mx-auto">
      <form action="" onSubmit={setDate}>
        <div className="md:flex gap-5 items-center">
          <div className="grid">
            <p className="text-center text-white font-semibold">Mulai Sewa</p>
            <input required type="date" name="start_date" id="start_date" ref={start_dateRef} onChange={(e) => setStartDateState(e.target.value)} className="border border-gray-500 rounded-lg px-3 py-1 shadow-md w-full" />
          </div>
          <div className="grid">
            <p className="text-center text-white font-semibold">Akhir Sewa</p>
            <input required type="date" name="end_date" id="end_date" ref={end_dateRef} onChange={(e) => setEndDateState(e.target.value)} className="border border-gray-500 rounded-lg px-3 py-1 shadow-md w-full" />
          </div>
        </div>
        <button type="submit" className="w-full flex justify-center mt-5 py-2 bg-blue-600 hover:bg-blue-700 text-white border border-blue-400 rounded-lg shadow-lg">
          Cek Ketersediaan
        </button>
      </form>
    </div>
  );
}
