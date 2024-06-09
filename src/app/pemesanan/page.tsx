'use client';

import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { CiCircleQuestion } from 'react-icons/ci';
import Link from 'next/link';

export default function Pemesanan() {
  const [isInKantor, setIsInKantor] = useState<boolean>(false);
  const namaRef = useRef<HTMLInputElement>(null);
  const alamatRef = useRef<HTMLInputElement>(null);
  const instagramRef = useRef<HTMLInputElement>(null);
  const tujuanSewaRef = useRef<HTMLInputElement>(null);
  const ruteRef = useRef<HTMLInputElement>(null);
  const jaminanRef = useRef<HTMLInputElement>(null);
  const jamMulaiRef = useRef<HTMLInputElement>(null);
  const jamAkhirRef = useRef<HTMLInputElement>(null);
  const tempatAmbilRef = useRef<HTMLInputElement>(null);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('Nama', namaRef.current?.value ?? '');
    localStorage.setItem('Alamat', alamatRef.current?.value ?? '');
    localStorage.setItem('Instagram', instagramRef.current?.value ?? '');
    localStorage.setItem('Tujuan Sewa', tujuanSewaRef.current?.value ?? '');
    localStorage.setItem('Rute', ruteRef.current?.value ?? '');
    localStorage.setItem('Jaminan', jaminanRef.current?.value ?? '');
    localStorage.setItem('Jam Mulai', jamMulaiRef.current?.value ?? '');
    localStorage.setItem('Jam Akhir', jamAkhirRef.current?.value ?? '');
    localStorage.setItem('Tempat Ambil', isInKantor ? 'Kantor KRC' : tempatAmbilRef.current?.value ?? '');
  };

  return (
    <main className="max-w-screen-xl mx-auto md:mt-10 md:p-0 my-14 p-5">
      <div className="md:w-1/2 mx-auto mb-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/mobil">Mobil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/mobil/${localStorage.getItem('selectedCarId')}`}>Detail Mobil</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Form Pemesanan</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="md:w-1/2 mx-auto px-5 py-6 border border-gray-300 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Form Pemesanan</h3>
        <hr className="my-5" />
        <form onSubmit={submitForm} className="grid w-full gap-5">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="nama" className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Nama
            </Label>
            <Input required type="text" id="nama" placeholder="Masukkan nama lengkap" ref={namaRef} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="alamat" className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Alamat
            </Label>
            <Input required type="text" id="alamat" placeholder="Masukkan alamat lengkap" ref={alamatRef} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="instagram" className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Instagram
            </Label>
            <Input required type="text" id="instagram" placeholder='Contoh: @namainstagram (Isi "-" jika tidak memiliki)' ref={instagramRef} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="tujuanSewa" className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Tujuan Sewa
            </Label>
            <Input required type="text" id="tujuanSewa" placeholder="Masukkan tujuan sewa" ref={tujuanSewaRef} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="rute" className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Rute Perjalanan
            </Label>
            <Input required type="text" id="rute" placeholder="Contoh : Solo - Yogyakarta - Malang" ref={ruteRef} />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="jaminan" className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Jaminan
            </Label>
            <div className="flex gap-3 items-center">
              <Input required type="text" id="jaminan" placeholder="Masukkan kartu yang akan dijadikan jaminan" ref={jaminanRef} />
              <AlertDialog>
                <AlertDialogTrigger>
                  <CiCircleQuestion className="text-2xl text-blue-600 hover:text-blue-800" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Syarat Ketentuan</AlertDialogTitle>
                    <AlertDialogDescription>
                      Mohon perhatikan bahwa kami tidak dapat menerima pengisian KTP / KK pada formulir ini, karena kedua dokumen tersebut sudah termasuk sebagai jaminan yang wajib diberikan. Harap gunakan dokumen penting lainnya seperti
                      SIM C, KTM, NPWP, BPJS, KIS, atau ID Card untuk mengisi kolom ini.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>Okay</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="jamMulai" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Jam Mulai Sewa
              </Label>
              <Input required type="text" id="jamMulai" placeholder="Contoh : 08:00" ref={jamMulaiRef} />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="jamAkhir" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                Jam Akhir Sewa
              </Label>
              <Input required type="text" id="jamAkhir" placeholder="Contoh : 17:00" ref={jamAkhirRef} />
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="tempatAmbil" className="after:content-['*'] after:ml-0.5 after:text-red-500">
              Tempat Pengambilan Mobil
            </Label>
            <div className="flex items-center">
              <input required type="radio" id="tempatAmbilKantor" name="tempatAmbil" ref={tempatAmbilRef} checked={isInKantor} onChange={() => setIsInKantor(true)} value="Kantor KRC" />
              <label htmlFor="tempatAmbilKantor" className="text-sm ml-4">
                Jl. Arjuna, Dusun IV, Pucangan, Kec. Kartasura, Kabupaten Sukoharjo, Jawa Tengah 57168{' '}
                <Link href="https://maps.app.goo.gl/mFnwxdx3qC1mF9Mp8" target="_blank" className="underline text-blue-500 hover:text-blue-800">
                  (Kantor Kharisma Rental Center)
                </Link>
              </label>
            </div>
            <div className="flex items-center mt-3">
              <input required type="radio" id="tempatAmbilCustom" name="tempatAmbil" onChange={() => setIsInKantor(false)} />
              <Input type="text" placeholder="Hanya bisa di daerah sekitar UMS" className="ml-4" ref={tempatAmbilRef} />
            </div>
          </div>
          <div className="flex justify-start">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-5 rounded-lg">
              <Link href=""></Link>
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
