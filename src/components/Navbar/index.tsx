import Image from 'next/image';
import Link from 'next/link';
import logoKRC from '../../../public/logoKRC.png';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-2 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between">
        <Image src={logoKRC} alt="KRC Logo" className="w-20" />
        <li className="flex gap-5 items-center">
          <Link href="/" className="hover:bg-white text-white hover:text-blue-500 py-2 px-3 rounded transition-all duration-300">
            <ul>Beranda</ul>
          </Link>
          <Link href="/mobil" className="hover:bg-white text-white hover:text-blue-500 py-2 px-3 rounded transition-all duration-300">
            <ul>Mobil</ul>
          </Link>
          <Link href="/pesanan" className="hover:bg-white text-white hover:text-blue-500 py-2 px-3 rounded transition-all duration-300">
            <ul>Cek Pesanan</ul>
          </Link>
          <Link href="/ketentuan" className="hover:bg-white text-white hover:text-blue-500 py-2 px-3 rounded transition-all duration-300">
            <ul>Ketentuan</ul>
          </Link>
          <Link href="/about" className="hover:bg-white text-white hover:text-blue-500 py-2 px-3 rounded transition-all duration-300">
            <ul>Tentang Kami</ul>
          </Link>
        </li>
      </div>
    </nav>
  );
}
