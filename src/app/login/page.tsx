'use client';
import { useRef, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LoginContext } from '@/app/context/user';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login() {
  const router = useRouter();
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const [message, setMessage] = useState<string | null>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ username: usernameRef.current?.value, password: passwordRef.current?.value }),
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json(); // Mengonversi responsenya menjadi objek JSON
        throw new Error(errorData?.message || 'Registration failed');
      }

      const data = await res.json();

      setIsLogin(true);
      localStorage.setItem('isLogin', JSON.stringify(true));
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      router.push('/');
    } catch (err) {
      setMessage((err as Error)?.message);
    }
  }

  return (
    <div className="max-w-screen-md mx-auto md:p-0 p-5">
      <form className="md:w-1/2 grid gap-5 mx-auto mt-20 bg-white p-5 rounded-lg shadow-xl border border-gray-500" onSubmit={handleLogin}>
        <h3 className="text-xl font-semibold">Login</h3>
        <hr className="" />
        {message && <div className="text-red-500 text-sm mb-4">{message}</div>}
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
      <div className="md:w-1/2 mx-auto text-center mt-10">
        <h3 className="font-semibold">
          {`Belum punya akun? Ayo \t`}
          <Link href="/register" className="text-blue-600 hover:underline">
            daftar
          </Link>
        </h3>
      </div>
    </div>
  );
}
