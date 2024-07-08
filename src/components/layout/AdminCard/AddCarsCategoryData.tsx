'use client';

import { useRef } from 'react';
import axios from 'axios';
import { IoMdAdd } from 'react-icons/io';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddCarsCategoryData() {
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    axios
      .post(`http://localhost:3001/admin/cars/category`, {
        name: nameRef.current?.value,
      })
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
        <AlertDialogTrigger className="flex items-center border border-yellow-300 bg-white hover:bg-yellow-500 text-black hover:text-white rounded px-3 py-2 ml-5">
          <IoMdAdd />
          <p>Tambah Kategori Mobil</p>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <Label>Nama Kategori</Label>
              <Input type="text" placeholder="Masukkan Nama Kategori" ref={nameRef} />
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
