'use client';

import ReduxProvider from '@/store/redux-provider';
import RegisterFooter from '@/components/layout/FooterForm';
import RegisterForm from '@/components/layout/Form/RegisterForm';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import Wave from '../../../public/wave.png';
import Footer from '@/components/layout/Footer';

export default function Register() {
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
            <RegisterForm />
            <div className="md:w-1/2 mx-auto text-center mt-10">
              <RegisterFooter text={`Sudah punya akun? \t`} href="/login" pushText="Masuk Sekarang" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ReduxProvider>
  );
}
