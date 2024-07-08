'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setBookingId } from '@/store/appSlice';

export default function InvoiceCard() {
  const [file, setFile] = useState<File>();
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
    if (file) {
      formData.append('image', file);
    }

    axios
      .put(`http://localhost:3001/booking/pembayaran/${bookingId}`, formData)
      .then((response) => {
        toast.success('Data Berhasil Terupdate');
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        dispatch(setBookingId(null));
        window.location.reload();
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="md:w-1/2 mx-auto py-5 px-4 border border-blue-500 rounded-lg shadow-lg">
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
