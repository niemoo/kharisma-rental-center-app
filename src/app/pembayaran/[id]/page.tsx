'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import InvoiceCard from '@/components/layout/InvoiceCard';
import Wave from '../../../../public/wave.png';
import Footer from '@/components/layout/Footer';
import { useMediaQuery } from 'react-responsive';

interface SpecifiedPageProps {
  params: { id: number };
}

export default function Pembayaran({ params: { id } }: SpecifiedPageProps) {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1450px)' });
  return (
    <ReduxProvider>
      <Navbar />
      <main className="bg-slate-100">
        <div
          style={
            isLargeScreen
              ? {
                  backgroundImage: `url(${Wave.src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {
                  backgroundImage: `url(${Wave.src})`,
                  backgroundRepeat: 'no-repeat',
                }
          }
        >
          <div className="max-w-screen-sm mx-auto md:py-10 p-5">
            <InvoiceCard id={id} />
          </div>
        </div>
      </main>
      <Footer />
    </ReduxProvider>
  );
}
