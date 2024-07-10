'use client';

import ReduxProvider from '@/store/redux-provider';
import Wave2 from '../../../../public/wave2.png';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import MobilBreadcrumb from '@/components/layout/Breadcrumb/mobilBreadcrumb';
import SpecifiedMobil from '@/components/layout/SpecifiedMobil';
import Footer from '@/components/layout/Footer';

interface SpecifiedPageProps {
  params: { id: number };
}

export default function SpecifiedPage({ params: { id } }: SpecifiedPageProps) {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="bg-slate-100">
        <div className="relative">
          <div className="relative z-10 max-w-screen-xl mx-auto md:pb-20 md:pt-5 p-5">
            <MobilBreadcrumb />
            <SpecifiedMobil id={id} />
          </div>
          <div
            style={{
              backgroundImage: `url(${Wave2.src})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center bottom',
              // backgroundSize: 'cover',
            }}
            className="absolute top-0 left-0 w-full h-full"
          ></div>
        </div>
        <Footer />
      </main>
    </ReduxProvider>
  );
}
