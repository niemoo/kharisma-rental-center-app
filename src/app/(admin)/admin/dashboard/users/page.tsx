'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { Input } from '@/components/ui/input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Users {
  id: number;
  email: string;
  username: string;
  password: string;
  full_name: string;
  no_telp: string;
}

export default function AdminDashboardUsers() {
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [datas, setDatas] = useState<Users[]>([]);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const noTelpRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const usersResponse = await fetch('http://localhost:3001/users', {
        cache: 'no-cache',
      });

      if (!usersResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const users = await usersResponse.json();
      setDatas(users?.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (user: Users) => {
    setSelectedUser(user);
  };

  const handleSubmitUpdate = async () => {
    const updateResponse = await fetch(`http://localhost:3001/users/${selectedUser?.id}`, {
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
    setSelectedUser(null);
    window.location.reload();
  };

  const handleDelete = async () => {
    const deleteResponse = await fetch(`http://localhost:3001/users/${selectedUser?.id}`, {
      method: 'DELETE',
    });

    if (!deleteResponse.ok) {
      const response = await deleteResponse.json();
      toast.error(response.message);
    }

    toast.success('Data Berhasil Dihapus');
    setSelectedUser(null);
    window.location.reload();
  };

  return (
    <>
      <ToastContainer />
      <main className="bg-slate-100 w-full py-10 md:px-20 px-5 h-full overflow-auto">
        <h2 className="text-2xl text-slate-800 font-semibold underline underline-offset-8">Halo, Admin!</h2>

        <div className="bg-white rounded-lg border border-blue-300 mt-20">
          <p className="py-3 px-2 font-semibold">Data Pengguna</p>
          <Table className="table-auto w-full border-collapse rounded-b-lg overflow-hidden">
            <TableHeader>
              <TableRow className="bg-blue-500">
                <TableHead className="px-3 py-2 border text-white">Id Pengguna</TableHead>
                <TableHead className="px-3 py-2 border text-white">Nama Lengkap</TableHead>
                <TableHead className="px-3 py-2 border text-white">Email</TableHead>
                <TableHead className="px-3 py-2 border text-white">Username</TableHead>
                <TableHead className="px-3 py-2 border text-white">Nomor Telepon</TableHead>
                <TableHead className="px-3 py-2 border text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datas.map((user: Users) => (
                <TableRow key={user.id} className="odd:bg-white even:bg-slate-200">
                  <TableCell className="px-3 py-2 border">USR-{user.id}</TableCell>
                  <TableCell className="px-3 py-2 border">{user.full_name}</TableCell>
                  <TableCell className="px-3 py-2 border">{user.email}</TableCell>
                  <TableCell className="px-3 py-2 border">{user.username}</TableCell>
                  <TableCell className="px-3 py-2 border">{user.no_telp}</TableCell>
                  <TableCell className="px-3 py-2 border text-center">
                    <AlertDialog>
                      <AlertDialogTrigger onClick={() => handleEditClick(user)}>
                        <MdEdit className="text-3xl text-white bg-green-500 hover:bg-green-600 p-1 rounded md:mr-3" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Update User Data</AlertDialogTitle>
                          <AlertDialogDescription>
                            {selectedUser && (
                              <>
                                <hr className="mb-5" />
                                <div className="grid gap-2 mb-4">
                                  <Label className="block text-gray-700">Nama Lengkap</Label>
                                  <Input type="text" ref={fullNameRef} placeholder={selectedUser.full_name} />
                                </div>
                                <div className="grid gap-2 mb-4 mt-5">
                                  <Label className="block text-gray-700">Email</Label>
                                  <Input type="text" ref={emailRef} placeholder={selectedUser.email} />
                                </div>
                                <div className="grid gap-2 mb-4 mt-5">
                                  <Label className="block text-gray-700">Username</Label>
                                  <Input type="text" ref={usernameRef} placeholder={selectedUser.username} />
                                </div>
                                <div className="grid gap-2 mb-4 mt-5">
                                  <Label className="block text-gray-700">Password</Label>
                                  <Input type="password" ref={passwordRef} placeholder="Masukkan Password Terbaru" />
                                </div>
                                <div className="grid gap-2 mb-4 mt-5">
                                  <Label className="block text-gray-700">Nomor Telepon</Label>
                                  <Input type="text" ref={noTelpRef} placeholder={selectedUser.no_telp} />
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
                      <AlertDialogTrigger onClick={() => handleEditClick(user)}>
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
  );
}
