'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRef, useState, useEffect } from 'react';

export default function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [responseMessage, setResponseMessage] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        body: JSON.stringify({ username: usernameRef.current?.value, password: passwordRef.current?.value }),
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json(); // Mengonversi responsenya menjadi objek JSON

      if (res.ok) {
        setResponseMessage(data.data);
      } else {
        setResponseMessage(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log(responseMessage); // Akan mencetak responseMessage setiap kali nilainya berubah
  }, [responseMessage]);

  return (
    <div className="max-w-screen-md mx-auto">
      <form className="w-1/2 grid gap-5 mx-auto mt-20 bg-white p-5 rounded-lg shadow-xl border border-gray-500" onSubmit={handleLogin}>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input required type="text" id="username" placeholder="Masukkan Username" ref={usernameRef} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input required type="password" id="password" placeholder="Masukkan Password" ref={passwordRef} />
        </div>
        <div className="w-full flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded">
            Masuk
          </button>
        </div>
      </form>
    </div>
  );
}
