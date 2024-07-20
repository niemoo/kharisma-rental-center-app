'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import CarsCard from '@/components/layout/CarsCard';
import { useAppSelector } from '@/store/store';

export default function CarsList() {
  const [carsData, setCarsData] = useState<any[]>([]);
  const startDate = useAppSelector((state) => state.app.startDate);
  const endDate = useAppSelector((state) => state.app.endDate);

  const fetchData = async () => {
    try {
      const response = await axios
        .get('http://api.kharisma-rental-center.my.id/cars/available', {
          params: {
            start_date: startDate,
            end_date: endDate,
          },
        })
        .then((response) => {
          setCarsData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
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
    </>
  );
}
