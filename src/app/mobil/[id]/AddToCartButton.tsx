'use client';

import Link from 'next/link';

interface AddToCartButtonProps {
  carId: number;
}

export default function AddToCartButton({ carId }: AddToCartButtonProps) {
  const addSelectedCar = () => {
    localStorage.setItem('selectedCarId', carId.toString());
  };

  return (
    <button onClick={addSelectedCar} className="w-full">
      <Link href="/pemesanan" className="border border-black button-48">
        <span>Pesan Mobil</span>
      </Link>
    </button>
  );
}
