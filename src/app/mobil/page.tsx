'use client';

import { useEffect, useState } from 'react';
import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import CarsCard from '@/components/layout/CarsCard';
import GetDate from '@/components/layout/GetDate';
import Wave from '../../../public/wave.png';
import Footer from '@/components/layout/Footer';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { useMediaQuery } from 'react-responsive';

export default function Mobil() {
  const [carsData, setCarsData] = useState<any>([]);

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1450px)' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://api.kharisma-rental-center.my.id/cars', {
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
      <title>Mobil | KRC</title>
      <Navbar />
      <main className="bg-slate-100">
        <div
          style={
            isLargeScreen
              ? {
                  backgroundImage: `url(${Wave.src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {
                  backgroundImage: `url(${Wave.src})`,
                  backgroundRepeat: 'no-repeat',
                }
          }
        >
          <div className="max-w-screen-md mx-auto md:pb-20 md:pt-5 p-5">
            <GetDate />
            <div className="grid gap-7 mt-10">
              <div className="flex items-center gap-3 bg-white px-5 py-2 rounded-lg border border-cyan-600 shadow-lg">
                <IoMdInformationCircleOutline className="text-2xl text-blue-600 md:w-1/12 w-1/6" />
                <p className="text-sm md:w-full">Silahkan mengecek ketersediaan mobil terlebih dahulu dengan mengisi input tanggal mulai sewa dan akhir sewa.</p>
              </div>
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
        </div>

        <Footer />
      </main>
    </ReduxProvider>
  );
}
