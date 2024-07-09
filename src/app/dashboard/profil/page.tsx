'use client';

import ReduxProvider from '@/store/redux-provider';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function DashboardProfil() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="max-w-screen-md mx-auto md:p-0 p-5">
        <div>
          {/* <div className="grid gap-2 mb-4">
            <Label className="block text-gray-700">Nama Lengkap</Label>
            <Input type="text" ref={fullNameRef} placeholder={selectedUser.full_name} />
          </div>
          <div className="grid gap-2 mb-4 mt-5">
            <Label className="block text-gray-700">Email</Label>
            <Input type="text" ref={emailRef} placeholder={selectedUser.email} />
          </div>
          <div className="grid gap-2 mb-4 mt-5">
            <Label className="block text-gray-700">Username</Label>
            <Input type="text" ref={usernameRef} placeholder={selectedUser.username} />
          </div>
          <div className="grid gap-2 mb-4 mt-5">
            <Label className="block text-gray-700">Password</Label>
            <Input type="password" ref={passwordRef} placeholder="Masukkan Password Terbaru" />
          </div>
          <div className="grid gap-2 mb-4 mt-5">
            <Label className="block text-gray-700">Nomor Telepon</Label>
            <Input type="text" ref={noTelpRef} placeholder={selectedUser.no_telp} />
          </div> */}
        </div>
      </main>
    </ReduxProvider>
  );
}
