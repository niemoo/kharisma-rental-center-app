'use client';

import ReduxProvider from '@/store/redux-provider';
import RegisterFooter from '@/components/layout/FooterForm';
import LoginForm from '@/components/layout/Form/LoginForm';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import Footer from '@/components/layout/Footer';
import Wave from '../../../public/wave.png';

export default function Login() {
  return (
    <ReduxProvider>
      <Navbar />
      <main className="bg-slate-100">
        <div
          style={{
            backgroundImage: `url(${Wave.src})`,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="max-w-screen-md mx-auto md:py-20 p-5">
            <LoginForm />
            <div className="md:w-1/2 mx-auto text-center mt-10">
              <RegisterFooter text={`Belum punya akun? Ayo \t`} href="/register" pushText="daftar" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ReduxProvider>
  );
}
