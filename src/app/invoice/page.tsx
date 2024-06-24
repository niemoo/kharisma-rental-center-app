'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar';

export default function Invoice() {
  return (
    <ReduxProvider>
      <Navbar />
      <p>halaman invoice</p>
    </ReduxProvider>
  );
}
