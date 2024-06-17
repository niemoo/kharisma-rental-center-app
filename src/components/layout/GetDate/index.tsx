'use client';

import { useState, useEffect, useRef } from 'react';

export default function GetDate() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysBetween, setDaysBetween] = useState<number | null>(null);

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
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysBetween(diffDays);
    } else {
      setDaysBetween(null);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    console.log('Days Between:', daysBetween);
  }, [startDate, endDate, daysBetween]);

  return (
    <div>
      <input type="date" name="start_date" id="start_date" ref={start_dateRef} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" name="end_date" id="end_date" ref={end_dateRef} onChange={(e) => setEndDate(e.target.value)} />
      {daysBetween !== null && (
        <div>
          <p>Days Between: {daysBetween}</p>
        </div>
      )}
    </div>
  );
}
