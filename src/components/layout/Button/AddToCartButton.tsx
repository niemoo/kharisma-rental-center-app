'use client';

import Link from 'next/link';
import { setSelectedCarId } from '@/store/appSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface AddToCartButtonProps {
  carId: number;
}

export default function AddToCartButton({ carId }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector((state) => state.app.startDate);
  const endDate = useAppSelector((state) => state.app.endDate);

  const addSelectedCar = () => {
    dispatch(setSelectedCarId(carId));
  };

  return (
    <button onClick={addSelectedCar} className="w-full">
      {startDate && endDate ? (
        <Link href="/pemesanan" className="border border-black button-48">
          <span>Pesan Mobil</span>
        </Link>
      ) : (
        <>
          <AlertDialog>
            <AlertDialogTrigger className="border border-black button-48">Pesan Mobil</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Informasi</AlertDialogTitle>
                <AlertDialogDescription>Anda diharuskan melakukan pengecekan dengan mengisi tanggal mulai sewa dan tanggal akhir sewa terlebih dahulu.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Okay</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </button>
  );
}
