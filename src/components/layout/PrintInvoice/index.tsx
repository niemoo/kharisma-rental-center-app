'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { BiSolidHelpCircle } from 'react-icons/bi';
import { FaCircleDot } from 'react-icons/fa6';

interface BookingData {
  id: number;
  full_name: string;
  car_name: string;
  alamat: string;
  booking_date: string;
  instagram: string;
  tujuan_sewa: string;
  rute: string;
  jaminan: string;
  tempat_ambil: string;
  total_price: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  payment_method: string;
  payment_status: string;
  amount: number;
}

interface SpecifiedInvoice {
  id: number;
}

export default function PrintInvoice({ id }: SpecifiedInvoice) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [datas, setData] = useState<BookingData | null>(null);
  const isLogin = useAppSelector((state) => state.app.isLogin);
  const isBook = useAppSelector((state) => state.app.isBook);
  const totalPrice = useAppSelector((state) => state.app.totalPrice);

  const fetchData = async () => {
    if (!id) return; // Ensure userId is available

    try {
      const totalCarsResponse = await fetch(`//api.kharisma-rental-center.my.id/booking/${id}`, {
        cache: 'no-cache',
      });
      const totalCars = await totalCarsResponse.json();
      setData(totalCars.data[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const handleDownloadPDF = async () => {
    if (invoiceRef.current) {
      // Temporarily change the width of the invoiceRef to fit within the PDF dimensions
      const originalWidth = invoiceRef.current.style.width;
      invoiceRef.current.style.width = '210mm'; // A4 width in mm

      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Enable CORS if needed
      });

      // Reset the original width
      invoiceRef.current.style.width = originalWidth;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Adding image to PDF and handling multiple pages if necessary
      let position = 0;
      while (position < pdfHeight) {
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight - position);
        position += pdf.internal.pageSize.getHeight();
        if (position < pdfHeight) {
          pdf.addPage();
        }
      }

      pdf.save('invoice.pdf');
    }
  };

  return (
    <>
      {!isLogin ? (
        router.push('/login')
      ) : (
        <>
          <div ref={invoiceRef} className="invoice-card p-5 mt-5 mb-20 bg-white border border-gray-300 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-900">Bukti Pemesanan</h3>
            <hr className="border border-r-2 border-gray-200 mt-5" />
            <div className="md:flex">
              <div className="border border-transparent border-r-2 md:border-r-gray-200 md:w-2/3">
                <div className="grid gap-3 md:px-3 py-5 w-full">
                  <div className="grid gap-1 w-full">
                    <p className="font-semibold text-lg text-zinc-950">Nama Lengkap</p>
                    <div className="flex items-center">
                      <FaCircleDot className="text-blue-600" />
                      <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.full_name}</p>
                    </div>
                  </div>
                  <hr className="border border-r-2" />
                  <div className="grid gap-1 w-full">
                    <p className="font-semibold text-lg text-zinc-950">Nama Mobil</p>
                    <div className="flex items-center">
                      <FaCircleDot className="text-blue-600" />
                      <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.car_name}</p>
                    </div>
                  </div>
                  <hr className="border border-r-2" />
                  <div className="grid gap-1 w-full">
                    <p className="font-semibold text-lg text-zinc-950">Alamat Pemesan</p>
                    <div className="flex items-center">
                      <FaCircleDot className="text-blue-600" />
                      <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.alamat}</p>
                    </div>
                  </div>
                  <hr className="border border-r-2" />
                  {/* <div className="grid gap-1 w-full">
                        <p className="font-semibold text-lg text-zinc-950">Instagram</p>
                        <div className="flex items-center">
                          <FaCircleDot className="text-blue-600" />
                          <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.instagram}</p>
                        </div>
                      </div> */}
                  {/* <hr className="border border-r-2" /> */}
                  <div className="grid gap-1 w-full">
                    <p className="font-semibold text-lg text-zinc-950">Tujuan Sewa</p>
                    <div className="flex items-center">
                      <FaCircleDot className="text-blue-600" />
                      <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.tujuan_sewa}</p>
                    </div>
                  </div>
                  <hr className="border border-r-2" />
                  <div className="grid gap-1 w-full">
                    <p className="font-semibold text-lg text-zinc-950">Rute Perjalanan</p>
                    <div className="flex items-center">
                      <FaCircleDot className="text-blue-600" />
                      <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.rute}</p>
                    </div>
                  </div>
                  <hr className="border border-r-2" />
                  <div className="grid gap-1 w-full">
                    <p className="font-semibold text-lg text-zinc-950">Jaminan</p>
                    <div className="flex items-center">
                      <FaCircleDot className="text-blue-600" />
                      <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.jaminan}</p>
                    </div>
                  </div>
                  <hr className="border border-r-2" />
                  <div className="grid gap-1 w-full">
                    <p className="font-semibold text-lg text-zinc-950">Tanggal Mulai Sewa</p>
                    <div className="flex items-center">
                      <FaCircleDot className="text-blue-600" />
                      <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.start_date ? new Date(datas.start_date).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>
                  <hr className="border border-r-2" />
                  <div className="grid gap-1 w-full">
                    <p className="font-semibold text-lg text-zinc-950">Tanggal Akhir Sewa</p>
                    <div className="flex items-center">
                      <FaCircleDot className="text-blue-600" />
                      <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.end_date ? new Date(datas.end_date).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>

                  <hr className="border border-r-2" />
                  <div className="grid gap-1 w-full">
                    <p className="font-semibold text-lg text-zinc-950">Jam Mulai Sewa</p>
                    <div className="flex items-center">
                      <FaCircleDot className="text-blue-600" />
                      <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.start_time}</p>
                    </div>
                  </div>
                  <hr className="border border-r-2" />
                  <div className="grid gap-1 w-full">
                    <p className="font-semibold text-lg text-zinc-950">Jam Akhir Sewa</p>
                    <div className="flex items-center">
                      <FaCircleDot className="text-blue-600" />
                      <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.end_time}</p>
                    </div>
                  </div>
                  <hr className="border border-r-2" />
                  <div className="grid gap-1 w-full">
                    <p className="font-semibold text-lg text-zinc-950">Tempat Pengambilan Mobil</p>
                    <div className="flex items-center">
                      <FaCircleDot className="text-blue-600" />
                      <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.tempat_ambil}</p>
                    </div>
                  </div>
                  <hr className="border border-r-2" />
                  <div className="grid gap-1 w-full">
                    <p className="font-semibold text-lg text-zinc-950">Metode Pembayaran</p>
                    <div className="flex items-center">
                      <FaCircleDot className="text-blue-600" />
                      <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.payment_method}</p>
                    </div>
                  </div>
                  <hr className="border border-r-2" />
                  <div className="grid gap-1 w-full">
                    <p className="font-semibold text-lg text-zinc-950">Status Pembayaran</p>
                    <div className="flex items-center">
                      <FaCircleDot className="text-blue-600" />
                      <p className="font-semibold ml-3 text-gray-500 text-sm w-3/4">{datas?.payment_status}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between md:px-3 py-5 md:w-1/3">
                <div className="grid gap-3 h-fit">
                  <hr className="md:border-transparent border border-r-2" />
                  <div className="flex justify-between">
                    <p className="font-semibold">Total Harga :</p>
                    <p className="font-semibold">{datas?.total_price ? datas.total_price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : ''}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Sudah Dibayar :</p>
                    <p className="font-semibold">{datas?.amount ? datas.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) : 'Belum Bayar'}</p>
                  </div>

                  <button onClick={handleDownloadPDF} className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-5 rounded-lg">
                    Print Bukti
                  </button>

                  <hr className="mt-10" />
                  <div className="flex gap-3">
                    <BiSolidHelpCircle className="text-blue-500 text-xl mt-0.5" />
                    <p className="text-sm w-3/4">Anda dapat membayar uang muka (DP) terlebih dahulu sebesar 50%</p>
                  </div>
                  <hr />
                  <div className="flex gap-3 w-full">
                    <BiSolidHelpCircle className="text-blue-500 text-xl mt-0.5" />
                    <p className="text-sm w-3/4">Apabila Anda membayar uang muka (DP) terlebih dahulu, maka pembayaran sisanya akan dilakukan ketika pengambilan mobil.</p>
                  </div>
                  <hr />
                  <div className="flex gap-3 w-full">
                    <BiSolidHelpCircle className="text-blue-500 text-xl mt-0.5" />
                    <p className="text-sm w-3/4">Batas waktu untuk pembayaran adalah 24 jam, terhitung dari waktu pemesanan. Jika melebihi waktu yang telah ditentukan, maka pemesanan akan dibatalkan</p>
                  </div>
                  <hr />
                  <div className="flex gap-3 w-full">
                    <BiSolidHelpCircle className="text-blue-500 text-xl mt-0.5" />
                    <p className="text-sm w-3/4">Berkas jaminan sewa yang diberikan harus berupa berkas asli. Pemberian jaminan sewa dilakukan pada waktu pengambilan mobil.</p>
                  </div>
                  <hr />
                  <div className="flex gap-3 w-full">
                    <BiSolidHelpCircle className="text-blue-500 text-xl mt-0.5" />
                    <p className="text-sm w-3/4">Pastikan waktu pengambilan dan pengembalian mobil sudah sesuai. Apabila melebihi waktu pengembalian mobil, maka akan dikenakan denda sebesar Rp 30.000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
