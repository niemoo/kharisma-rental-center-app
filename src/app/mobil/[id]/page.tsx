'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ReduxProvider from '@/store/redux-provider';
import { FaUsers } from 'react-icons/fa';
import { TbManualGearbox, Tb12Hours, Tb24Hours, TbPointFilled } from 'react-icons/tb';
import { IoColorPaletteSharp } from 'react-icons/io5';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { MdMoreTime } from 'react-icons/md';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import AddToCartButton from '@/components/layout/Button/AddToCartButton';
import Navbar from '@/components/layout/Navbar';
import MobilBreadcrumb from '@/components/layout/Breadcrumb/mobilBreadcrumb';

async function getData(id: number) {
  const res = await fetch(`http://localhost:3001/cars/${id}`);
  const data = await res.json();
  return data;
}

export default function SpecifiedPage({ params: { id } }: { params: { id: number } }) {
  const [carData, setCarData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const formattedPrice12 = carData?.price_12?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  const formattedPrice24 = carData?.price_12?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

  useEffect(() => {
    if (id) {
      getData(id)
        .then((data) => setCarData(data.data[0]))
        .catch((err) => setError('Failed to fetch data'));
    } else {
      setError('No car ID found in local storage');
    }
  }, []);
  useEffect(() => {
    if (carData) {
      console.log(carData.price_12);
    }
  }, [carData]);

  return (
    <ReduxProvider>
      <Navbar />
      <MobilBreadcrumb />
      <main className="max-w-screen-lg mx-auto p-5 py-5 md:px-0">
        <div className="md:flex gap-5">
          <div className="md:w-1/2 rounded-lg p-5">
            <div className="flex items-center">
              <div className="border-l-4 border-blue-600 h-8 mr-2 rounded md:block hidden"></div>
              <h2 className="text-3xl font-semibold">{carData?.name}</h2>
            </div>
            <hr className="my-5" />
            <div className="">
              <div className="flex items-center gap-3">
                <Tb12Hours className="text-3xl" />
                <h4>{formattedPrice12} / 12 jam</h4>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <Tb24Hours className="text-3xl" />
                <h4>{formattedPrice24} / 24 jam</h4>
              </div>
            </div>

            <AddToCartButton carId={carData?.id} />

            <div className="">
              <h3>Spesifikasi</h3>
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <FaUsers className="text-3xl" />
                  <h4>6 Orang</h4>
                </div>

                <div className="flex items-center gap-3">
                  <TbManualGearbox className="text-3xl" />
                  <h4>Manual</h4>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <IoColorPaletteSharp className="text-3xl" />
                  <h4>Merah</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 rounded-lg p-5">
            <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${carData?.image}`} alt="" width={5000} height={5000} className="mx-auto w-96 h-fit rounded-lg" />
          </div>
        </div>

        <div className="md:w-1/2 mx-auto mt-44">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Kebijakan Sewa</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center gap-3 mt-5">
                  <BsFillFuelPumpFill className="text-2xl" />
                  <h4>Bahan bakar wajib dikembalikan seperti saat mobil diterima.</h4>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <MdMoreTime className="text-3xl" />
                  <h4>Jika melewati waktu yang ditentukan, akan ada biaya tambahan sebesar Rp 30.000 per jam.</h4>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Persyaratan Sewa</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center gap-3 mt-5">
                  <TbPointFilled className="text-xl" />
                  <h4>Memiliki Surat Izin Mengemudi (SIM) jenis A yang masih berlaku.</h4>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <TbPointFilled className="md:text-xl text-md" />
                  <h4>Memiliki Kartu Tanda Penduduk (KTP).</h4>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <TbPointFilled className="text-2xl" />
                  <h4>Melampirkan salah satu dari dokumen berikut: KTM/NPWP/Kartu BPJS/KIS/ID Card/KK.</h4>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <TbPointFilled className="text-xl" />
                  <h4>Memiliki STNK dengan pajak yang masih berlaku, minimal tahun 2013.</h4>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </ReduxProvider>
  );
}
