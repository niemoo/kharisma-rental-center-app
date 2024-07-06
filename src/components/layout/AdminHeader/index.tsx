'use client';

import { FiLogOut } from 'react-icons/fi';
import logoKRC from '../../../../public/logoKRC1.png';
import Image from 'next/image';
import { setIsAdmin } from '@/store/appSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export default function AdminHeader() {
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector((state) => state.app.isAdmin);

  const handleLogout = () => {
    dispatch(setIsAdmin(false));
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
            <button className="px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded-lg transition duration-300 ease-in-out" onClick={handleLogout}>
              <FiLogOut />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
