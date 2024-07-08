'use client';

import ReduxProvider from '@/store/redux-provider';

import Navbar from '@/components/layout/Navbar/UserNavbar';

export default function Dashboard() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="max-w-screen-lg mx-auto">
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">User Dashboard</h2>
        </div>
      </main>
    </ReduxProvider>
  );
}
