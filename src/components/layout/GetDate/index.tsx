'use client';

import { useState, useEffect, useRef } from 'react';
import { setTotalDay } from '@/store/authSlice';
import { useAppDispatch } from '@/store/store';

export default function GetDate() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const [daysBetween, setDaysBetween] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const start_dateRef = useRef<HTMLInputElement>(null);
  const end_dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (start_dateRef.current) {
      start_dateRef.current.value = startDate;
      localStorage.setItem('start_date', startDate);
    }
    if (end_dateRef.current) {
      end_dateRef.current.value = endDate;
      localStorage.setItem('end_date', endDate);
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // Jika perbedaan hari adalah 0, maka set totalDays menjadi 1
      if (diffDays == 0) {
        diffDays = 1;
      }

      dispatch(setTotalDay(diffDays));
    } else {
      dispatch(setTotalDay(1));
    }
  }, [startDate, endDate]);

  return (
    <div>
      <input type="date" name="start_date" id="start_date" ref={start_dateRef} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" name="end_date" id="end_date" ref={end_dateRef} onChange={(e) => setEndDate(e.target.value)} />
    </div>
  );
}
