'use client';

import ReduxProvider from '@/store/redux-provider';
import RegisterFooter from '@/components/layout/FooterForm';
import RegisterForm from '@/components/layout/Form/RegisterForm';
import Navbar from '@/components/layout/Navbar';

export default function Register() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="max-w-screen-md mx-auto md:p-0 p-5">
        <RegisterForm />
        <div className="md:w-1/2 mx-auto text-center mt-10">
          <RegisterFooter text={`Sudah punya akun? \t`} href="/login" pushText="Masuk Sekarang" />
        </div>
      </main>
    </ReduxProvider>
  );
}
