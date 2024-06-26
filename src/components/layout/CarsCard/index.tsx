import Image from 'next/image';
import Link from 'next/link';
import { FaUsers } from 'react-icons/fa';
import { TbManualGearbox } from 'react-icons/tb';
import { Tb12Hours } from 'react-icons/tb';
import { Tb24Hours } from 'react-icons/tb';

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
  console.log(carImage);
  return (
    <div className="w-full md:flex items-center gap-3 border border-black rounded-lg shadow-lg py-2 px-3 bg-white">
      <Image src={carImage} alt="" width={5000} height={5000} className="rounded w-36 h-24 mb-5" />

      <div>
        <h3>{carName}</h3>
        <h4 className="text-sm text-zinc-500">
          {carCategory} | {carYear}
        </h4>
        <hr className="my-3" />

        <div className="mb-5">
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <FaUsers className="text-3xl" />
              <h4>{carCapacity} Orang</h4>
            </div>

            <div className="flex items-center gap-2">
              <Tb12Hours className="text-3xl" />
              <h4>Rp {carPrice_12}</h4>
            </div>
          </div>

          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <TbManualGearbox className="text-3xl" />
              <h4>{carTransmission}</h4>
            </div>

            <div className="flex items-center gap-2">
              <Tb24Hours className="text-3xl" />
              <h4>Rp {carPrice_24}</h4>
            </div>
          </div>
        </div>

        <Link href={`/mobil/${carId}`}>
          <button className="bg-green-500 hover:bg-green-700 text-white text-center w-full p-2 rounded-lg">Pesan</button>
        </Link>
      </div>
    </div>
  );
}
