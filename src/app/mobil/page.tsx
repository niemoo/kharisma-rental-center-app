'use client';

import { useEffect, useState } from 'react';
import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar';
import CarsCard from '@/components/layout/CarsCard';
import GetDate from '@/components/layout/GetDate';

export default function Mobil() {
  const [carsData, setCarsData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3001/cars');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        console.log(data); // Log the fetched data
        setCarsData(data.data); // Set the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <ReduxProvider>
      <Navbar />
      <main className="max-w-screen-xl mx-auto md:p-0 md:pt-5 p-5">
        <GetDate />
        <div className="grid md:grid-cols-3 gap-5">
          {carsData?.map((data: any) => (
            <CarsCard
              key={data?.id}
              carId={data?.id}
              carName={data?.name}
              carImage={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${data?.image}`} // Fixed URL format
              carCategory={data?.category_id}
              carYear={data?.year}
              carCapacity={data?.capacity}
              carTransmission={data?.transmission}
              carPrice_12={data?.price_12}
              carPrice_24={data?.price_24}
            />
          ))}
        </div>
      </main>
    </ReduxProvider>
  );
}
