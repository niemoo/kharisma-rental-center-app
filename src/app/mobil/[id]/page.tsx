import Image from 'next/image';
import agyaManual1 from '../../../../public/agya-manual-1.jpg';
import { FaUsers } from 'react-icons/fa';
import { TbManualGearbox, Tb12Hours, Tb24Hours, TbPointFilled } from 'react-icons/tb';
import { IoColorPaletteSharp } from 'react-icons/io5';
import { BsFillFuelPumpFill } from 'react-icons/bs';
import { MdMoreTime } from 'react-icons/md';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

async function getData(id: number) {
  const res = await fetch(`http://localhost:3001/cars/${id}`);
  const data = await res.json();
  return data;
}

export default async function SpecifiedPage({ params: { id } }: { params: { id: number } }) {
  const carData = await getData(id);
  const data = carData.data[0];
  const formattedPrice12 = data.price_12.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
  const formattedPrice24 = data.price_24.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });

  console.log(data);

  return (
    <main className="max-w-screen-lg mx-auto p-5 py-5 md:px-0">
      <div className="md:flex gap-5 ">
        <div className="md:w-1/2 rounded-lg p-5">
          <div className="flex items-center">
            <div className="border-l-4 border-blue-600 h-8 mr-2 rounded md:block hidden"></div>
            <h2 className="text-3xl font-semibold">{data.name}</h2>
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

          <Link href={`/mobil/${id}/pemesanan`} className="border border-black button-48">
            <span>Pesan Mobil</span>
          </Link>

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

              {/* <div className="flex items-center gap-3">
                <Tb24Hours className="text-3xl" />
                <h4>Rp 500000</h4>
              </div> */}
            </div>
          </div>
        </div>
        <div className="md:w-1/2 rounded-lg p-5">
          <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${data.image}`} alt="" width={5000} height={5000} className="mx-auto w-96 h-fit rounded-lg" />
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
  );
}
