'use client';
import { jwtDecode } from 'jwt-decode';
import ReduxProvider from '@/store/redux-provider';
import AuthUpdater from '@/store/auth-updater';
import AuthViewer from '@/store/auth-viewer';

export default function About() {
  return (
    <ReduxProvider>
      <main className="w-full h-screen grid grid-cols-2 place-items-center">
        <AuthUpdater />
        <AuthViewer />
      </main>
    </ReduxProvider>
  );
}
