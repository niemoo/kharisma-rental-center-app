import Link from 'next/link';
import logoKRC from '../../../../public/logoKRC2.png';
import Image from 'next/image';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdNavigateNext } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="py-20 bg-sky-950">
      <div className="max-w-screen-md mx-auto md:flex justify-between gap-10 items-stretch">
        <div className="flex justify-center">
          <img src={logoKRC} alt="" width={300} height={300} className="h-20 w-fit" />
        </div>
        <div className="h-full flex flex-col justify-center">
          <h3 className="text-lg font-semibold md:mt-0 mt-10 text-white md:text-left text-center">Perusahaan</h3>
          <ul className="md:mt-10 mt-5 md:grid flex justify-center">
            <li className="flex items-center mt-2 underline hover:text-emerald-300 text-sm text-zinc-100">
              <MdNavigateNext />
              <Link href="/mobil">Mobil</Link>
            </li>
            <li className="flex items-center mt-2 underline hover:text-emerald-300 text-sm text-zinc-100">
              <MdNavigateNext />
              <Link href="/ketentuan">Ketentuan</Link>
            </li>
            <li className="flex items-center mt-2 underline hover:text-emerald-300 text-sm text-zinc-100">
              <MdNavigateNext />
              <Link href="/about">Tentang Kami</Link>
            </li>
          </ul>
        </div>
        <div className="h-full flex flex-col justify-center pb-20">
          <h3 className="text-lg font-semibold md:mt-0 mt-10 text-white text-center">Social Media</h3>
          <div className="flex justify-center gap-2 md:mt-10 mt-5">
            <Link href={'https://wa.me/6285647108657'} target="_blank" className="border border-gray-500 text-green-500 bg-white hover:text-white hover:bg-green-500 p-2 rounded-full transition-all duration-300 cursor-pointer">
              <FaWhatsapp className="text-xl" />
            </Link>
            <Link
              href={'https://www.instagram.com/rentalhtsurakarta/'}
              target="_blank"
              className="border border-gray-500 text-pink-500 bg-white hover:text-white hover:bg-pink-500 p-2 rounded-full transition-all duration-300 cursor-pointer"
            >
              <FaInstagram className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
