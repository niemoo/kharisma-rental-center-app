'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaUsers, FaMoneyBillWave, FaRegCalendarCheck } from 'react-icons/fa';
import { TbSteeringWheel, TbManualGearbox, TbPointFilled } from 'react-icons/tb';
import { IoColorPaletteSharp } from 'react-icons/io5';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { MdMoreTime } from 'react-icons/md';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import AddToCartButton from '@/components/layout/Button/AddToCartButton';
import { LuAlertCircle } from 'react-icons/lu';

interface SpecifiedMobilProps {
  id: number;
}

async function getData(id: number) {
  const res = await fetch(`https://api.kharisma-rental-center.my.id/cars/${id}`);
  const data = await res.json();
  return data;
}

export default function SpecifiedMobil({ id }: SpecifiedMobilProps) {
  const [carData, setCarData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const formattedPrice12 = carData?.price_12.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  const formattedPrice24 = carData?.price_24.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  const formattedPriceFullday = carData?.price_fullday.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

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
    document.title = `${carData?.name} | Mobil`;
  }, [carData]);

  return (
    <>
      <div className="md:flex mt-5">
        <div className="md:w-1/2 rounded-lg p-5">
          <div className="md:w-2/3 mx-auto">
            <div className="flex justify-between items-center">
              <TbSteeringWheel className="text-5xl w-1/3" />
              <h2 className="text-3xl font-semibold text-white bg-blue-700 pb-2 pt-1 px-5 rounded-3xl w-full text-center">{carData?.name}</h2>
            </div>
            <hr className="my-5" />
            <div>
              <div className="flex items-center">
                <div className="border-l-4 border-blue-600 h-7 mr-2 rounded md:block hidden"></div>
                <h3 className="text-xl font-semibold">Spesifikasi:</h3>
              </div>
              <div className="mt-5">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
                  <FaUsers className="text-3xl text-blue-800" />
                  <h4 className="font-medium">{carData?.capacity} Orang</h4>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
                  <IoColorPaletteSharp className="text-3xl text-blue-800" />
                  <h4 className="font-medium">Warna {carData?.color}</h4>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
                  <TbManualGearbox className="text-3xl text-blue-800" />
                  <h4 className="font-medium">Transmisi {carData?.transmission}</h4>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
                  <FaRegCalendarCheck className="text-3xl text-blue-800" />
                  <h4 className="font-medium">Umur {carData?.year}</h4>
                </div>
                <hr className="my-5" />
                <div className="flex items-center">
                  <div className="border-l-4 border-blue-600 h-7 mr-2 rounded md:block hidden"></div>
                  <h3 className="text-xl font-semibold">Harga:</h3>
                </div>
                <div className="my-5">
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
                    <FaMoneyBillWave className="text-3xl text-blue-800" />
                    <h4 className="font-medium">{formattedPrice12} / 12 jam</h4>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
                    <FaMoneyBillWave className="text-3xl text-blue-800" />
                    <h4 className="font-medium">{formattedPrice24} / 24 jam</h4>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
                    <FaMoneyBillWave className="text-3xl text-blue-800" />
                    <h4 className="font-medium">{formattedPriceFullday} / (07.00-21.00)</h4>
                  </div>
                </div>

                <AddToCartButton carId={carData?.id} />
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 rounded-lg p-5">
          <div className="flex gap-3 items-center mt-2">
            <LuAlertCircle className="text-blue-900" />
            <h4 className="text-sm text-blue-900 underline">Warna mobil tidak sama dengan yang ada pada gambar.</h4>
          </div>
          <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${carData?.image}`} alt="" width={500} height={500} className="mx-auto w-96 h-fit rounded-lg" />
          <div className="mt-36">
            <hr className="my-5" />
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
                    <h4>Jika melewati waktu yang ditentukan, akan ada biaya tambahan sebesar Rp 30.000 / jam.</h4>
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
        </div>
      </div>
    </>
  );
}
