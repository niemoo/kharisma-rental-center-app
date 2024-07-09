'use client';

import { useEffect, useState } from 'react';
import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import CarsCard from '@/components/layout/CarsCard';
import GetDate from '@/components/layout/GetDate';

export default function Mobil() {
  const [carsData, setCarsData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3001/cars', {
          cache: 'no-cache',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
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
      <main className="bg-slate-100">
        <div className="max-w-screen-md mx-auto md:pb-20 md:pt-5 p-5">
          <GetDate />
          <div className="grid gap-7 mt-10">
            {carsData?.map((data: any) => (
              <CarsCard
                key={data?.id}
                carId={data?.id}
                carName={data?.nama_mobil}
                carImage={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${data?.image}`} // Fixed URL format
                carCategory={data?.kategori_mobil}
                carYear={data?.year}
                carCapacity={data?.capacity}
                carTransmission={data?.transmission}
                carPrice_12={data?.price_12}
                carPrice_24={data?.price_24}
              />
            ))}
          </div>
        </div>
      </main>
    </ReduxProvider>
  );
}
