'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCarsData from '@/components/layout/AdminCard/AddCarsData';
import AddCarsCategoryData from '@/components/layout/AdminCard/AddCarsCategoryData';
import { useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';

interface Cars {
  id: number;
  nama_mobil: string;
  kategori_mobil: string;
  transmission: string;
  capacity: string;
  color: string;
  year: string;
  image: string;
  price_12: number;
  price_24: number;
  price_fullday: number;
}

interface Category {
  id: number;
  name: string;
}

function formatRupiah(number: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
}

export default function AdminDashboardCars() {
  const [file, setFile] = useState<File>();
  const [selectedCar, setSelectedCar] = useState<Cars | null>(null);
  const [datas, setDatas] = useState<Cars[]>([]);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [category, setCategory] = useState<number | null>(null);
  const router = useRouter();
  const isAdmin = useAppSelector((state) => state.app.isAdmin);

  const namaMobilRef = useRef<HTMLInputElement>(null);
  const transmissionRef = useRef<HTMLInputElement>(null);
  const capacityRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const price12Ref = useRef<HTMLInputElement>(null);
  const price24Ref = useRef<HTMLInputElement>(null);
  const priceFulldayRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const carsResponse = await fetch('https://api.kharisma-rental-center.my.id/cars', {
        cache: 'no-cache',
      });
      const carsCategoryResponse = await fetch('https://api.kharisma-rental-center.my.id/cars-category', {
        cache: 'no-cache',
      });

      if (!carsResponse.ok || !carsCategoryResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const cars = await carsResponse.json();
      const carsCategory = await carsCategoryResponse.json();
      setDatas(cars?.data || []); // Menetapkan data ke state
      setCategoryData(carsCategory?.data || []); // Menetapkan data ke state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (car: Cars) => {
    setSelectedCar(car);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitUpdate = async () => {
    const formData = new FormData();
    formData.append('category_id', String(category));
    formData.append('name', namaMobilRef.current?.value || '');
    formData.append('transmission', transmissionRef.current?.value || '');
    formData.append('capacity', capacityRef.current?.value || '');
    formData.append('color', colorRef.current?.value || '');
    formData.append('year', yearRef.current?.value || '');
    formData.append('price_12', price12Ref.current?.value || '');
    formData.append('price_24', price24Ref.current?.value || '');
    formData.append('price_fullday', priceFulldayRef.current?.value || '');
    if (file) {
      formData.append('image', file);
    }

    axios
      .put(`https://api.kharisma-rental-center.my.id/admin/cars/edit/${selectedCar?.id}`, formData)
      .then(() => {
        toast.success('Data Berhasil Terupdate');
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setSelectedCar(null);
        window.location.reload();
      });
  };

  const handleDelete = async () => {
    if (selectedCar) {
      axios
        .delete(`https://api.kharisma-rental-center.my.id/cars/${selectedCar.id}`)
        .then(() => {
          toast.success('Data Berhasil Dihapus');
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setSelectedCar(null);
          window.location.reload();
        });
    }
  };

  return (
    <>
      {isAdmin ? (
        <>
          <ToastContainer />
          <main className="bg-slate-100 w-full py-10 md:px-20 px-5 h-full overflow-auto">
            <h2 className="text-2xl text-slate-800 font-semibold underline underline-offset-8">Halo, Admin!</h2>

            <div className="flex items-center mt-20">
              <AddCarsData categoryData={categoryData} />
              <AddCarsCategoryData />
            </div>
            <div className="bg-white rounded-lg border border-blue-300 mt-10">
              <p className="py-3 px-2 font-semibold">Data Mobil</p>
              <Table className="table-auto w-full border-collapse rounded-b-lg overflow-hidden">
                <TableHeader>
                  <TableRow className="bg-blue-500">
                    <TableHead className="px-3 py-2 border text-white">Id Mobil</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Nama Mobil</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Kategori Mobil</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Transmisi</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Kapasitas</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Warna</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Tahun</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Gambar</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Harga / 12 jam</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Harga / 24 jam</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Harga / Fullday</TableHead>
                    <TableHead className="px-3 py-2 border text-white">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datas.map((car: Cars) => (
                    <TableRow key={car.id} className="odd:bg-white even:bg-slate-200">
                      <TableCell className="px-3 py-2 border">MBL-{car.id}</TableCell>
                      <TableCell className="px-3 py-2 border">{car.nama_mobil}</TableCell>
                      <TableCell className="px-3 py-2 border">{car.kategori_mobil}</TableCell>
                      <TableCell className="px-3 py-2 border">{car.transmission}</TableCell>
                      <TableCell className="px-3 py-2 border">{car.capacity}</TableCell>
                      <TableCell className="px-3 py-2 border">{car.color}</TableCell>
                      <TableCell className="px-3 py-2 border">{car.year}</TableCell>
                      <TableCell className="px-3 py-2 border">
                        <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${car.image}`} alt="" width={5000} height={5000} className="mx-auto w-96 h-fit rounded-lg" />
                      </TableCell>
                      <TableCell className="px-3 py-2 border">{formatRupiah(car.price_12)}</TableCell>
                      <TableCell className="px-3 py-2 border">{formatRupiah(car.price_24)}</TableCell>
                      <TableCell className="px-3 py-2 border">{formatRupiah(car.price_fullday)}</TableCell>
                      <TableCell className="px-3 py-2 border text-center">
                        <AlertDialog>
                          <AlertDialogTrigger onClick={() => handleEditClick(car)}>
                            <MdEdit className="text-3xl text-white bg-green-500 hover:bg-green-600 p-1 rounded" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Update Mobil</AlertDialogTitle>
                              <AlertDialogDescription>
                                {selectedCar && (
                                  <>
                                    <hr className="mb-5" />
                                    <div className="flex items-center gap-5">
                                      <div className="grid gap-2 mb-4 w-1/2">
                                        <Label className="block text-zinc-900">Nama Mobil</Label>
                                        <Input type="text" placeholder={car.nama_mobil} ref={namaMobilRef} />
                                      </div>
                                      <div className="grid gap-2 mb-4 w-1/2">
                                        <Label className="block text-zinc-900">Transmisi</Label>
                                        <Input type="text" placeholder={car.transmission} ref={transmissionRef} />
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                      <div className="grid gap-2 mb-4 w-1/2 mt-5">
                                        <Label className="block text-zinc-900">Kapasitas</Label>
                                        <Input type="text" placeholder={car.capacity} ref={capacityRef} />
                                      </div>
                                      <div className="grid gap-2 mb-4 w-1/2 mt-5">
                                        <Label className="block text-zinc-900">Warna</Label>
                                        <Input type="text" placeholder={car.color} ref={colorRef} />
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                      <div className="grid gap-2 mb-4 w-1/2 mt-5">
                                        <Label className="block text-zinc-900">Tahun</Label>
                                        <Input type="text" placeholder={car.year} ref={yearRef} />
                                      </div>
                                      <div className="grid gap-2 mb-4 w-1/2 mt-5">
                                        <Label className="block text-zinc-900">Harga 12 Jam</Label>
                                        <Input type="number" ref={price12Ref} />
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                      <div className="grid gap-2 mb-4 w-1/2 mt-5">
                                        <Label className="block text-zinc-900">Harga 24 Jam</Label>
                                        <Input type="number" ref={price24Ref} />
                                      </div>
                                      <div className="grid gap-2 mb-4 w-1/2 mt-5">
                                        <Label className="block text-zinc-900">Harga Fullday</Label>
                                        <Input type="number" ref={priceFulldayRef} />
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                      <div className="grid gap-2 mb-4 w-1/2">
                                        <Label className="block text-zinc-900">Gambar</Label>
                                        <input type="file" onChange={handleFile} name="file" />
                                      </div>
                                      <div className="grid gap-2 mb-4 w-1/2">
                                        <Label className="block text-zinc-900">Kategori Mobil</Label>
                                        <Select onValueChange={(value) => setCategory(Number(value))} required>
                                          <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih Category Mobil" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectGroup>
                                              <SelectLabel>Category Mobil</SelectLabel>
                                              {categoryData?.map((data) => (
                                                <SelectItem key={data.id} value={String(data.id)}>
                                                  {data.name}
                                                </SelectItem>
                                              ))}
                                            </SelectGroup>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleSubmitUpdate}>Update</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                          <AlertDialogTrigger onClick={() => handleEditClick(car)}>
                            <MdDeleteForever className="text-3xl text-zinc-100 bg-red-500 hover:bg-red-600 p-1 rounded" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Data</AlertDialogTitle>
                              <AlertDialogDescription>Apakah anda yakin ingin menghapus data ini?</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleDelete}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </main>
        </>
      ) : (
        router.push('/login')
      )}
    </>
  );
}
