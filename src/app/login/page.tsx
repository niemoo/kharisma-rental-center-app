import RegisterFooter from '@/components/layout/FooterForm';
import LoginForm from '@/components/layout/Form/LoginForm';

export default function Login() {
  return (
    <div className="max-w-screen-md mx-auto md:p-0 p-5">
      <LoginForm />
      <div className="md:w-1/2 mx-auto text-center mt-10">
        <RegisterFooter text={`Belum punya akun? Ayo \t`} href="/register" pushText="daftar" />
      </div>
    </div>
  );
}
