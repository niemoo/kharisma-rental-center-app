'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import InvoiceCard from '@/components/layout/InvoiceCard';
import Wave from '../../../../public/wave.png';
import Footer from '@/components/layout/Footer';

interface SpecifiedPageProps {
  params: { id: number };
}

export default function Pembayaran({ params: { id } }: SpecifiedPageProps) {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="bg-slate-100">
        <div
          style={{
            backgroundImage: `url(${Wave.src})`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="max-w-screen-sm mx-auto md:py-10 p-5">
            <InvoiceCard />
          </div>
        </div>
      </main>
      <Footer />
    </ReduxProvider>
  );
}
