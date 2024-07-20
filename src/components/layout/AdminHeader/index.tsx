'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { RxDashboard } from 'react-icons/rx';
import { LuClipboardList, LuUsers } from 'react-icons/lu';
import { FiLogOut } from 'react-icons/fi';
import { TiThMenu } from 'react-icons/ti';
import { FaCarTunnel } from 'react-icons/fa6';
import logoKRC from '../../../../public/logoKRC1.png';
import Image from 'next/image';
import { setIsAdmin } from '@/store/appSlice';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Router } from 'next/router';

export default function AdminHeader() {
  const router = useRouter();
  const currentPath = usePathname();
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector((state) => state.app.isAdmin);

  const handleLogout = () => {
    dispatch(setIsAdmin(false));
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white px-3">
      <div className="flex items-center border-b-2 border-gray-200 p-4">
        <div className="flex items-center gap-1">
          <h2>
            <Image src={logoKRC} alt="KRC Logo" className="h-8 w-auto" />
          </h2>
        </div>
        <h2 className="text-xl font-semibold px-4 ml-5 border-l-2 border-gray-200">Dashboard</h2>
        <ul className="flex items-center ml-auto space-x-4">
          <li>
            <button className="md:block hidden px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded-lg transition duration-300 ease-in-out" onClick={handleLogout}>
              <FiLogOut />
            </button>
            <Sheet>
              <SheetTrigger className="md:hidden block px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-lg transition duration-300 ease-in-out">
                <TiThMenu />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetDescription>
                    <nav className="w-60 h-full pt-10">
                      <ul className="grid gap-3">
                        <Link
                          href="/admin/dashboard"
                          className={
                            currentPath == '/admin/dashboard'
                              ? 'flex gap-3 items-center py-1 px-5 text-blue-600 border border-transparent border-l-2 border-l-blue-500'
                              : 'flex gap-3 items-center py-1 px-5 text-zinc-700 hover:text-blue-600 border border-transparent hover:border-l-2 hover:border-l-blue-500 transition duration-300 ease-in-out'
                          }
                        >
                          <RxDashboard className="text-xl" />
                          <p className="font-semibold">Dashboard</p>
                        </Link>
                        <Link
                          href="/admin/dashboard/penyewaan"
                          className={
                            currentPath == '/admin/dashboard/penyewaan'
                              ? 'flex gap-3 items-center py-1 px-5 text-blue-600 border border-transparent border-l-2 border-l-blue-500'
                              : 'flex gap-3 items-center py-1 px-5 text-zinc-700 hover:text-blue-600 border border-transparent hover:border-l-2 hover:border-l-blue-500 transition duration-300 ease-in-out'
                          }
                        >
                          <LuClipboardList className="text-xl" />
                          <p className="font-semibold">Penyewaan</p>
                        </Link>
                        <Link
                          href="/admin/dashboard/users"
                          className={
                            currentPath == '/admin/dashboard/users'
                              ? 'flex gap-3 items-center py-1 px-5 text-blue-600 border border-transparent border-l-2 border-l-blue-500'
                              : 'flex gap-3 items-center py-1 px-5 text-zinc-700 hover:text-blue-600 border border-transparent hover:border-l-2 hover:border-l-blue-500 transition duration-300 ease-in-out'
                          }
                        >
                          <LuUsers className="text-xl" />
                          <p className="font-semibold">Pengguna</p>
                        </Link>
                        <Link
                          href="/admin/dashboard/mobil"
                          className={
                            currentPath == '/admin/dashboard/mobil'
                              ? 'flex gap-3 items-center py-1 px-5 text-blue-600 border border-transparent border-l-2 border-l-blue-500'
                              : 'flex gap-3 items-center py-1 px-5 text-zinc-700 hover:text-blue-600 border border-transparent hover:border-l-2 hover:border-l-blue-500 transition duration-300 ease-in-out'
                          }
                        >
                          <FaCarTunnel className="text-xl" />
                          <p className="font-semibold">Mobil</p>
                        </Link>
                        <button className="md:block hidden px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded-lg transition duration-300 ease-in-out" onClick={handleLogout}>
                          <FiLogOut />
                        </button>
                      </ul>
                    </nav>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </li>
        </ul>
      </div>
    </nav>
  );
}
