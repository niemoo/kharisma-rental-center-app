'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import GetDate from '@/components/layout/GetDate';
import CarsList from '@/components/layout/CarsList';

export default function AvailableCars() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="max-w-screen-md mx-auto md:p-0 md:pt-5 p-5">
        <GetDate />
        <div className="grid gap-5 mt-10">
          <CarsList />
        </div>
      </main>
    </ReduxProvider>
  );
}
