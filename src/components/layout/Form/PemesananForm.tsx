'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { CiCircleQuestion } from 'react-icons/ci';
import useSnap from '@/hooks/snap';

export default function PemesananForm() {
  const router = useRouter();
  const selectedCarId = useAppSelector((state) => state.auth.selectedCarId);
  const authState = useAppSelector((state) => state.auth.authState);
  const totalDay = useAppSelector((state) => state.auth.totalDay);
  const [snapShow, setSnapShow] = useState<boolean>(false);
  const [carData, setCarData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInKantor, setIsInKantor] = useState<boolean>(false);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null); // State for selected price

  const { snapEmbed } = useSnap();

  const namaRef = useRef<HTMLInputElement>(null);
  const alamatRef = useRef<HTMLInputElement>(null);
  const instagramRef = useRef<HTMLInputElement>(null);
  const tujuanSewaRef = useRef<HTMLInputElement>(null);
  const ruteRef = useRef<HTMLInputElement>(null);
  const jaminanRef = useRef<HTMLInputElement>(null);
  const jamMulaiRef = useRef<HTMLInputElement>(null);
  const jamAkhirRef = useRef<HTMLInputElement>(null);
  const tempatAmbilRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Only fetch data if selectedCarId exists
    if (selectedCarId) {
      const fetchData = async () => {
        try {
          const res = await fetch(`http://localhost:3001/cars/${selectedCarId}`);
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await res.json();
          setCarData(data.data[0]); // Set the fetched data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [authState, selectedCarId]); // Include selectedCarId as dependency

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch('http://localhost:3001/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 1,
        user_fullname: namaRef.current?.value,
        car_id: carData?.id,
        car_name: carData?.name,
        alamat: alamatRef.current?.value,
        instagram: instagramRef.current?.value,
        tujuan_sewa: tujuanSewaRef.current?.value,
        rute: ruteRef.current?.value,
        jaminan: jaminanRef.current?.value,
        total_price: selectedPrice, // Use state for selected price
        tempat_ambil: isInKantor ? 'Kantor KRC' : tempatAmbilRef.current?.value,
        start_time: jamMulaiRef.current?.value,
        end_time: jamAkhirRef.current?.value,
        start_date: localStorage.getItem('start_date'),
        end_date: localStorage.getItem('end_date'),
      }),
    });

    if (!res.ok) {
      const errorData = await res.json(); // Mengonversi responsenya menjadi objek JSON
      throw new Error(errorData?.message || 'Registration failed');
    }

    const response = await res.json();
    setSnapShow(true);

    snapEmbed(response.data.token, 'snap-container', {
      onSuccess: (result: any) => {
        console.log('success', result);
        setSnapShow(false);
      },
    });

    // router.push(`/invoice`);
  };

  return (
    <>
      {authState ? (
        <>
          {!snapShow && (
            <div>
              <div className="md:w-1/2 mx-auto mb-5">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/mobil">Mobil</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/mobil/${selectedCarId}`}>Detail Mobil</BreadcrumbLink>
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
                              Mohon perhatikan bahwa kami tidak dapat menerima pengisian KTP / KK pada formulir ini, karena kedua dokumen tersebut sudah termasuk sebagai jaminan yang wajib diberikan. Harap gunakan dokumen penting lainnya
                              seperti SIM C, KTM, NPWP, BPJS, KIS, atau ID Card untuk mengisi kolom ini.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogAction>Okay</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="jaminan" className="after:content-['*'] after:ml-0.5 after:text-red-500">
                      Jam Sewa
                    </Label>

                    <Select onValueChange={(value) => setSelectedPrice(value)} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Jam Sewa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Jam Sewa</SelectLabel>
                          <SelectItem value={`${carData?.price_12}`}>12 Jam - {carData?.price_12.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</SelectItem>
                          <SelectItem value={`${carData?.price_24}`}>24 Jam - {carData?.price_24.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</SelectItem>
                          <SelectItem value={`${carData?.price_fullday}`}>Fullday (07.00-22.00) - {carData?.price_fullday.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                      <input required type="radio" id="tempatAmbilKantor" name="tempatAmbil" checked={isInKantor} onChange={() => setIsInKantor(true)} value="Kantor KRC" />
                      <label htmlFor="tempatAmbilKantor" className="text-sm ml-4">
                        Jl. Arjuna, Dusun IV, Pucangan, Kec. Kartasura, Kabupaten Sukoharjo, Jawa Tengah 57168{' '}
                        <Link href="https://maps.app.goo.gl/mFnwxdx3qC1mF9Mp8" target="_blank" className="underline text-blue-500 hover:text-blue-800">
                          (Kantor Kharisma Rental Center)
                        </Link>
                      </label>
                    </div>
                    <div className="flex items-center mt-3">
                      <input required type="radio" id="tempatAmbilCustom" name="tempatAmbil" checked={!isInKantor} onChange={() => setIsInKantor(false)} />
                      <Input type="text" placeholder="Hanya bisa di daerah sekitar UMS" className="ml-4" ref={tempatAmbilRef} />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-5 rounded-lg">
                      Pesan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="md:w-1/2 mx-auto flex justify-center">
            <div id="snap-container"></div>
          </div>
        </>
      ) : (
        router.push('/login')
      )}
    </>
  );
}
