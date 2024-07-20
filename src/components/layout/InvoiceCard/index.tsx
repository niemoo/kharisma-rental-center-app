'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setBookingId } from '@/store/appSlice';

interface SpecifiedMobilProps {
  id: number;
}

export default function InvoiceCard({ id }: SpecifiedMobilProps) {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [method, setMethod] = useState<string | null>();
  const dispatch = useAppDispatch();
  const bookingId = useAppSelector((state) => state.app.bookingId);

  const amountRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpdatePembayaran = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('amount', amountRef.current?.value ?? '');
    formData.append('method', method ?? '');
    if (file) {
      formData.append('image', file);
    }
    bookingId
      ? axios
          .put(`http://api.kharisma-rental-center.my.id/booking/pembayaran/${bookingId}`, formData)
          .then((response) => {
            toast.success('Bukti Pembayaran Berhasil Diupload');
          })
          .catch((err) => {
            toast.error(err.message);
          })
          .finally(() => {
            dispatch(setBookingId(null));
            router.push('/profil');
          })
      : axios
          .put(`http://api.kharisma-rental-center.my.id/booking/pembayaran/${id}`, formData)
          .then((response) => {
            toast.success('Bukti Pembayaran Berhasil Diupload');
          })
          .catch((err) => {
            toast.error(err.message);
          })
          .finally(() => {
            dispatch(setBookingId(null));
            router.push('/profil');
          });
  };

  return (
    <>
      <ToastContainer />
      <div className="md:w-1/2 bg-white mx-auto py-5 px-4 border border-blue-500 rounded-lg shadow-lg">
        <h3 className="font-semibold text-2xl">Pembayaran</h3>
        <hr className="my-5" />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Transfer Bank BRI</AccordionTrigger>
            <AccordionContent>211001007721501 / KHARISMA ABDUL YAYAN</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Dana</AccordionTrigger>
            <AccordionContent>085962362581 / KHARISMA ABDUL YAYAN</AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Shopee Pay</AccordionTrigger>
            <AccordionContent>085962362581 / KHARISMA ABDUL YAYAN</AccordionContent>
          </AccordionItem>
        </Accordion>
        <form action="" onSubmit={handleUpdatePembayaran}>
          <div className="grid gap-5 mt-5">
            <Label>Jumlah Uang yang Dibayar</Label>
            <Input type="number" ref={amountRef} required />
          </div>
          <div className="grid gap-5 mt-5">
            <Label>Pilih Metode Pembayaran</Label>
            <Select onValueChange={(value) => setMethod(value)} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Metode Pembayaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Metode Pembayaran</SelectLabel>

                  <SelectItem value="BRI">BRI</SelectItem>
                  <SelectItem value="Gopay">Gopay</SelectItem>
                  <SelectItem value="Shopee Pay">Shopee Pay</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-5 mt-5">
            <Label>Upload Bukti Pembayaran</Label>
            <Input type="file" accept=".jpg, .jpeg, .png" onChange={handleFile} name="file" required />
          </div>
          <div className="flex justify-end mt-5">
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-5 rounded-lg">Upload</button>
          </div>
        </form>
      </div>
    </>
  );
}
