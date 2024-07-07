'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IoMdAdd } from 'react-icons/io';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Category {
  id: number;
  name: string;
}

export default function AddCarsData({ categoryData }: { categoryData: Category[] }) {
  const [file, setFile] = useState<File>();
  const [category, setCategory] = useState<number | null>(null);

  const namaMobilRef = useRef<HTMLInputElement>(null);
  const transmissionRef = useRef<HTMLInputElement>(null);
  const capacityRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const price12Ref = useRef<HTMLInputElement>(null);
  const price24Ref = useRef<HTMLInputElement>(null);
  const priceFulldayRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
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
      .post(`http://localhost:3001/admin/cars`, formData)
      .then(() => {
        toast.success('Data Berhasil Ditambah');
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        window.location.reload();
      });
  };

  return (
    <>
      <ToastContainer />
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center border border-green-300 bg-white hover:bg-green-500 text-black hover:text-white rounded px-3 py-2 mt-20">
          <IoMdAdd />
          <p>Tambah Data Mobil</p>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tambah Data Mobil</AlertDialogTitle>
            <AlertDialogDescription>
              <hr className="mb-5" />
              <div className="flex items-center gap-5">
                <div className="grid gap-2 mb-4 w-1/2">
                  <Label className="block text-zinc-900">Nama Mobil</Label>
                  <Input type="text" placeholder="Masukkan Nama Mobil" ref={namaMobilRef} />
                </div>
                <div className="grid gap-2 mb-4 w-1/2">
                  <Label className="block text-zinc-900">Transmisi</Label>
                  <Input type="text" placeholder="Transmisi Mobil" ref={transmissionRef} />
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="grid gap-2 mb-4 w-1/2 mt-5">
                  <Label className="block text-zinc-900">Kapasitas</Label>
                  <Input type="text" placeholder="Kapasitas Mobil" ref={capacityRef} />
                </div>
                <div className="grid gap-2 mb-4 w-1/2 mt-5">
                  <Label className="block text-zinc-900">Warna</Label>
                  <Input type="text" placeholder="Warna Mobil" ref={colorRef} />
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="grid gap-2 mb-4 w-1/2 mt-5">
                  <Label className="block text-zinc-900">Tahun</Label>
                  <Input type="text" placeholder="Tahun Mobil" ref={yearRef} />
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
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Tambah</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
