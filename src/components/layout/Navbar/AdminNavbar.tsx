'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RxDashboard } from 'react-icons/rx';
import { FaClipboardList, FaUsers } from 'react-icons/fa';
import { FaCarTunnel } from 'react-icons/fa6';

export default function AdminNavbar() {
  const currentPath = usePathname();
  return (
    <nav className="w-60 h-full pt-10 border-r-2 border-r-gray-200 md:block hidden">
      <ul className="grid gap-3">
        <Link
          href="/admin/dashboard"
          className={
            currentPath == '/admin/dashboard'
              ? 'flex gap-3 items-center py-1 px-5 text-blue-600 border border-transparent border-r-2 border-r-blue-500'
              : 'flex gap-3 items-center py-1 px-5 text-zinc-700 hover:text-blue-600 border border-transparent hover:border-r-2 hover:border-r-blue-500 transition duration-300 ease-in-out'
          }
        >
          <RxDashboard className="text-xl" />
          <p className="font-semibold">Dashboard</p>
        </Link>
        <Link
          href="/admin/dashboard/bookings"
          className={
            currentPath == '/admin/dashboard/bookings'
              ? 'flex gap-3 items-center py-1 px-5 text-blue-600 border border-transparent border-r-2 border-r-blue-500'
              : 'flex gap-3 items-center py-1 px-5 text-zinc-700 hover:text-blue-600 border border-transparent hover:border-r-2 hover:border-r-blue-500 transition duration-300 ease-in-out'
          }
        >
          <FaClipboardList className="text-xl" />
          <p className="font-semibold">Bookings</p>
        </Link>
        <Link
          href="/admin/dashboard/users"
          className={
            currentPath == '/admin/dashboard/users'
              ? 'flex gap-3 items-center py-1 px-5 text-blue-600 border border-transparent border-r-2 border-r-blue-500'
              : 'flex gap-3 items-center py-1 px-5 text-zinc-700 hover:text-blue-600 border border-transparent hover:border-r-2 hover:border-r-blue-500 transition duration-300 ease-in-out'
          }
        >
          <FaUsers className="text-xl" />
          <p className="font-semibold">Users</p>
        </Link>
        <Link
          href="/admin/dashboard/mobil"
          className={
            currentPath == '/admin/dashboard/mobil'
              ? 'flex gap-3 items-center py-1 px-5 text-blue-600 border border-transparent border-r-2 border-r-blue-500'
              : 'flex gap-3 items-center py-1 px-5 text-zinc-700 hover:text-blue-600 border border-transparent hover:border-r-2 hover:border-r-blue-500 transition duration-300 ease-in-out'
          }
        >
          <FaCarTunnel className="text-xl" />
          <p className="font-semibold">Mobil</p>
        </Link>
      </ul>
    </nav>
  );
}
