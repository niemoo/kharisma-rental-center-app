'use client';

import Link from 'next/link';
import { setSelectedCarId } from '@/store/authSlice';
import { useAppDispatch } from '@/store/store';

interface AddToCartButtonProps {
  carId: number;
}

export default function AddToCartButton({ carId }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();

  const addSelectedCar = () => {
    dispatch(setSelectedCarId(carId));
  };

  return (
    <button onClick={addSelectedCar} className="w-full">
      <Link href="/pemesanan" className="border border-black button-48">
        <span>Pesan Mobil</span>
      </Link>
    </button>
  );
}
