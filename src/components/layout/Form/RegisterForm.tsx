'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sidewave1 from '../../../../public/sidewave1.png';

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const namaRef = useRef<HTMLInputElement>(null);
  const noTelpRef = useRef<HTMLInputElement>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch('http://api.kharisma-rental-center.my.id/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: emailRef.current?.value,
          username: usernameRef.current?.value,
          password: passwordRef.current?.value,
          full_name: namaRef.current?.value,
          no_telp: noTelpRef.current?.value,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json(); // Mengonversi responsenya menjadi objek JSON
        throw new Error(errorData?.message || 'Registration failed');
      }
      toast.success('Pendaftaran Berhasil');
      router.push('/login');
    } catch (err) {
      setMessage((err as Error)?.message);
      toast.error((err as Error)?.message);
    }
  }

  const handlePhoneNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
  };

  const handlePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 8) {
      e.currentTarget.value = e.currentTarget.value.slice(0, 8);
    }
  };

  const handleNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 50) {
      e.currentTarget.value = e.currentTarget.value.slice(0, 50);
    }
  };

  return (
    <>
      <ToastContainer />

      <form
        onSubmit={handleRegister}
        className="md:w-1/2 w-full mx-auto grid gap-5 p-5 border border-gray-500 shadow-xl rounded-lg"
        style={{
          backgroundImage: `url(${sidewave1.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover', // Menyesuaikan ukuran background image dengan ukuran form
          backgroundPosition: 'center',
        }}
      >
        <h3 className="text-xl font-semibold">Pendaftaran Akun</h3>
        <hr className="" />
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Username
          </Label>
          <Input className="bg-white" required type="text" id="username" placeholder="Masukkan Username Anda" ref={usernameRef} />
          {message && <div className="text-red-500 text-sm mb-4">{message}</div>}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Email
          </Label>
          <Input className="bg-white" required type="text" id="email" placeholder="Masukkan Email Anda" ref={emailRef} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Password
          </Label>
          <div className="flex gap-3">
            <Input className="bg-white" required type={showPassword ? 'text' : 'password'} id="password" placeholder="Masukkan Password Anda" ref={passwordRef} onInput={handlePasswordInput} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-2 border border-gray-200 rounded-lg">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="text-sm text-zinc-900">Password maksimal 8 karakter.</p>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="firstName" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Nama Lengkap
          </Label>
          <Input className="bg-white" required type="text" id="firstName" placeholder="Masukkan Nama Lengkap Anda" ref={namaRef} onInput={handleNameInput} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="noTelp" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            No. Telp
          </Label>
          <Input className="bg-white" required type="text" id="noTelp" placeholder="Masukkan No. Telp Anda" ref={noTelpRef} onInput={handlePhoneNumberInput} />
        </div>

        <div className="w-full flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded">
            Daftar
          </button>
        </div>
      </form>
    </>
  );
}
