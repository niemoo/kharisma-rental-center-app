'use client';

import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const namaRef = useRef<HTMLInputElement>(null);
  const noTelpRef = useRef<HTMLInputElement>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(emailRef.current?.value);
    console.log(usernameRef.current?.value);
    console.log(passwordRef.current?.value);
    console.log(namaRef.current?.value);
    console.log(noTelpRef.current?.value);
  };

  const handlePhoneNumberInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
  };

  const handlePasswordInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length > 8) {
      e.currentTarget.value = e.currentTarget.value.slice(0, 8);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto md:p-0 p-5">
      <form onSubmit={handleRegister} className="md:w-1/2 w-full mx-auto grid gap-5 p-5 mt-20 border border-gray-500 shadow-xl rounded-lg">
        <h3 className="text-xl font-semibold">Pendaftaran Akun</h3>
        <hr className="" />
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Email
          </Label>
          <Input type="email" id="email" placeholder="Masukkan Email Anda" ref={emailRef} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Username
          </Label>
          <Input type="text" id="username" placeholder="Masukkan Username Anda" ref={usernameRef} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Password
          </Label>
          <div className="flex gap-3">
            <Input type={showPassword ? 'text' : 'password'} id="password" placeholder="Masukkan Password Anda" ref={passwordRef} onInput={handlePasswordInput} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="p-2 border border-gray-200 rounded-lg">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="text-xs text-gray-500">Password maksimal 8 karakter.</p>
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="firstName" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            Nama Lengkap
          </Label>
          <Input required type="text" id="firstName" placeholder="Masukkan Nama Lengkap Anda" ref={namaRef} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="noTelp" className="after:content-['*'] after:ml-0.5 after:text-red-500">
            No. Telp
          </Label>
          <Input required type="text" id="noTelp" placeholder="Masukkan No. Telp Anda" ref={noTelpRef} onInput={handlePhoneNumberInput} />
        </div>

        <div className="w-full flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded">
            Daftar
          </button>
        </div>
      </form>
    </div>
  );
}
