import Image from 'next/image';
import Link from 'next/link';
import { FaUsers } from 'react-icons/fa';
import { TbManualGearbox } from 'react-icons/tb';
import { Tb12Hours } from 'react-icons/tb';
import { Tb24Hours } from 'react-icons/tb';

export default function CarsCard({ foto }: { foto: any }) {
  return (
    <div className="w-full border border-black rounded-lg shadow-lg py-2 px-3 bg-white">
      <Image src={foto} alt="" className="rounded w-full mb-5" />
      <h3>Toyota Agya</h3>
      <h4 className="text-sm text-zinc-500">City Car | 2020</h4>
      <hr className="my-3" />

      <div className="mb-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <FaUsers className="text-3xl" />
            <h4>4 Orang</h4>
          </div>

          <div className="flex items-center gap-3">
            <Tb12Hours className="text-3xl" />
            <h4>Rp 220.000</h4>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <TbManualGearbox className="text-3xl" />
            <h4>Manual</h4>
          </div>

          <div className="flex items-center gap-3">
            <Tb24Hours className="text-3xl" />
            <h4>Rp 440.000</h4>
          </div>
        </div>
      </div>

      <Link href={`/mobil/1`}>
        <button className="bg-green-500 hover:bg-green-700 text-white text-center w-full p-2 rounded-lg">Pesan</button>
      </Link>
    </div>
  );
}
