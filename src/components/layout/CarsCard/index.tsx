import Image from 'next/image';
import Link from 'next/link';
import { FaUsers } from 'react-icons/fa';
import { TbManualGearbox } from 'react-icons/tb';
import { Tb12Hours } from 'react-icons/tb';
import { Tb24Hours } from 'react-icons/tb';
import { LuAlertCircle } from 'react-icons/lu';

interface CarsCardProps {
  carId: number;
  carName: string;
  carImage: any;
  carCategory: number;
  carYear: string;
  carCapacity: number;
  carTransmission: string;
  carPrice_12: number;
  carPrice_24: number;
}

export default function CarsCard({ carId, carName, carImage, carCategory, carYear, carCapacity, carTransmission, carPrice_12, carPrice_24 }: CarsCardProps) {
  return (
    <div className="w-full md:flex items-center gap-3 border border-cyan-500 rounded-lg shadow-xl py-2 px-3 bg-white">
      <div className="md:w-1/3 flex justify-center">
        <Image src={carImage} alt="" width={500} height={500} className="rounded w-fit h-24 mb-5" />
      </div>
      <div className="md:w-2/3">
        <div>
          <h3 className="text-lg font-semibold">{carName}</h3>
          <h4 className="text-sm text-zinc-500">
            {carCategory} | {carYear}
          </h4>
          <div className="flex gap-3 items-center mt-2">
            <LuAlertCircle className="text-zinc-500" />
            <h4 className="text-sm text-zinc-500">Warna mobil tidak sama dengan yang ada pada gambar.</h4>
          </div>
          <hr className="my-3 border border-cyan-400" />

          <div className="mb-5">
            <div className="flex justify-between gap-2">
              <div className="flex items-center gap-2">
                <FaUsers className="text-3xl text-cyan-700" />
                <h4>{carCapacity} Orang</h4>
              </div>

              <div className="flex items-center gap-2">
                <Tb12Hours className="text-3xl text-cyan-700" />
                <h4>{carPrice_12.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h4>
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="flex items-center gap-2">
                <TbManualGearbox className="text-3xl text-cyan-700" />
                <h4>{carTransmission}</h4>
              </div>

              <div className="flex items-center gap-2">
                <Tb24Hours className="text-3xl text-cyan-700" />
                <h4>{carPrice_24.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h4>
              </div>
            </div>
          </div>

          <Link href={`/mobil/${carId}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-center w-full p-2 rounded-lg">Pesan</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
