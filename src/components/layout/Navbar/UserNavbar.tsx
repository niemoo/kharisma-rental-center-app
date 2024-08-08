'use client';

import { Fragment, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logoKRC from '../../../../public/logoKRC2.png';
import { setIsLogin } from '@/store/appSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { FaUserCircle } from 'react-icons/fa';

const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Mobil', href: '/mobil' },
  { name: 'Ketentuan', href: '/ketentuan' },
  { name: 'Tentang Kami', href: '/about' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const currentPath = usePathname();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state) => state.app.isLogin);

  const handleLogout = () => {
    dispatch(setIsLogin(false));
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
  };

  return (
    <Disclosure as="nav" className="bg-blue-600">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Image src={logoKRC} alt="KRC Logo" className="h-8 w-auto" />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center space-x-4">
                  <Link href="/" className={classNames(currentPath == '/' ? 'bg-blue-900 text-white' : 'text-zinc-100 hover:bg-blue-900 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out')}>
                    Home
                  </Link>
                  <Link
                    href="/mobil"
                    className={classNames(currentPath == '/mobil' ? 'bg-blue-900 text-white' : 'text-zinc-100 hover:bg-blue-900 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out')}
                  >
                    Mobil
                  </Link>
                  <Link
                    href="/ketentuan"
                    className={classNames(currentPath == '/ketentuan' ? 'bg-blue-900 text-white' : 'text-zinc-100 hover:bg-blue-900 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out')}
                  >
                    Ketentuan
                  </Link>
                  <Link
                    href="/about"
                    className={classNames(currentPath == '/about' ? 'bg-blue-900 text-white' : 'text-zinc-100 hover:bg-blue-900 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out')}
                  >
                    Tentang Kami
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center space-x-4">
                  {isLogin ? (
                    <div className="relative ml-3">
                      <Menu as="div" className="relative">
                        <Menu.Button className="relative flex rounded-full text-sm">
                          <FaUserCircle className="text-3xl text-white hover:text-zinc-200" />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link href="/profil" className={classNames(active ? 'bg-gray-100 w-full text-center' : '', 'w-full text-center block px-4 py-2 text-sm text-gray-700')}>
                                  Profil
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button onClick={handleLogout} className={classNames(active ? 'bg-gray-100 w-full text-center' : '', 'w-full text-center block px-4 py-2 text-sm text-gray-700')}>
                                  Keluar
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  ) : (
                    <div className="md:flex gap-2 hidden">
                      <Link
                        href="/login"
                        className={classNames(
                          currentPath == '/login'
                            ? 'bg-blue-900 text-white rounded-md px-3 py-2 text-sm text-base font-medium'
                            : 'text-zinc-100 hover:bg-blue-900 hover:text-white rounded-md px-3 py-2 text-sm text-base font-medium transition duration-300 ease-in-out'
                        )}
                      >
                        Masuk
                      </Link>
                      <Link
                        href="/register"
                        className={classNames(
                          currentPath == '/register'
                            ? 'bg-blue-900 text-white rounded-md px-3 py-2 text-sm text-base font-medium'
                            : 'text-zinc-100 hover:bg-blue-900 hover:text-white rounded-md px-3 py-2 text-sm text-base font-medium transition duration-300 ease-in-out'
                        )}
                      >
                        Daftar
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300 ease-in-out">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(currentPath == item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {isLogin ? (
                <>
                  <Disclosure.Button
                    as="a"
                    href={'/profil'}
                    className={classNames(currentPath == '/profil' ? 'bg-gray-900 text-white w-full text-left' : 'w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')}
                  >
                    Profil
                  </Disclosure.Button>
                  <Disclosure.Button as="button" onClick={handleLogout} className={classNames('w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')}>
                    Logout
                  </Disclosure.Button>
                </>
              ) : (
                <>
                  <Disclosure.Button
                    as="a"
                    href={'/login'}
                    className={classNames(currentPath == '/login' ? 'bg-gray-900 text-white w-full text-left' : 'w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')}
                  >
                    Masuk
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href={'/register'}
                    className={classNames(currentPath == '/register' ? 'bg-gray-900 text-white w-full text-left' : 'w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')}
                  >
                    Daftar
                  </Disclosure.Button>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
