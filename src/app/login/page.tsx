'use client';

import ReduxProvider from '@/store/redux-provider';
import RegisterFooter from '@/components/layout/FooterForm';
import LoginForm from '@/components/layout/Form/LoginForm';
import Navbar from '@/components/layout/Navbar/UserNavbar';
import Footer from '@/components/layout/Footer';
import Wave from '../../../public/wave.png';
import { useMediaQuery } from 'react-responsive';

export default function Login() {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1450px)' });
  return (
    <ReduxProvider>
      <Navbar />
      <main className="bg-slate-100">
        <div
          style={
            isLargeScreen
              ? {
                  backgroundImage: `url(${Wave.src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {
                  backgroundImage: `url(${Wave.src})`,
                  backgroundRepeat: 'no-repeat',
                }
          }
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
