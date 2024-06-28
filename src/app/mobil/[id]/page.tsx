'use client';

import ReduxProvider from '@/store/redux-provider';

import Navbar from '@/components/layout/Navbar';
import MobilBreadcrumb from '@/components/layout/Breadcrumb/mobilBreadcrumb';
import SpecifiedMobil from '@/components/layout/SpecifiedMobil';

interface SpecifiedPageProps {
  params: { id: number };
}

export default function SpecifiedPage({ params: { id } }: SpecifiedPageProps) {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="max-w-screen-xl mx-auto p-5 py-5 md:px-0 md:mt-10">
        <MobilBreadcrumb />
        <SpecifiedMobil id={id} />
      </main>
    </ReduxProvider>
  );
}
