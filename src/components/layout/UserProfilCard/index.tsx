'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppSelector } from '@/store/store';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MdEdit } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  id: number;
  full_name: string;
  email: string;
  username: string;
  password: string;
  no_telp: string;
}

export default function UserProfilCard() {
  const [datas, setData] = useState<User | null>(null);

  const userId = useAppSelector((state) => state.app.userId);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const noTelpRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    if (!userId) return; // Ensure userId is available

    try {
      const userResponse = await fetch(`https://api.kharisma-rental-center.my.id/user/${userId}`, {
        cache: 'no-cache',
      });
      const user = await userResponse.json();
      setData(user.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleSubmitUpdate = async () => {
    const updateResponse = await fetch(`https://api.kharisma-rental-center.my.id/users/${datas?.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailRef.current?.value,
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
        full_name: fullNameRef.current?.value,
        no_telp: noTelpRef.current?.value,
      }),
    });

    if (!updateResponse.ok) {
      const error = await updateResponse.json();
      toast.error(error.message);
    }
    toast.success('Data Berhasil Diupdate');
    window.location.reload();
  };

  return (
    <>
      <ToastContainer />

      <div className="max-w-screen-md mx-auto shadow-lg mb-10 bg-white border border-cyan-600 px-5 py-3 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-3xl font-bold">{datas?.full_name}</p>
            <div className="flex gap-3">
              <p className="">{datas?.username}</p>
              <p className="">|</p>
              <p className="">{datas?.email}</p>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger>
              <MdEdit className="text-3xl text-white bg-green-500 hover:bg-green-600 p-1 rounded md:mr-3 transition-all duration-300 ease-in-out" />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Update User Data</AlertDialogTitle>
                <AlertDialogDescription>
                  {datas && (
                    <>
                      <hr className="mb-5" />
                      <div className="grid gap-2 mb-4">
                        <Label className="block text-gray-700">Nama Lengkap</Label>
                        <Input type="text" ref={fullNameRef} placeholder={datas.full_name} />
                      </div>
                      <div className="grid gap-2 mb-4 mt-5">
                        <Label className="block text-gray-700">Email</Label>
                        <Input type="text" ref={emailRef} placeholder={datas.email} />
                      </div>
                      <div className="grid gap-2 mb-4 mt-5">
                        <Label className="block text-gray-700">Username</Label>
                        <Input type="text" ref={usernameRef} placeholder={datas.username} />
                      </div>
                      <div className="grid gap-2 mb-4 mt-5">
                        <Label className="block text-gray-700">Password</Label>
                        <Input type="password" ref={passwordRef} placeholder="Masukkan Password Terbaru" />
                      </div>
                      <div className="grid gap-2 mb-4 mt-5">
                        <Label className="block text-gray-700">Nomor Telepon</Label>
                        <Input type="text" ref={noTelpRef} placeholder={datas.no_telp} />
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
        </div>
      </div>
    </>
  );
}
