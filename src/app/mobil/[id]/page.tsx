import Image from 'next/image';
import agyaManual1 from '../../../../public/agya-manual-1.jpg';
import { FaUsers } from 'react-icons/fa';
import { TbManualGearbox } from 'react-icons/tb';
import { Tb12Hours } from 'react-icons/tb';
import { Tb24Hours } from 'react-icons/tb';
import { BsFillFuelPumpFill } from 'react-icons/bs';

export default function SpecifiedPage({ params: { id } }: { params: { id: string } }) {
  return (
    <main className="max-w-screen-xl mx-auto md:flex gap-5 p-5 md:py-5 md:px-0">
      <div className="md:w-3/4 border border-black rounded-lg p-5 bg-white">
        {/* <Image src={agyaManual1} alt="" width={5000} height={5000} className="mx-auto md:h-screen w-full md:w-fit rounded-lg" /> */}
        <p>{id}</p>
        <h2 className="text-4xl font-semibold">Toyota Agya</h2>

        <hr className="my-5" />
        <div>
          <div className="flex items-center">
            <div className="border-l-2 border-blue-500 h-6 mr-2 rounded md:block hidden"></div>
            <h3 className="text-2xl font-semibold">Kebijakan Sewa</h3>
          </div>
          <div className="mt-7 ml-5">
            <div className="flex items-center gap-3">
              <BsFillFuelPumpFill className="text-2xl" />
              <h4>Bahan bakar wajib dikembalikan seperti saat mobil diterima.</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 border border-black rounded-lg p-5 bg-white">
        <h2 className="text-3xl font-semibold">Spesifikasi</h2>
        <hr className="my-5" />
        <div className="">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <FaUsers className="text-3xl" />
              <h4>6 Orang</h4>
              {/* <h4>{carCapacity} Orang</h4> */}
            </div>

            <div className="flex items-center gap-3">
              <Tb12Hours className="text-3xl" />
              <h4>Rp 300000</h4>
              {/* <h4>Rp {carPrice_12}</h4> */}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <TbManualGearbox className="text-3xl" />
              <h4>Manual</h4>
              {/* <h4>{carTransmission}</h4> */}
            </div>

            <div className="flex items-center gap-3">
              <Tb24Hours className="text-3xl" />
              <h4>Rp 500000</h4>
              {/* <h4>Rp {carPrice_24}</h4> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
