'use client';

import ReduxProvider from '@/store/redux-provider';
import RegisterFooter from '@/components/layout/FooterForm';
import LoginForm from '@/components/layout/Form/LoginForm';
import Navbar from '@/components/layout/Navbar';

export default function Login() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="max-w-screen-md mx-auto md:p-0 p-5">
        <LoginForm />
        <div className="md:w-1/2 mx-auto text-center mt-10">
          <RegisterFooter text={`Belum punya akun? Ayo \t`} href="/register" pushText="daftar" />
        </div>
      </main>
    </ReduxProvider>
  );
}
