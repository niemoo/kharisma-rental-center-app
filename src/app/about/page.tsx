'use client';

import ReduxProvider from '@/store/redux-provider';
import AuthUpdater from '@/store/auth-updater';
import AuthViewer from '@/store/auth-viewer';
import Navbar from '@/components/layout/Navbar/UserNavbar';

export default function About() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="w-full h-screen grid grid-cols-2 place-items-center">
        <AuthUpdater />
        <AuthViewer />
      </main>
    </ReduxProvider>
  );
}
