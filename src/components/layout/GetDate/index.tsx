'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from '@/store/store';
import { setStartDate, setEndDate, setTotalDays } from '@/store/appSlice';

export default function GetDate() {
  const [startDate, setStartDateState] = useState('');
  const [endDate, setEndDateState] = useState('');
  const dispatch = useAppDispatch();

  const start_dateRef = useRef<HTMLInputElement>(null);
  const end_dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (start_dateRef.current) {
      start_dateRef.current.value = startDate;
    }
    if (end_dateRef.current) {
      end_dateRef.current.value = endDate;
    }
    dispatch(setStartDate(startDate));
    dispatch(setEndDate(endDate));

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
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

  return (
    <div>
      <input type="date" name="start_date" id="start_date" ref={start_dateRef} onChange={(e) => setStartDateState(e.target.value)} />
      <input type="date" name="end_date" id="end_date" ref={end_dateRef} onChange={(e) => setEndDateState(e.target.value)} />
    </div>
  );
}
