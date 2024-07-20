'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { setIsAdmin, setIsLogin, setUserId } from '@/store/appSlice';
import { useAppDispatch } from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sidewave2 from '../../../../public/sidewave2.png';

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState<string | null>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('https://api.kharisma-rental-center.my.id/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ username: usernameRef.current?.value, password: passwordRef.current?.value }),
        credentials: 'include',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || 'Login failed');
      }

      const data = await res.json();
      if (data.data[0].role_id == 1) {
        dispatch(setIsAdmin(true));
        router.push('/admin/dashboard');
      } else if (data.data[0].role_id == 2) {
        toast.success('Berhasil Login');
        dispatch(setUserId(data.data[0].id));
        dispatch(setIsLogin(true));
        router.push('/');
      }
    } catch (err) {
      toast.error((err as Error)?.message);
      setMessage((err as Error)?.message);
    }
  }

  return (
    <>
      <ToastContainer />
      <form
        className="md:w-1/2 grid gap-5 mx-auto bg-white p-5 rounded-lg shadow-xl border border-gray-500"
        onSubmit={handleLogin}
        style={{
          backgroundImage: `url(${sidewave2.src})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover', // Menyesuaikan ukuran background image dengan ukuran form
          backgroundPosition: 'center',
        }}
      >
        <h3 className="text-xl font-semibold">Login</h3>
        <hr className="" />
        {message && <div className="text-red-500 text-sm mb-4">{message}</div>}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input className="bg-white" required type="text" id="username" placeholder="Masukkan Username" ref={usernameRef} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input className="bg-white" required type="password" id="password" placeholder="Masukkan Password" ref={passwordRef} />
        </div>
        <div className="w-full flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded">
            Masuk
          </button>
        </div>
      </form>
    </>
  );
}
