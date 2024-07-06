'use client';

import ReduxProvider from '@/store/redux-provider';
import AdminNavbar from '@/components/layout/Navbar/AdminNavbar';
import AdminHeader from '@/components/layout/AdminHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <main className="flex flex-col h-screen overflow-hidden">
        <AdminHeader />
        <div className="flex flex-1 mt-16 overflow-hidden">
          <AdminNavbar />
          <div className="flex-grow overflow-auto h-full">{children}</div>
        </div>
      </main>
    </ReduxProvider>
  );
}
